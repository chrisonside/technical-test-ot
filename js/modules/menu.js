// Import our form validation script
import * as validation from './validation';

// Construct our Menu object
const Menu = class Menu {
  
    constructor(menuId, inputsClass) {
        this.menuId = menuId;
        this.inputsClass = inputsClass;
        this.errorLog = document.getElementById('js-menu-error-log');
        this.order = {
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

    // Called when one of the required fields inputs changes (e.g. input, textarea or checkbox etc. )
    static inputChange(e) {

        const activeElem = e.target; // The html input element which has changed
        const itemValue = e.target.value; // Input value e.g. salmon
        const itemName = e.target.name; // Name of the input e.g. diner-1-desserts
        const itemId = e.target.id; // Id of the input e.g. diner-1-cheesecake

        // const diner = this.findAncestor(activeElem, 'diner'); // The diner this input element belongs to

        // First, uncheck all other checkboxes for that diner, for that course
        this.toggleOneCheckboxOnly(activeElem, itemName);

        // Now update the order object
        this.updateOrder(activeElem, itemName, itemValue);

        this.validateOptions(itemValue, itemId);

        // Finally if all the inputs are now valid, remove the error state from the submit button
        if (this.constructor.isFormValid(this.menuState)) {
            const submitButton = document.getElementById('js-submit-button');
            submitButton.classList.remove('btnSubmit--in-error');
        }
    
    // Useful for debugging
    // console.log(this.menuState);
    }

    // updateOrder(activeElem, itemName, itemValue) {
    updateOrder() {
        
        let selectedMeals = document.querySelectorAll(`${this.menuId} input[type="checkbox"]:checked`);
        let NodeListlength = selectedMeals.length;
        let currentBill = 0;
        
        for (let i = 0; i < NodeListlength; i++) {
            
            // For each selected meal, add it to the order object
            this.order[ selectedMeals[i].name ] = selectedMeals[i].id;
            
            // Update the price total
            let price = parseFloat(selectedMeals[i].dataset.price);
            currentBill += price;
        }

        this.updateBill(currentBill);
    }

    validateOptions(selectedDish, itemId) {
        /*
        *   To avoid angering user by only telling them their selection is invalid when they click order (submit) button,
        *   we are testing for 2 conditions at this stage - waiter approval and food items being in/out of stock
        */ 
        if (selectedDish === 'cheesecake') {
            if( validation.limitNotExceeded(this.order, 'cheesecake', 1) ) {
                this.menuState['limitNotExceeded'] = true;
            } else {
                this.menuState['limitNotExceeded'] = false;
                this.errorLog.innerHTML = `Sorry, we only have one piece of cheesecake`;
            }
        }

        if (selectedDish === 'prawn' || 'salmon') {
            if( validation.noBannedCombinations(this.order, 'prawn', 'salmon') ) {
                this.menuState['noBannedCombinations'] = true;
            } else {
                this.menuState['noBannedCombinations'] = false;
                this.errorLog.innerHTML = 'Sorry, Pierre our waiter cannot possibly let you order both the prawn cocktail and salmon. Please choose again!';
                document.body.classList.add('unleash-pierre');
            }
        }

    }

    toggleOneCheckboxOnly(activeElem, itemName) {
        // First, uncheck all other checkboxes for that diner, for that course
        let sameNameSiblings = document.getElementsByName(itemName);
        let NodeListlength = sameNameSiblings.length;
        for (let i = 0; i < NodeListlength; i++) {
            sameNameSiblings[i].checked = false;
        }
       
        activeElem.checked = true;
    }

    updateBill(price) {
        let totalElem = document.getElementById('js-menu-total');
        // Now update the running total
        totalElem.innerHTML = `&pound;${price}`;
    }

    initialise() {
        // Set form variables
        const menuElement = document.querySelector(this.menuId); // The menu form
        const menuInputs = document.querySelectorAll(this.inputsClass); // The inputs that trigger validation

        // Listen for changes in the checkbox elements
        for (let i = 0; i < menuInputs.length; i++) {
            menuInputs[i].addEventListener('change', this.constructor.inputChange.bind(this));
        }

        // Also listen for the user clicking submit
        menuElement.addEventListener('submit', this.onFormSubmit.bind(this));

        // useful for debugging
        // console.log(this.menuState);
    }

    onFormSubmit(e) {
        const submitButton = document.querySelector('.btnSubmit');
        // useful for debugging
        // console.log(this.menuState);

        // Hold fire on the submission
        e.preventDefault();

        // Check that the user has ordered at least two courses, one of which is a main
        // if( validation.minimumOrderAchieved(this.order, 'main') ) {
        //     this.menuState[minimumOrderAchieved] = true;
        // } else {
        //     this.menuState[minimumOrderAchieved] = false;
        //     this.errorLog.innerHTML = 'Sorry, each person must have at least two courses, one of which must be a main';
        // }

        // Run the menuState object through the isFormValid function
        if (this.constructor.isFormValid(this.menuState)) {
            // If everything is valid, go ahead with submission
            const menuElement = document.querySelector(this.menuId);
            menuElement.submit();
        } else {
            // Show the error state on the submit button
            submitButton.classList.add('btnSubmit--in-error');
            // Otherwise, loop through forState and if not valid show all the errors
            for (const key in this.menuState) {
                if (this.menuState.hasOwnProperty(key)) {
                    if (this.menuState[key] === false) {
                        const errID = `${key}Error`;
                        // Not all the fields in fieldState are essential and so not all have error messages. 
                        // If it is an essential field and an error message exists, add error state to it's parentNode
                        let errorMessage = document.getElementById(errID);
                        if(errorMessage) {
                            errorMessage.parentNode.classList.add('form__field--is-inerror');
                        }
                    }
                }
            }
        }
    }
};

export default Menu;
