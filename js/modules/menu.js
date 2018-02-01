'use strict';

// Import our menu validation module
import * as validation from './validation';

// Import our error messages module
import * as error from './error';

// Construct our Menu object
const Menu = class Menu {
  
    constructor(menuId, menuClass, inputsClass) {
        this.menuId = menuId;
        this.menuClass = menuClass;
        this.inputsClass = inputsClass;
        this.menuElement = document.getElementById(this.menuId);
        this.errorLog = document.getElementById('js-menu-error-log');
        this.submitButton = document.getElementById('js-submit-button');
        this.errorwaiter = false;
        this.errorlimit = false;
        this.errorminimum = false;
        this.menuOrder = {
            // We will add to order as user interacts with menu
        }
        this.menuState = {
            // We will add to menu state as user input is validated
        };
    }

    /*
        Function called after user hits submit.
        Loop through menuState object to check there are no errors. Return true if good to go, allowing submission.
    */
    static isFormValid(menuState) {
        let isValid;
        for (const key in menuState) {
            if (menuState.hasOwnProperty(key)) {
                if (menuState[key] === false) {
                    isValid = false;
                    break;
                }
            isValid = true;
            }
        }
        return isValid;
    }

    /*
    *   This function is called when one of the menu inputs changes
    */
    static inputChange(e) {

        const activeElem = e.target; // The html input element which has changed
        const itemValue = e.target.value; // Input value e.g. salmon
        const itemName = e.target.name; // Name of the input e.g. diner-1-desserts
        const itemId = e.target.id; // Id of the input e.g. diner-1-cheesecake

        // First, uncheck all other checkboxes for that diner, for that course
        this.toggleOneCheckboxOnly(activeElem, itemName);

        // Now update the menuOrder object
        this.updateOrder(activeElem, itemName, itemValue);

        // Validate options chosen by user, to ensure they are in line with restaurant rules
        this.validateOptions(itemValue, itemId);

        // Finally if all the inputs are now valid, remove the error state from the submit button
        if ( this.constructor.isFormValid(this.menuState) ) {
            this.submitButton.classList.remove('js-submit-button--in-error');
        }

    }

    /*
    *   A function to update the menuOrder object
    *   This also calls the function to update the running price total
    */
    updateOrder() {
        
        let selectedMeals = document.querySelectorAll(`.${this.menuClass} input[type="checkbox"]:checked`);
        let nodeListlength = selectedMeals.length;
        let currentBill = 0;
        
        for (let i = 0; i < nodeListlength; i++) {
            
            // For each selected meal, add it to the order object
            this.menuOrder[ selectedMeals[i].name ] = selectedMeals[i].id;
            
            // Update the price total
            let price = parseFloat(selectedMeals[i].dataset.price);
            currentBill += price;
        }

        this.updateBill(currentBill);
    }


    /*
    *   To avoid angering the user by only telling them their selection is invalid when they get round to clicking the order (submit) button,
    *   test for 2 conditions at this stage - waiter approval and food items being in/out of stock
    */
    validateOptions(selectedDish, itemId) {
         
        if (selectedDish === 'cheesecake' || this.errorlimit ) {
            if( validation.limitNotExceeded(this.menuOrder, 'cheesecake', 1) ) {
                this.menuState['limitNotExceeded'] = true;
                if(this.errorlimit) {
                    error.hideError('js-error-limit');
                }
            } else {
                this.menuState['limitNotExceeded'] = false;
                this.errorlimit = true;
                error.displayError('js-error-limit');
            }
        }

        if (selectedDish === 'prawn' || 'salmon') {
            if( validation.noBannedCombinations(this.menuOrder, 'prawn', 'salmon') ) {
                this.menuState['noBannedCombinations'] = true;
                if(this.errorwaiter) {
                    error.hideError('js-error-waiter');
                    this.menuElement.classList.remove('menu--waiter-live');
                }
            } else {
                this.menuState['noBannedCombinations'] = false;
                this.errorwaiter = true;
                error.displayError('js-error-waiter');
                this.menuElement.classList.add('menu--waiter-live');
            }
        }

    }

    /*
    *   A function to toggle off related checkboxes (apart from the one clicked)
    */
    toggleOneCheckboxOnly(activeElem, itemName) {
        // First, uncheck all other checkboxes for that diner, for that course
        let sameNameSiblings = document.getElementsByName(itemName);
        let nodeListlength = sameNameSiblings.length;
        for (let i = 0; i < nodeListlength; i++) {
            sameNameSiblings[i].checked = false;
        }
       
        activeElem.checked = true;
    }

    /*
    *   A function to update the total bill
    */
    updateBill(price) {
        let totalElem = document.getElementById('js-menu-total');
        // Now update the running total
        totalElem.innerHTML = `&pound;${price}`;
    }

    /*
    *   Initialise the menu UI
    */
    initialise() {
        // Reset form values, in case user has clicked back button after submitting form
        this.menuElement.reset();

        // Initialise the form inputs
        const menuInputs = document.querySelectorAll(this.inputsClass);

        // Listen for changes in the checkbox elements
        for (let i = 0; i < menuInputs.length; i++) {
            menuInputs[i].addEventListener('change', this.constructor.inputChange.bind(this));
        }

        // Also listen for the user clicking submit
        this.menuElement.addEventListener('submit', this.onFormSubmit.bind(this));
    }

    /*
    *   A function to handle the user clicking on submit
    */
    onFormSubmit(e) {
        // useful for debugging
        // console.log(this.menuState);

        // Hold fire on the submission
        e.preventDefault();

        // Check that the user has ordered at least two courses, one of which is a main
        if( validation.minimumOrderAchieved(this.menuOrder, 'diner-0-mains', 'diner-1-mains', 'diner-0') ) {
            this.menuState['minimumOrderAchieved'] = true;
            if(this.errorminimum) {
                error.hideError('js-error-minimum');
            }
        } else {
            this.menuState['minimumOrderAchieved'] = false;
            this.errorminimum = true;
            error.displayError('js-error-minimum');
        }

        // Run the menuState object through the isFormValid function
        if (this.constructor.isFormValid(this.menuState)) {
            // If everything is valid, go ahead with submission and go to thanks page
            // this.menuElement.submit();
            // For this demo, we will settle for a success message on this screen
            document.getElementById('js-success-message').style.display = 'block';
        } else {
            // Show the error state on the submit button
            this.submitButton.classList.add('btnSubmit--in-error');
        }
    }
};

export default Menu;
