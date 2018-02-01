(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var menuData = {
  "Starters": {
    "Soup of the day": {
      "name": "Soup of the day",
      "productCode": "soup",
      "price": 3
    },
    "Pâté": {
      "name": "Pâté",
      "productCode": "pate",
      "price": 5
    },
    "Bruschetta": {
      "name": "Bruschetta",
      "productCode": "bruschetta",
      "price": 4.5
    },
    "Prawn Cocktail": {
      "name": "Prawn Cocktail",
      "productCode": "prawn",
      "price": 6
    }
  },
  "Mains": {
    "Steak": {
      "name": "Steak",
      "productCode": "steak",
      "price": 18
    },
    "Meatballs": {
      "name": "Meatballs",
      "productCode": "meatballs",
      "price": 11.5
    },
    "Salmon Fillet": {
      "name": "Salmon Fillet",
      "productCode": "salmon",
      "price": 14
    },
    "Vegetarian Lasagna": {
      "name": "Vegetarian Lasagna",
      "productCode": "lasagna",
      "price": 12
    }
  },
  "Desserts": {
    "Sticky Toffee Pudding": {
      "name": "Sticky Toffee Pudding",
      "productCode": "sticky",
      "price": 4
    },
    "Tiramisu": {
      "name": "Tiramisu",
      "productCode": "tiramisu",
      "price": 4.5
    },
    "Cheesecake": {
      "name": "Cheesecake",
      "productCode": "cheesecake",
      "price": 4,
      "quantity": 1
    },
    "Ice Cream": {
      "name": "Ice Cream",
      "productCode": "icecream",
      "price": 3.5
    }
  }
};

exports.default = menuData;

},{}],2:[function(require,module,exports){
'use strict';

// Import menu data

var _mealData = require('./data/mealData');

var _mealData2 = _interopRequireDefault(_mealData);

var _table = require('./modules/table');

var table = _interopRequireWildcard(_table);

var _menu = require('./modules/menu');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

// Grab target div where our populated menu will be injected.


// Import methods from table building module
var targetform = document.querySelector('.menu__wrapper');

// Generate a docfrag


// Import our menu module, which will monitor and react to user's actions as they interact with the UI
var fragment = document.createDocumentFragment();

// Set number of diners - in future would be good to let user decide this number via the UI
var dinerCount = 2;

// Create our menu - outputting this in table form
var menuTable = table.createTable('menu__table');

// Add menu column headings, e.g. Diner 1, Diner 2
menuTable = table.createTableHeaders(dinerCount, menuTable);

// Generate our menu section headings and food items for each section
for (var menuSection in _mealData2.default) {
    if (_mealData2.default.hasOwnProperty(menuSection)) {
        // First insert each menu section heading
        menuTable = table.createTableSection(dinerCount, menuTable, menuSection);
        // Tidy up code so we don't have to quote menuData[menuSection] all the time
        var ticker = _mealData2.default[menuSection];

        for (var course in ticker) {
            if (ticker.hasOwnProperty(course)) {
                var newTicker = ticker[course];
                // Insert each dish into the menu table
                menuTable = table.addTableData(dinerCount, newTicker.productCode, newTicker.name, newTicker.price, menuSection, menuTable);
            }
        }
    }
}

// Finally add table to the docfrag
fragment.appendChild(menuTable);
// And attach our docfrag
targetform.appendChild(fragment);

// Now we have our menu laid out, initialise the menu so it's ready for reacting to the user's actions
var orderInit = new _menu2.default('menu', 'menu', '.js-validate');
orderInit.initialise();

},{"./data/mealData":1,"./modules/menu":4,"./modules/table":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function displayError(elemId) {
    var element = document.getElementById(elemId);
    element.style.display = 'block';
    return;
}

function hideError(elemId) {
    var element = document.getElementById(elemId);
    element.style.display = 'none';
    return;
}

exports.displayError = displayError;
exports.hideError = hideError;

},{}],4:[function(require,module,exports){
'use strict';

// Import our menu validation module

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

// Import our error messages module


var _validation = require('./validation');

var validation = _interopRequireWildcard(_validation);

var _error = require('./error');

var error = _interopRequireWildcard(_error);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

// Construct our Menu object
var Menu = function () {
    function Menu(menuId, menuClass, inputsClass) {
        _classCallCheck(this, Menu);

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
        };
        this.menuState = {
            // We will add to menu state as user input is validated
        };
    }

    /*
        Function called after user hits submit.
        Loop through menuState object to check there are no errors. Return true if good to go, allowing submission.
    */

    _createClass(Menu, [{
        key: 'updateOrder',

        /*
        *   A function to update the menuOrder object
        *   This also calls the function to update the running price total
        */
        value: function updateOrder() {

            var selectedMeals = document.querySelectorAll('.' + this.menuClass + ' input[type="checkbox"]:checked');
            var nodeListlength = selectedMeals.length;
            var currentBill = 0;

            for (var i = 0; i < nodeListlength; i++) {

                // For each selected meal, add it to the order object
                this.menuOrder[selectedMeals[i].name] = selectedMeals[i].id;

                // Update the price total
                var price = parseFloat(selectedMeals[i].dataset.price);
                currentBill += price;
            }

            this.updateBill(currentBill);
        }

        /*
        *   To avoid angering the user by only telling them their selection is invalid when they get round to clicking the order (submit) button,
        *   test for 2 conditions at this stage - waiter approval and food items being in/out of stock
        */

    }, {
        key: 'validateOptions',
        value: function validateOptions(selectedDish, itemId) {

            if (selectedDish === 'cheesecake' || this.errorlimit) {
                if (validation.limitNotExceeded(this.menuOrder, 'cheesecake', 1)) {
                    this.menuState['limitNotExceeded'] = true;
                    if (this.errorlimit) {
                        error.hideError('js-error-limit');
                    }
                } else {
                    this.menuState['limitNotExceeded'] = false;
                    this.errorlimit = true;
                    error.displayError('js-error-limit');
                }
            }

            if (selectedDish === 'prawn' || 'salmon') {
                if (validation.noBannedCombinations(this.menuOrder, 'prawn', 'salmon')) {
                    this.menuState['noBannedCombinations'] = true;
                    if (this.errorwaiter) {
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

    }, {
        key: 'toggleOneCheckboxOnly',
        value: function toggleOneCheckboxOnly(activeElem, itemName) {
            // First, uncheck all other checkboxes for that diner, for that course
            var sameNameSiblings = document.getElementsByName(itemName);
            var nodeListlength = sameNameSiblings.length;
            for (var i = 0; i < nodeListlength; i++) {
                sameNameSiblings[i].checked = false;
            }

            activeElem.checked = true;
        }

        /*
        *   A function to update the total bill
        */

    }, {
        key: 'updateBill',
        value: function updateBill(price) {
            var totalElem = document.getElementById('js-menu-total');
            // Now update the running total
            totalElem.innerHTML = '&pound;' + price;
        }

        /*
        *   Initialise the menu UI
        */

    }, {
        key: 'initialise',
        value: function initialise() {
            // Reset form values, in case user has clicked back button after submitting form
            this.menuElement.reset();

            // Initialise the form inputs
            var menuInputs = document.querySelectorAll(this.inputsClass);

            // Listen for changes in the checkbox elements
            for (var i = 0; i < menuInputs.length; i++) {
                menuInputs[i].addEventListener('change', this.constructor.inputChange.bind(this));
            }

            // Also listen for the user clicking submit
            this.menuElement.addEventListener('submit', this.onFormSubmit.bind(this));
        }

        /*
        *   A function to handle the user clicking on submit
        */

    }, {
        key: 'onFormSubmit',
        value: function onFormSubmit(e) {
            // useful for debugging
            // console.log(this.menuState);

            // Hold fire on the submission
            e.preventDefault();

            // Check that the user has ordered at least two courses, one of which is a main
            if (validation.minimumOrderAchieved(this.menuOrder, 'diner-0-mains', 'diner-1-mains', 'diner-0')) {
                this.menuState['minimumOrderAchieved'] = true;
                if (this.errorminimum) {
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
    }], [{
        key: 'isFormValid',
        value: function isFormValid(menuState) {
            var isValid = void 0;
            for (var key in menuState) {
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

    }, {
        key: 'inputChange',
        value: function inputChange(e) {

            var activeElem = e.target; // The html input element which has changed
            var itemValue = e.target.value; // Input value e.g. salmon
            var itemName = e.target.name; // Name of the input e.g. diner-1-desserts
            var itemId = e.target.id; // Id of the input e.g. diner-1-cheesecake

            // First, uncheck all other checkboxes for that diner, for that course
            this.toggleOneCheckboxOnly(activeElem, itemName);

            // Now update the menuOrder object
            this.updateOrder(activeElem, itemName, itemValue);

            // Validate options chosen by user, to ensure they are in line with restaurant rules
            this.validateOptions(itemValue, itemId);

            // Finally if all the inputs are now valid, remove the error state from the submit button
            if (this.constructor.isFormValid(this.menuState)) {
                this.submitButton.classList.remove('js-submit-button--in-error');
            }
        }
    }]);

    return Menu;
}();

exports.default = Menu;

},{"./error":3,"./validation":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function createTable(className) {
	var newTable = document.createElement('table');
	newTable.classList.add(className);
	return newTable;
}

function createTableHeaders(count, table) {
	var row = table.insertRow(0);
	/* 
 * Insert column headings, e.g. Diner 1, Diner 2.
 * For each diner I am inserting two cells, the first of which is blank.
 * This ensures these column header cells are uniform with table cells appearing below them.
 */
	for (var i = 0; i < count; i++) {
		var cell1 = row.insertCell(-1);
		cell1.classList.add('menu__column-blank', 'menu__column-blank--' + i);
		var cell2 = row.insertCell(-1);
		cell2.classList.add('menu__column-heading');
		cell2.innerHTML = 'Diner ' + (i + 1);
	}

	return table;
}

function createTableSection(dinerCount, table, sectionTitle) {
	var row = table.insertRow(-1);
	var cell = row.insertCell(0);
	cell.classList.add('menu__category');
	cell.innerHTML = '' + sectionTitle;
	cell.colSpan = dinerCount * 2;
	return table;
}

function addTableData(dinerCount, productCode, productName, productPrice, course, table) {
	var row = table.insertRow(-1);
	/* 
 *	So for each diner, insert a product description and checkbox
 * 	Whilst I'm only displaying one product description on the form (to avoid it being too wordy), 
 *	it is important to include labels for each checkbox in the mark-up, for those with accessibility needs who can't see the UI
 */
	for (var i = 0; i < dinerCount; i++) {
		// First add the product description cell
		var cell1 = row.insertCell(-1);
		cell1.classList.add('menu__description', 'menu__description--' + i);
		var label1 = document.createElement('label');
		// Associate label with correct checkbox button
		label1.htmlFor = 'diner-' + i + '-' + productCode;
		// Insert text for product name, price 
		label1.innerHTML = productName + ', &pound;' + productPrice;
		cell1.appendChild(label1);

		// Now add the checkbox button for each diner
		var cell2 = row.insertCell(-1);
		cell2.classList.add('menu__choice');
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.classList.add('js-validate');
		checkbox.id = 'diner-' + i + '-' + productCode; // Corresponds to accompanying label
		checkbox.name = ('diner-' + i + '-' + course).toLowerCase(); // Tells our database which field to populate 
		checkbox.value = productCode; // Value to input into database
		checkbox.dataset.price = '' + productPrice; // Easy access to the price, for the bill calculation
		cell2.appendChild(checkbox);
	}

	return table;
}

exports.createTable = createTable;
exports.createTableHeaders = createTableHeaders;
exports.createTableSection = createTableSection;
exports.addTableData = addTableData;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function limitNotExceeded(order, item1, limit) {
    var itemCount = 0;
    // Loop through the items in the order, and add to count if you see flagged item
    for (var item in order) {
        if (order.hasOwnProperty(item) && order[item].includes(item1)) {
            itemCount += 1;
        }
    }
    // Finally see if the limit has been exceeded for that item
    return limit >= itemCount;
}

function noBannedCombinations(order, item1, item2) {
    var noItem1Ordered = true;
    var noItem2Ordered = true;

    for (var item in order) {
        if (order.hasOwnProperty(item) && order[item].includes(item1)) {
            noItem1Ordered = false;
        }
        if (order.hasOwnProperty(item) && order[item].includes(item2)) {
            noItem2Ordered = false;
        }
    }

    if (!noItem1Ordered && !noItem2Ordered) {
        return false;
    } else {
        return true;
    }
}

function minimumOrderAchieved(order, item1, item2, option) {
    var item1Present = false;
    var item2Present = false;
    var diner1Count = 0;
    var diner2Count = 0;

    for (var item in order) {
        if (order.hasOwnProperty(item)) {

            if (item == item1) {
                item1Present = true;
                diner1Count += 1;
            } else if (item == item2) {
                item2Present = true;
                diner2Count += 1;
            } else if (item.includes(option)) {
                diner1Count += 1;
            } else {
                diner2Count += 1;
            }
        }
    }

    if (item1Present && item2Present && diner1Count > 1 && diner2Count > 1) {
        return true;
    } else {
        return false;
    }
}

exports.limitNotExceeded = limitNotExceeded;
exports.noBannedCombinations = noBannedCombinations;
exports.minimumOrderAchieved = minimumOrderAchieved;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9kYXRhL21lYWxEYXRhLmpzIiwianMvbWFpbi5qcyIsImpzL21vZHVsZXMvZXJyb3IuanMiLCJqcy9tb2R1bGVzL21lbnUuanMiLCJqcy9tb2R1bGVzL3RhYmxlLmpzIiwianMvbW9kdWxlcy92YWxpZGF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxJQUFJOzs7Y0FFbUIsQUFDVixBQUNQO3FCQUZpQixBQUVGLEFBQ2Y7ZUFKUSxBQUNTLEFBR1IsQUFFWDtBQUxtQixBQUNsQjs7Y0FJTyxBQUNDLEFBQ1A7cUJBRk0sQUFFUyxBQUNmO2VBVFEsQUFNRixBQUdHLEFBRVg7QUFMUSxBQUNQOztjQUlhLEFBQ0wsQUFDUDtxQkFGWSxBQUVHLEFBQ2Y7ZUFkUSxBQVdJLEFBR0gsQUFFWDtBQUxjLEFBQ2I7O2NBSWlCLEFBQ1QsQUFDUDtxQkFGZ0IsQUFFRCxBQUNmO2VBcEJTLEFBQ0QsQUFnQlEsQUFHUCxBQUdiO0FBTm9CLEFBQ2pCO0FBakJTLEFBQ1Y7OztjQXNCUyxBQUNBLEFBQ1A7cUJBRk8sQUFFUSxBQUNmO2VBSkssQUFDRSxBQUdFLEFBRVg7QUFMUyxBQUNSOztjQUlZLEFBQ0osQUFDUDtxQkFGVyxBQUVJLEFBQ2Y7ZUFUSyxBQU1NLEFBR0YsQUFFWDtBQUxhLEFBQ1o7O2NBSWdCLEFBQ1IsQUFDUDtxQkFGZSxBQUVBLEFBQ2Y7ZUFkSyxBQVdVLEFBR04sQUFFWDtBQUxpQixBQUNoQjs7Y0FJcUIsQUFDYixBQUNQO3FCQUZvQixBQUVMLEFBQ2Y7ZUExQ1MsQUF1QkosQUFnQmUsQUFHWCxBQUdiO0FBTndCLEFBQ3JCO0FBakJNLEFBQ1A7OztjQXNCeUIsQUFDaEIsQUFDUDtxQkFGdUIsQUFFUixBQUNmO2VBSlEsQUFDZSxBQUdkLEFBRVg7QUFMeUIsQUFDeEI7O2NBSVcsQUFDSCxBQUNQO3FCQUZVLEFBRUssQUFDZjtlQVRRLEFBTUUsQUFH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QUFDcEI7WUFBSyxNQUFBLEFBQU0sZUFBWCxBQUFLLEFBQXFCLE9BQVEsQUFFOUI7O2dCQUFLLFFBQUwsQUFBYSxPQUFRLEFBQ2pCOytCQUFBLEFBQWUsQUFDZjsrQkFBQSxBQUFlLEFBQ2xCO0FBSEQsdUJBR1csUUFBSixBQUFZLE9BQVEsQUFDdkI7K0JBQUEsQUFBZSxBQUNmOytCQUFBLEFBQWUsQUFDbEI7QUFITSxhQUFBLFVBR0ksS0FBQSxBQUFLLFNBQVQsQUFBSSxBQUFjLFNBQVUsQUFDL0I7K0JBQUEsQUFBZSxBQUNsQjtBQUZNLGFBQUEsTUFFQSxBQUNIOytCQUFBLEFBQWUsQUFDbEI7QUFFSjtBQUNKO0FBRUQ7O1FBQUksZ0JBQUEsQUFBZ0IsZ0JBQWlCLGNBQWpDLEFBQStDLEtBQVEsY0FBM0QsQUFBeUUsR0FBSyxBQUMxRTtlQUFBLEFBQU8sQUFDVjtBQUZELFdBRVEsQUFDSjtlQUFBLEFBQU8sQUFDVjtBQUNKOzs7USxBQUVRLG1CLEFBQUE7USxBQUFrQix1QixBQUFBO1EsQUFBc0IsdUIsQUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbWVudURhdGEgPSB7XG4gIFwiU3RhcnRlcnNcIjoge1xuICAgIFwiU291cCBvZiB0aGUgZGF5XCI6IHtcbiAgICBcdFwibmFtZVwiOiBcIlNvdXAgb2YgdGhlIGRheVwiLFxuICAgICAgXCJwcm9kdWN0Q29kZVwiOiBcInNvdXBcIixcbiAgICAgIFwicHJpY2VcIjogM1xuICAgIH0sXG4gICAgXCJQw6J0w6lcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiUMOidMOpXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwicGF0ZVwiLFxuICAgICAgXCJwcmljZVwiOiA1XG4gICAgfSxcbiAgICBcIkJydXNjaGV0dGFcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiQnJ1c2NoZXR0YVwiLFxuICAgICAgXCJwcm9kdWN0Q29kZVwiOiBcImJydXNjaGV0dGFcIixcbiAgICAgIFwicHJpY2VcIjogNC41XG4gICAgfSxcbiAgICBcIlByYXduIENvY2t0YWlsXCI6IHtcbiAgICBcdFwibmFtZVwiOiBcIlByYXduIENvY2t0YWlsXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwicHJhd25cIixcbiAgICAgIFwicHJpY2VcIjogNlxuICAgIH0sXG4gIH0sXG4gIFwiTWFpbnNcIjoge1xuICAgIFwiU3RlYWtcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiU3RlYWtcIixcbiAgICAgIFwicHJvZHVjdENvZGVcIjogXCJzdGVha1wiLFxuICAgICAgXCJwcmljZVwiOiAxOFxuICAgIH0sXG4gICAgXCJNZWF0YmFsbHNcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiTWVhdGJhbGxzXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwibWVhdGJhbGxzXCIsXG4gICAgICBcInByaWNlXCI6IDExLjVcbiAgICB9LFxuICAgIFwiU2FsbW9uIEZpbGxldFwiOiB7XG4gICAgXHRcIm5hbWVcIjogXCJTYWxtb24gRmlsbGV0XCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwic2FsbW9uXCIsXG4gICAgICBcInByaWNlXCI6IDE0XG4gICAgfSxcbiAgICBcIlZlZ2V0YXJpYW4gTGFzYWduYVwiOiB7XG4gICAgXHRcIm5hbWVcIjogXCJWZWdldGFyaWFuIExhc2FnbmFcIixcbiAgICAgIFwicHJvZHVjdENvZGVcIjogXCJsYXNhZ25hXCIsXG4gICAgICBcInByaWNlXCI6IDEyXG4gICAgfSxcbiAgfSxcbiAgXCJEZXNzZXJ0c1wiOiB7XG4gICAgXCJTdGlja3kgVG9mZmVlIFB1ZGRpbmdcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiU3RpY2t5IFRvZmZlZSBQdWRkaW5nXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwic3RpY2t5XCIsXG4gICAgICBcInByaWNlXCI6IDRcbiAgICB9LFxuICAgIFwiVGlyYW1pc3VcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiVGlyYW1pc3VcIixcbiAgICAgIFwicHJvZHVjdENvZGVcIjogXCJ0aXJhbWlzdVwiLFxuICAgICAgXCJwcmljZVwiOiA0LjVcbiAgICB9LFxuICAgIFwiQ2hlZXNlY2FrZVwiOiB7XG4gICAgXHRcIm5hbWVcIjogXCJDaGVlc2VjYWtlXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwiY2hlZXNlY2FrZVwiLFxuICAgICAgXCJwcmljZVwiOiA0LFxuICAgICAgXCJxdWFudGl0eVwiOiAxXG4gICAgfSxcbiAgICBcIkljZSBDcmVhbVwiOiB7XG4gICAgXHRcIm5hbWVcIjogXCJJY2UgQ3JlYW1cIixcbiAgICAgIFwicHJvZHVjdENvZGVcIjogXCJpY2VjcmVhbVwiLFxuICAgICAgXCJwcmljZVwiOiAzLjVcbiAgICB9LFxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZW51RGF0YTsiLCIndXNlIHN0cmljdCc7XG5cbi8vIEltcG9ydCBtZW51IGRhdGFcbmltcG9ydCBtZW51RGF0YSBmcm9tICcuL2RhdGEvbWVhbERhdGEnO1xuXG4vLyBJbXBvcnQgbWV0aG9kcyBmcm9tIHRhYmxlIGJ1aWxkaW5nIG1vZHVsZVxuaW1wb3J0ICogYXMgdGFibGUgZnJvbSAnLi9tb2R1bGVzL3RhYmxlJztcblxuLy8gSW1wb3J0IG91ciBtZW51IG1vZHVsZSwgd2hpY2ggd2lsbCBtb25pdG9yIGFuZCByZWFjdCB0byB1c2VyJ3MgYWN0aW9ucyBhcyB0aGV5IGludGVyYWN0IHdpdGggdGhlIFVJXG5pbXBvcnQgTWVudSBmcm9tICcuL21vZHVsZXMvbWVudSc7XG5cbi8vIEdyYWIgdGFyZ2V0IGRpdiB3aGVyZSBvdXIgcG9wdWxhdGVkIG1lbnUgd2lsbCBiZSBpbmplY3RlZC5cbmNvbnN0IHRhcmdldGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fd3JhcHBlcicpO1xuXG4vLyBHZW5lcmF0ZSBhIGRvY2ZyYWdcbmxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuLy8gU2V0IG51bWJlciBvZiBkaW5lcnMgLSBpbiBmdXR1cmUgd291bGQgYmUgZ29vZCB0byBsZXQgdXNlciBkZWNpZGUgdGhpcyBudW1iZXIgdmlhIHRoZSBVSVxubGV0IGRpbmVyQ291bnQgPSAyO1xuXG4vLyBDcmVhdGUgb3VyIG1lbnUgLSBvdXRwdXR0aW5nIHRoaXMgaW4gdGFibGUgZm9ybVxubGV0IG1lbnVUYWJsZSA9IHRhYmxlLmNyZWF0ZVRhYmxlKCdtZW51X190YWJsZScpO1xuXG4vLyBBZGQgbWVudSBjb2x1bW4gaGVhZGluZ3MsIGUuZy4gRGluZXIgMSwgRGluZXIgMlxubWVudVRhYmxlID0gdGFibGUuY3JlYXRlVGFibGVIZWFkZXJzKGRpbmVyQ291bnQsIG1lbnVUYWJsZSk7XG5cbi8vIEdlbmVyYXRlIG91ciBtZW51IHNlY3Rpb24gaGVhZGluZ3MgYW5kIGZvb2QgaXRlbXMgZm9yIGVhY2ggc2VjdGlvblxuZm9yICh2YXIgbWVudVNlY3Rpb24gaW4gbWVudURhdGEpIHtcbiAgICBpZiAoIG1lbnVEYXRhLmhhc093blByb3BlcnR5KG1lbnVTZWN0aW9uKSApIHtcbiAgICAgICAgLy8gRmlyc3QgaW5zZXJ0IGVhY2ggbWVudSBzZWN0aW9uIGhlYWRpbmdcbiAgICAgICAgbWVudVRhYmxlID0gdGFibGUuY3JlYXRlVGFibGVTZWN0aW9uKGRpbmVyQ291bnQsIG1lbnVUYWJsZSwgbWVudVNlY3Rpb24pO1xuICAgICAgICAvLyBUaWR5IHVwIGNvZGUgc28gd2UgZG9uJ3QgaGF2ZSB0byBxdW90ZSBtZW51RGF0YVttZW51U2VjdGlvbl0gYWxsIHRoZSB0aW1lXG4gICAgICAgIGxldCB0aWNrZXIgPSBtZW51RGF0YVttZW51U2VjdGlvbl07XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBjb3Vyc2UgaW4gdGlja2VyKSB7XG4gICAgICAgICAgICBpZiAoIHRpY2tlci5oYXNPd25Qcm9wZXJ0eShjb3Vyc2UpICkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdUaWNrZXIgPSB0aWNrZXJbY291cnNlXTtcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgZWFjaCBkaXNoIGludG8gdGhlIG1lbnUgdGFibGVcbiAgICAgICAgICAgICAgICBtZW51VGFibGUgPSB0YWJsZS5hZGRUYWJsZURhdGEoXG4gICAgICAgICAgICAgICAgICAgIGRpbmVyQ291bnQsICBcbiAgICAgICAgICAgICAgICAgICAgbmV3VGlja2VyLnByb2R1Y3RDb2RlLCBcbiAgICAgICAgICAgICAgICAgICAgbmV3VGlja2VyLm5hbWUsIFxuICAgICAgICAgICAgICAgICAgICBuZXdUaWNrZXIucHJpY2UsIFxuICAgICAgICAgICAgICAgICAgICBtZW51U2VjdGlvbiwgXG4gICAgICAgICAgICAgICAgICAgIG1lbnVUYWJsZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIEZpbmFsbHkgYWRkIHRhYmxlIHRvIHRoZSBkb2NmcmFnXG5mcmFnbWVudC5hcHBlbmRDaGlsZChtZW51VGFibGUpO1xuLy8gQW5kIGF0dGFjaCBvdXIgZG9jZnJhZ1xudGFyZ2V0Zm9ybS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG5cbi8vIE5vdyB3ZSBoYXZlIG91ciBtZW51IGxhaWQgb3V0LCBpbml0aWFsaXNlIHRoZSBtZW51IHNvIGl0J3MgcmVhZHkgZm9yIHJlYWN0aW5nIHRvIHRoZSB1c2VyJ3MgYWN0aW9uc1xuY29uc3Qgb3JkZXJJbml0ID0gbmV3IE1lbnUoJ21lbnUnLCAnbWVudScsICcuanMtdmFsaWRhdGUnKTtcbm9yZGVySW5pdC5pbml0aWFsaXNlKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGRpc3BsYXlFcnJvcihlbGVtSWQpIHtcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICByZXR1cm47XG59XG5cbmZ1bmN0aW9uIGhpZGVFcnJvcihlbGVtSWQpIHtcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHJldHVybjtcbn1cblxuZXhwb3J0IHsgZGlzcGxheUVycm9yLCBoaWRlRXJyb3IgfTsiLCIndXNlIHN0cmljdCc7XG5cbi8vIEltcG9ydCBvdXIgbWVudSB2YWxpZGF0aW9uIG1vZHVsZVxuaW1wb3J0ICogYXMgdmFsaWRhdGlvbiBmcm9tICcuL3ZhbGlkYXRpb24nO1xuXG4vLyBJbXBvcnQgb3VyIGVycm9yIG1lc3NhZ2VzIG1vZHVsZVxuaW1wb3J0ICogYXMgZXJyb3IgZnJvbSAnLi9lcnJvcic7XG5cbi8vIENvbnN0cnVjdCBvdXIgTWVudSBvYmplY3RcbmNvbnN0IE1lbnUgPSBjbGFzcyBNZW51IHtcbiAgXG4gICAgY29uc3RydWN0b3IobWVudUlkLCBtZW51Q2xhc3MsIGlucHV0c0NsYXNzKSB7XG4gICAgICAgIHRoaXMubWVudUlkID0gbWVudUlkO1xuICAgICAgICB0aGlzLm1lbnVDbGFzcyA9IG1lbnVDbGFzcztcbiAgICAgICAgdGhpcy5pbnB1dHNDbGFzcyA9IGlucHV0c0NsYXNzO1xuICAgICAgICB0aGlzLm1lbnVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5tZW51SWQpO1xuICAgICAgICB0aGlzLmVycm9yTG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLW1lbnUtZXJyb3ItbG9nJyk7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXN1Ym1pdC1idXR0b24nKTtcbiAgICAgICAgdGhpcy5lcnJvcndhaXRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVycm9ybGltaXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lcnJvcm1pbmltdW0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tZW51T3JkZXIgPSB7XG4gICAgICAgICAgICAvLyBXZSB3aWxsIGFkZCB0byBvcmRlciBhcyB1c2VyIGludGVyYWN0cyB3aXRoIG1lbnVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lbnVTdGF0ZSA9IHtcbiAgICAgICAgICAgIC8vIFdlIHdpbGwgYWRkIHRvIG1lbnUgc3RhdGUgYXMgdXNlciBpbnB1dCBpcyB2YWxpZGF0ZWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBGdW5jdGlvbiBjYWxsZWQgYWZ0ZXIgdXNlciBoaXRzIHN1Ym1pdC5cbiAgICAgICAgTG9vcCB0aHJvdWdoIG1lbnVTdGF0ZSBvYmplY3QgdG8gY2hlY2sgdGhlcmUgYXJlIG5vIGVycm9ycy4gUmV0dXJuIHRydWUgaWYgZ29vZCB0byBnbywgYWxsb3dpbmcgc3VibWlzc2lvbi5cbiAgICAqL1xuICAgIHN0YXRpYyBpc0Zvcm1WYWxpZChtZW51U3RhdGUpIHtcbiAgICAgICAgbGV0IGlzVmFsaWQ7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG1lbnVTdGF0ZSkge1xuICAgICAgICAgICAgaWYgKG1lbnVTdGF0ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lbnVTdGF0ZVtrZXldID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiAgIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gb25lIG9mIHRoZSBtZW51IGlucHV0cyBjaGFuZ2VzXG4gICAgKi9cbiAgICBzdGF0aWMgaW5wdXRDaGFuZ2UoZSkge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZUVsZW0gPSBlLnRhcmdldDsgLy8gVGhlIGh0bWwgaW5wdXQgZWxlbWVudCB3aGljaCBoYXMgY2hhbmdlZFxuICAgICAgICBjb25zdCBpdGVtVmFsdWUgPSBlLnRhcmdldC52YWx1ZTsgLy8gSW5wdXQgdmFsdWUgZS5nLiBzYWxtb25cbiAgICAgICAgY29uc3QgaXRlbU5hbWUgPSBlLnRhcmdldC5uYW1lOyAvLyBOYW1lIG9mIHRoZSBpbnB1dCBlLmcuIGRpbmVyLTEtZGVzc2VydHNcbiAgICAgICAgY29uc3QgaXRlbUlkID0gZS50YXJnZXQuaWQ7IC8vIElkIG9mIHRoZSBpbnB1dCBlLmcuIGRpbmVyLTEtY2hlZXNlY2FrZVxuXG4gICAgICAgIC8vIEZpcnN0LCB1bmNoZWNrIGFsbCBvdGhlciBjaGVja2JveGVzIGZvciB0aGF0IGRpbmVyLCBmb3IgdGhhdCBjb3Vyc2VcbiAgICAgICAgdGhpcy50b2dnbGVPbmVDaGVja2JveE9ubHkoYWN0aXZlRWxlbSwgaXRlbU5hbWUpO1xuXG4gICAgICAgIC8vIE5vdyB1cGRhdGUgdGhlIG1lbnVPcmRlciBvYmplY3RcbiAgICAgICAgdGhpcy51cGRhdGVPcmRlcihhY3RpdmVFbGVtLCBpdGVtTmFtZSwgaXRlbVZhbHVlKTtcblxuICAgICAgICAvLyBWYWxpZGF0ZSBvcHRpb25zIGNob3NlbiBieSB1c2VyLCB0byBlbnN1cmUgdGhleSBhcmUgaW4gbGluZSB3aXRoIHJlc3RhdXJhbnQgcnVsZXNcbiAgICAgICAgdGhpcy52YWxpZGF0ZU9wdGlvbnMoaXRlbVZhbHVlLCBpdGVtSWQpO1xuXG4gICAgICAgIC8vIEZpbmFsbHkgaWYgYWxsIHRoZSBpbnB1dHMgYXJlIG5vdyB2YWxpZCwgcmVtb3ZlIHRoZSBlcnJvciBzdGF0ZSBmcm9tIHRoZSBzdWJtaXQgYnV0dG9uXG4gICAgICAgIGlmICggdGhpcy5jb25zdHJ1Y3Rvci5pc0Zvcm1WYWxpZCh0aGlzLm1lbnVTdGF0ZSkgKSB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdqcy1zdWJtaXQtYnV0dG9uLS1pbi1lcnJvcicpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICogICBBIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWVudU9yZGVyIG9iamVjdFxuICAgICogICBUaGlzIGFsc28gY2FsbHMgdGhlIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcnVubmluZyBwcmljZSB0b3RhbFxuICAgICovXG4gICAgdXBkYXRlT3JkZXIoKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgc2VsZWN0ZWRNZWFscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RoaXMubWVudUNsYXNzfSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZGApO1xuICAgICAgICBsZXQgbm9kZUxpc3RsZW5ndGggPSBzZWxlY3RlZE1lYWxzLmxlbmd0aDtcbiAgICAgICAgbGV0IGN1cnJlbnRCaWxsID0gMDtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3RsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBGb3IgZWFjaCBzZWxlY3RlZCBtZWFsLCBhZGQgaXQgdG8gdGhlIG9yZGVyIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5tZW51T3JkZXJbIHNlbGVjdGVkTWVhbHNbaV0ubmFtZSBdID0gc2VsZWN0ZWRNZWFsc1tpXS5pZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBwcmljZSB0b3RhbFxuICAgICAgICAgICAgbGV0IHByaWNlID0gcGFyc2VGbG9hdChzZWxlY3RlZE1lYWxzW2ldLmRhdGFzZXQucHJpY2UpO1xuICAgICAgICAgICAgY3VycmVudEJpbGwgKz0gcHJpY2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUJpbGwoY3VycmVudEJpbGwpO1xuICAgIH1cblxuXG4gICAgLypcbiAgICAqICAgVG8gYXZvaWQgYW5nZXJpbmcgdGhlIHVzZXIgYnkgb25seSB0ZWxsaW5nIHRoZW0gdGhlaXIgc2VsZWN0aW9uIGlzIGludmFsaWQgd2hlbiB0aGV5IGdldCByb3VuZCB0byBjbGlja2luZyB0aGUgb3JkZXIgKHN1Ym1pdCkgYnV0dG9uLFxuICAgICogICB0ZXN0IGZvciAyIGNvbmRpdGlvbnMgYXQgdGhpcyBzdGFnZSAtIHdhaXRlciBhcHByb3ZhbCBhbmQgZm9vZCBpdGVtcyBiZWluZyBpbi9vdXQgb2Ygc3RvY2tcbiAgICAqL1xuICAgIHZhbGlkYXRlT3B0aW9ucyhzZWxlY3RlZERpc2gsIGl0ZW1JZCkge1xuICAgICAgICAgXG4gICAgICAgIGlmIChzZWxlY3RlZERpc2ggPT09ICdjaGVlc2VjYWtlJyB8fCB0aGlzLmVycm9ybGltaXQgKSB7XG4gICAgICAgICAgICBpZiggdmFsaWRhdGlvbi5saW1pdE5vdEV4Y2VlZGVkKHRoaXMubWVudU9yZGVyLCAnY2hlZXNlY2FrZScsIDEpICkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVudVN0YXRlWydsaW1pdE5vdEV4Y2VlZGVkJ10gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZXJyb3JsaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5oaWRlRXJyb3IoJ2pzLWVycm9yLWxpbWl0Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVTdGF0ZVsnbGltaXROb3RFeGNlZWRlZCddID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcmxpbWl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlcnJvci5kaXNwbGF5RXJyb3IoJ2pzLWVycm9yLWxpbWl0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWREaXNoID09PSAncHJhd24nIHx8ICdzYWxtb24nKSB7XG4gICAgICAgICAgICBpZiggdmFsaWRhdGlvbi5ub0Jhbm5lZENvbWJpbmF0aW9ucyh0aGlzLm1lbnVPcmRlciwgJ3ByYXduJywgJ3NhbG1vbicpICkge1xuICAgICAgICAgICAgICAgIHRoaXMubWVudVN0YXRlWydub0Jhbm5lZENvbWJpbmF0aW9ucyddID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVycm9yd2FpdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmhpZGVFcnJvcignanMtZXJyb3Itd2FpdGVyJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbWVudS0td2FpdGVyLWxpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubWVudVN0YXRlWydub0Jhbm5lZENvbWJpbmF0aW9ucyddID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcndhaXRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgZXJyb3IuZGlzcGxheUVycm9yKCdqcy1lcnJvci13YWl0ZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21lbnUtLXdhaXRlci1saXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qXG4gICAgKiAgIEEgZnVuY3Rpb24gdG8gdG9nZ2xlIG9mZiByZWxhdGVkIGNoZWNrYm94ZXMgKGFwYXJ0IGZyb20gdGhlIG9uZSBjbGlja2VkKVxuICAgICovXG4gICAgdG9nZ2xlT25lQ2hlY2tib3hPbmx5KGFjdGl2ZUVsZW0sIGl0ZW1OYW1lKSB7XG4gICAgICAgIC8vIEZpcnN0LCB1bmNoZWNrIGFsbCBvdGhlciBjaGVja2JveGVzIGZvciB0aGF0IGRpbmVyLCBmb3IgdGhhdCBjb3Vyc2VcbiAgICAgICAgbGV0IHNhbWVOYW1lU2libGluZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShpdGVtTmFtZSk7XG4gICAgICAgIGxldCBub2RlTGlzdGxlbmd0aCA9IHNhbWVOYW1lU2libGluZ3MubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0bGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNhbWVOYW1lU2libGluZ3NbaV0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIGFjdGl2ZUVsZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLypcbiAgICAqICAgQSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHRvdGFsIGJpbGxcbiAgICAqL1xuICAgIHVwZGF0ZUJpbGwocHJpY2UpIHtcbiAgICAgICAgbGV0IHRvdGFsRWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1tZW51LXRvdGFsJyk7XG4gICAgICAgIC8vIE5vdyB1cGRhdGUgdGhlIHJ1bm5pbmcgdG90YWxcbiAgICAgICAgdG90YWxFbGVtLmlubmVySFRNTCA9IGAmcG91bmQ7JHtwcmljZX1gO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiAgIEluaXRpYWxpc2UgdGhlIG1lbnUgVUlcbiAgICAqL1xuICAgIGluaXRpYWxpc2UoKSB7XG4gICAgICAgIC8vIFJlc2V0IGZvcm0gdmFsdWVzLCBpbiBjYXNlIHVzZXIgaGFzIGNsaWNrZWQgYmFjayBidXR0b24gYWZ0ZXIgc3VibWl0dGluZyBmb3JtXG4gICAgICAgIHRoaXMubWVudUVsZW1lbnQucmVzZXQoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXNlIHRoZSBmb3JtIGlucHV0c1xuICAgICAgICBjb25zdCBtZW51SW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmlucHV0c0NsYXNzKTtcblxuICAgICAgICAvLyBMaXN0ZW4gZm9yIGNoYW5nZXMgaW4gdGhlIGNoZWNrYm94IGVsZW1lbnRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudUlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWVudUlucHV0c1tpXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNvbnN0cnVjdG9yLmlucHV0Q2hhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWxzbyBsaXN0ZW4gZm9yIHRoZSB1c2VyIGNsaWNraW5nIHN1Ym1pdFxuICAgICAgICB0aGlzLm1lbnVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMub25Gb3JtU3VibWl0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiAgIEEgZnVuY3Rpb24gdG8gaGFuZGxlIHRoZSB1c2VyIGNsaWNraW5nIG9uIHN1Ym1pdFxuICAgICovXG4gICAgb25Gb3JtU3VibWl0KGUpIHtcbiAgICAgICAgLy8gdXNlZnVsIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tZW51U3RhdGUpO1xuXG4gICAgICAgIC8vIEhvbGQgZmlyZSBvbiB0aGUgc3VibWlzc2lvblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgdXNlciBoYXMgb3JkZXJlZCBhdCBsZWFzdCB0d28gY291cnNlcywgb25lIG9mIHdoaWNoIGlzIGEgbWFpblxuICAgICAgICBpZiggdmFsaWRhdGlvbi5taW5pbXVtT3JkZXJBY2hpZXZlZCh0aGlzLm1lbnVPcmRlciwgJ2RpbmVyLTAtbWFpbnMnLCAnZGluZXItMS1tYWlucycsICdkaW5lci0wJykgKSB7XG4gICAgICAgICAgICB0aGlzLm1lbnVTdGF0ZVsnbWluaW11bU9yZGVyQWNoaWV2ZWQnXSA9IHRydWU7XG4gICAgICAgICAgICBpZih0aGlzLmVycm9ybWluaW11bSkge1xuICAgICAgICAgICAgICAgIGVycm9yLmhpZGVFcnJvcignanMtZXJyb3ItbWluaW11bScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51U3RhdGVbJ21pbmltdW1PcmRlckFjaGlldmVkJ10gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JtaW5pbXVtID0gdHJ1ZTtcbiAgICAgICAgICAgIGVycm9yLmRpc3BsYXlFcnJvcignanMtZXJyb3ItbWluaW11bScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUnVuIHRoZSBtZW51U3RhdGUgb2JqZWN0IHRocm91Z2ggdGhlIGlzRm9ybVZhbGlkIGZ1bmN0aW9uXG4gICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yLmlzRm9ybVZhbGlkKHRoaXMubWVudVN0YXRlKSkge1xuICAgICAgICAgICAgLy8gSWYgZXZlcnl0aGluZyBpcyB2YWxpZCwgZ28gYWhlYWQgd2l0aCBzdWJtaXNzaW9uIGFuZCBnbyB0byB0aGFua3MgcGFnZVxuICAgICAgICAgICAgLy8gdGhpcy5tZW51RWxlbWVudC5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vIEZvciB0aGlzIGRlbW8sIHdlIHdpbGwgc2V0dGxlIGZvciBhIHN1Y2Nlc3MgbWVzc2FnZSBvbiB0aGlzIHNjcmVlblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXN1Y2Nlc3MtbWVzc2FnZScpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3Igc3RhdGUgb24gdGhlIHN1Ym1pdCBidXR0b25cbiAgICAgICAgICAgIHRoaXMuc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0blN1Ym1pdC0taW4tZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1lbnU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhYmxlKGNsYXNzTmFtZSkge1xuXHRsZXQgbmV3VGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuXHRuZXdUYWJsZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdHJldHVybiBuZXdUYWJsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFibGVIZWFkZXJzKGNvdW50LCB0YWJsZSkge1xuXHR2YXIgcm93ID0gdGFibGUuaW5zZXJ0Um93KDApO1xuXHQvKiBcblx0KiBJbnNlcnQgY29sdW1uIGhlYWRpbmdzLCBlLmcuIERpbmVyIDEsIERpbmVyIDIuXG5cdCogRm9yIGVhY2ggZGluZXIgSSBhbSBpbnNlcnRpbmcgdHdvIGNlbGxzLCB0aGUgZmlyc3Qgb2Ygd2hpY2ggaXMgYmxhbmsuXG5cdCogVGhpcyBlbnN1cmVzIHRoZXNlIGNvbHVtbiBoZWFkZXIgY2VsbHMgYXJlIHVuaWZvcm0gd2l0aCB0YWJsZSBjZWxscyBhcHBlYXJpbmcgYmVsb3cgdGhlbS5cblx0Ki9cdFxuXHRmb3IobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHRcdGxldCBjZWxsMSA9IHJvdy5pbnNlcnRDZWxsKC0xKTtcblx0XHRjZWxsMS5jbGFzc0xpc3QuYWRkKCdtZW51X19jb2x1bW4tYmxhbmsnLCBgbWVudV9fY29sdW1uLWJsYW5rLS0ke2l9YCk7XG5cdFx0bGV0IGNlbGwyID0gcm93Lmluc2VydENlbGwoLTEpO1xuXHRcdGNlbGwyLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2NvbHVtbi1oZWFkaW5nJyk7XG5cdFx0Y2VsbDIuaW5uZXJIVE1MID0gYERpbmVyICR7aSArIDEgfWA7XG5cdH1cblxuXHRyZXR1cm4gdGFibGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhYmxlU2VjdGlvbihkaW5lckNvdW50LCB0YWJsZSwgc2VjdGlvblRpdGxlKSB7XG5cdHZhciByb3cgPSB0YWJsZS5pbnNlcnRSb3coLTEpO1xuXHR2YXIgY2VsbCA9IHJvdy5pbnNlcnRDZWxsKDApO1xuXHRjZWxsLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2NhdGVnb3J5Jyk7XG5cdGNlbGwuaW5uZXJIVE1MPSBgJHtzZWN0aW9uVGl0bGV9YDtcblx0Y2VsbC5jb2xTcGFuID0gZGluZXJDb3VudCAqIDI7XG5cdHJldHVybiB0YWJsZTtcbn1cblxuZnVuY3Rpb24gYWRkVGFibGVEYXRhKGRpbmVyQ291bnQsIHByb2R1Y3RDb2RlLCBwcm9kdWN0TmFtZSwgcHJvZHVjdFByaWNlLCBjb3Vyc2UsIHRhYmxlKSB7XG5cdHZhciByb3cgPSB0YWJsZS5pbnNlcnRSb3coLTEpO1xuXHQvKiBcblx0Klx0U28gZm9yIGVhY2ggZGluZXIsIGluc2VydCBhIHByb2R1Y3QgZGVzY3JpcHRpb24gYW5kIGNoZWNrYm94XG5cdCogXHRXaGlsc3QgSSdtIG9ubHkgZGlzcGxheWluZyBvbmUgcHJvZHVjdCBkZXNjcmlwdGlvbiBvbiB0aGUgZm9ybSAodG8gYXZvaWQgaXQgYmVpbmcgdG9vIHdvcmR5KSwgXG5cdCpcdGl0IGlzIGltcG9ydGFudCB0byBpbmNsdWRlIGxhYmVscyBmb3IgZWFjaCBjaGVja2JveCBpbiB0aGUgbWFyay11cCwgZm9yIHRob3NlIHdpdGggYWNjZXNzaWJpbGl0eSBuZWVkcyB3aG8gY2FuJ3Qgc2VlIHRoZSBVSVxuXHQqL1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZGluZXJDb3VudDsgaSsrKSB7XG5cdFx0Ly8gRmlyc3QgYWRkIHRoZSBwcm9kdWN0IGRlc2NyaXB0aW9uIGNlbGxcblx0XHR2YXIgY2VsbDEgPSByb3cuaW5zZXJ0Q2VsbCgtMSk7XG5cdFx0Y2VsbDEuY2xhc3NMaXN0LmFkZCgnbWVudV9fZGVzY3JpcHRpb24nLCBgbWVudV9fZGVzY3JpcHRpb24tLSR7aX1gKTtcblx0XHRsZXQgbGFiZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcblx0XHQvLyBBc3NvY2lhdGUgbGFiZWwgd2l0aCBjb3JyZWN0IGNoZWNrYm94IGJ1dHRvblxuXHRcdGxhYmVsMS5odG1sRm9yID0gYGRpbmVyLSR7aX0tJHtwcm9kdWN0Q29kZX1gO1xuXHRcdC8vIEluc2VydCB0ZXh0IGZvciBwcm9kdWN0IG5hbWUsIHByaWNlIFxuXHRcdGxhYmVsMS5pbm5lckhUTUwgPSBgJHtwcm9kdWN0TmFtZX0sICZwb3VuZDske3Byb2R1Y3RQcmljZX1gO1xuXHRcdGNlbGwxLmFwcGVuZENoaWxkKGxhYmVsMSk7XG5cdFx0XG5cdFx0Ly8gTm93IGFkZCB0aGUgY2hlY2tib3ggYnV0dG9uIGZvciBlYWNoIGRpbmVyXG5cdFx0dmFyIGNlbGwyID0gcm93Lmluc2VydENlbGwoLTEpO1xuXHRcdGNlbGwyLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2Nob2ljZScpO1xuXHRcdGxldCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdFx0Y2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG5cdFx0Y2hlY2tib3guY2xhc3NMaXN0LmFkZCgnanMtdmFsaWRhdGUnKTtcblx0XHRjaGVja2JveC5pZCA9IGBkaW5lci0ke2l9LSR7cHJvZHVjdENvZGV9YDsgLy8gQ29ycmVzcG9uZHMgdG8gYWNjb21wYW55aW5nIGxhYmVsXG5cdFx0Y2hlY2tib3gubmFtZSA9IGBkaW5lci0ke2l9LSR7Y291cnNlfWAudG9Mb3dlckNhc2UoKTsgLy8gVGVsbHMgb3VyIGRhdGFiYXNlIHdoaWNoIGZpZWxkIHRvIHBvcHVsYXRlIFxuXHRcdGNoZWNrYm94LnZhbHVlID0gcHJvZHVjdENvZGU7IC8vIFZhbHVlIHRvIGlucHV0IGludG8gZGF0YWJhc2Vcblx0XHRjaGVja2JveC5kYXRhc2V0LnByaWNlID0gYCR7cHJvZHVjdFByaWNlfWA7IC8vIEVhc3kgYWNjZXNzIHRvIHRoZSBwcmljZSwgZm9yIHRoZSBiaWxsIGNhbGN1bGF0aW9uXG5cdFx0Y2VsbDIuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuXHR9XG5cblx0cmV0dXJuIHRhYmxlO1xufVxuXG5leHBvcnQge2NyZWF0ZVRhYmxlLCBjcmVhdGVUYWJsZUhlYWRlcnMsIGNyZWF0ZVRhYmxlU2VjdGlvbiwgYWRkVGFibGVEYXRhfTsiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGxpbWl0Tm90RXhjZWVkZWQob3JkZXIsIGl0ZW0xLCBsaW1pdCkge1xuICAgIGxldCBpdGVtQ291bnQgPSAwO1xuICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgaXRlbXMgaW4gdGhlIG9yZGVyLCBhbmQgYWRkIHRvIGNvdW50IGlmIHlvdSBzZWUgZmxhZ2dlZCBpdGVtXG4gICAgZm9yICggbGV0IGl0ZW0gaW4gb3JkZXIgKSB7XG4gICAgICAgIGlmICggb3JkZXIuaGFzT3duUHJvcGVydHkoaXRlbSkgJiYgb3JkZXJbaXRlbV0uaW5jbHVkZXMoaXRlbTEpICkge1xuICAgICAgICAgICAgaXRlbUNvdW50ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRmluYWxseSBzZWUgaWYgdGhlIGxpbWl0IGhhcyBiZWVuIGV4Y2VlZGVkIGZvciB0aGF0IGl0ZW1cbiAgICByZXR1cm4gKGxpbWl0ID49IGl0ZW1Db3VudCk7XG59XG5cbmZ1bmN0aW9uIG5vQmFubmVkQ29tYmluYXRpb25zKG9yZGVyLCBpdGVtMSwgaXRlbTIpIHtcbiAgICBsZXQgbm9JdGVtMU9yZGVyZWQgPSB0cnVlO1xuICAgIGxldCBub0l0ZW0yT3JkZXJlZCA9IHRydWU7XG4gICAgXG4gICAgZm9yIChsZXQgaXRlbSBpbiBvcmRlcikge1xuICAgICAgICBpZiAoIG9yZGVyLmhhc093blByb3BlcnR5KGl0ZW0pICYmIG9yZGVyW2l0ZW1dLmluY2x1ZGVzKGl0ZW0xKSApIHtcbiAgICAgICAgICAgIG5vSXRlbTFPcmRlcmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCBvcmRlci5oYXNPd25Qcm9wZXJ0eShpdGVtKSAmJiBvcmRlcltpdGVtXS5pbmNsdWRlcyhpdGVtMikgKSB7XG4gICAgICAgICAgICBub0l0ZW0yT3JkZXJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFub0l0ZW0xT3JkZXJlZCAmJiAhbm9JdGVtMk9yZGVyZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyBcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gbWluaW11bU9yZGVyQWNoaWV2ZWQob3JkZXIsIGl0ZW0xLCBpdGVtMiwgb3B0aW9uKSB7XG4gICAgbGV0IGl0ZW0xUHJlc2VudCA9IGZhbHNlO1xuICAgIGxldCBpdGVtMlByZXNlbnQgPSBmYWxzZTtcbiAgICBsZXQgZGluZXIxQ291bnQgPSAwO1xuICAgIGxldCBkaW5lcjJDb3VudCA9IDA7XG5cbiAgICBmb3IgKGxldCBpdGVtIGluIG9yZGVyKSB7XG4gICAgICAgIGlmICggb3JkZXIuaGFzT3duUHJvcGVydHkoaXRlbSkgKSB7XG5cbiAgICAgICAgICAgIGlmICggaXRlbSA9PSBpdGVtMSApIHtcbiAgICAgICAgICAgICAgICBpdGVtMVByZXNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRpbmVyMUNvdW50ICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYoIGl0ZW0gPT0gaXRlbTIgKSB7XG4gICAgICAgICAgICAgICAgaXRlbTJQcmVzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkaW5lcjJDb3VudCArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmKCBpdGVtLmluY2x1ZGVzKG9wdGlvbikgKSB7XG4gICAgICAgICAgICAgICAgZGluZXIxQ291bnQgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGluZXIyQ291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIGl0ZW0xUHJlc2VudCAmJiBpdGVtMlByZXNlbnQgJiYgKGRpbmVyMUNvdW50ID4gMSApICYmIChkaW5lcjJDb3VudCA+IDEpICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9ICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgbGltaXROb3RFeGNlZWRlZCwgbm9CYW5uZWRDb21iaW5hdGlvbnMsIG1pbmltdW1PcmRlckFjaGlldmVkfTsiXX0=
