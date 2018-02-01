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

// Grab our target for where food form will be injected.


// Import methods from table building module
var targetform = document.querySelector('.menu__wrapper');
// Generate a docfrag


// Import our order module, which will keep a tab on the user's actions as they interact with the UI
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

// Now we have our menu laid out, initialise it so it's ready for reacting to the user's actions
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
        *   A function to update the menuOrder object, and which calls the function to update the running price total
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
    }, {
        key: 'updateBill',
        value: function updateBill(price) {
            var totalElem = document.getElementById('js-menu-total');
            // Now update the running total
            totalElem.innerHTML = '&pound;' + price;
        }
    }, {
        key: 'initialise',
        value: function initialise() {
            // Set form variables
            var menuInputs = document.querySelectorAll(this.inputsClass); // The inputs that trigger validation

            // Reset form values, in case user has clicked back after submitting form
            this.menuElement.reset();

            // Listen for changes in the checkbox elements
            for (var i = 0; i < menuInputs.length; i++) {
                menuInputs[i].addEventListener('change', this.constructor.inputChange.bind(this));
            }

            // Also listen for the user clicking submit
            this.menuElement.addEventListener('submit', this.onFormSubmit.bind(this));
        }
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

        // Called when one of the menu inputs change

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
 * 	Whilst I'm only displaying one product descriptions on the form (to avoid it being too wordy), 
 *	it's important to include labels for each checkbox in the mark-up, for those who with accessibility needs who can't see the UI
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9kYXRhL21lYWxEYXRhLmpzIiwianMvbWFpbi5qcyIsImpzL21vZHVsZXMvZXJyb3IuanMiLCJqcy9tb2R1bGVzL21lbnUuanMiLCJqcy9tb2R1bGVzL3RhYmxlLmpzIiwianMvbW9kdWxlcy92YWxpZGF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxJQUFJOzs7Y0FFbUIsQUFDVixBQUNQO3FCQUZpQixBQUVGLEFBQ2Y7ZUFKUSxBQUNTLEFBR1IsQUFFWDtBQUxtQixBQUNsQjs7Y0FJTyxBQUNDLEFBQ1A7cUJBRk0sQUFFUyxBQUNmO2VBVFEsQUFNRixBQUdHLEFBRVg7QUFMUSxBQUNQOztjQUlhLEFBQ0wsQUFDUDtxQkFGWSxBQUVHLEFBQ2Y7ZUFkUSxBQVdJLEFBR0gsQUFFWDtBQUxjLEFBQ2I7O2NBSWlCLEFBQ1QsQUFDUDtxQkFGZ0IsQUFFRCxBQUNmO2VBcEJTLEFBQ0QsQUFnQlEsQUFHUCxBQUdiO0FBTm9CLEFBQ2pCO0FBakJTLEFBQ1Y7OztjQXNCUyxBQUNBLEFBQ1A7cUJBRk8sQUFFUSxBQUNmO2VBSkssQUFDRSxBQUdFLEFBRVg7QUFMUyxBQUNSOztjQUlZLEFBQ0osQUFDUDtxQkFGVyxBQUVJLEFBQ2Y7ZUFUSyxBQU1NLEFBR0YsQUFFWDtBQUxhLEFBQ1o7O2NBSWdCLEFBQ1IsQUFDUDtxQkFGZSxBQUVBLEFBQ2Y7ZUFkSyxBQVdVLEFBR04sQUFFWDtBQUxpQixBQUNoQjs7Y0FJcUIsQUFDYixBQUNQO3FCQUZvQixBQUVMLEFBQ2Y7ZUExQ1MsQUF1QkosQUFnQmUsQUFHWCxBQUdiO0FBTndCLEFBQ3JCO0FBakJNLEFBQ1A7OztjQXNCeUIsQUFDaEIsQUFDUDtxQkFGdUIsQUFFUixBQUNmO2VBSlEsQUFDZSxBQUdkLEFBRVg7QUFMeUIsQUFDeEI7O2NBSVcsQUFDSCxBQUNQO3FCQUZVLEFBRUssQUFDZjtlQVRRLEFBTUUsQUFHRCxBQUVYO0FBTFksQUFDWDs7Y0FJYSxBQUNMLEFBQ1A7cUJBRlksQUFFRyxBQUNmO2VBSFksQUFHSCxBQUNUO2tCQWZRLEFBV0ksQUFJQSxBQUVkO0FBTmMsQUFDYjs7Y0FLWSxBQUNKLEFBQ1A7cUJBRlcsQUFFSSxBQUNmO2VBakVOLEFBQWUsQUE2Q0QsQUFpQkcsQUFHRjtBQUhFLEFBQ1o7QUFsQlMsQUFDVjtBQTlDVyxBQUNiOztrQixBQXFFYTs7O0FDdEVmOztBQUVBOztBQUNBOzs7O0FBR0E7O0ksQUFBWTs7QUFHWjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7O0FBTkE7QUFPQSxJQUFNLGFBQWEsU0FBQSxBQUFTLGNBQTVCLEFBQW1CLEFBQXVCO0FBQzFDOzs7QUFMQTtBQU1BLElBQUksV0FBVyxTQUFmLEFBQWUsQUFBUzs7QUFFeEI7QUFDQSxJQUFJLGFBQUosQUFBaUI7O0FBRWpCO0FBQ0EsSUFBSSxZQUFZLE1BQUEsQUFBTSxZQUF0QixBQUFnQixBQUFrQjs7QUFFbEM7QUFDQSxZQUFZLE1BQUEsQUFBTSxtQkFBTixBQUF5QixZQUFyQyxBQUFZLEFBQXFDOztBQUVqRDtBQUNBLEtBQUssSUFBTCxBQUFTLG1DQUF5QixBQUM5QjtRQUFLLG1CQUFBLEFBQVMsZUFBZCxBQUFLLEFBQXdCLGNBQWUsQUFDeEM7QUFDQTtvQkFBWSxNQUFBLEFBQU0sbUJBQU4sQUFBeUIsWUFBekIsQUFBcUMsV0FBakQsQUFBWSxBQUFnRCxBQUM1RDtBQUNBO1lBQUksU0FBUyxtQkFBYixBQUFhLEFBQVMsQUFFdEI7O2FBQUssSUFBTCxBQUFTLFVBQVQsQUFBbUIsUUFBUSxBQUN2QjtnQkFBSyxPQUFBLEFBQU8sZUFBWixBQUFLLEFBQXNCLFNBQVUsQUFDakM7b0JBQUksWUFBWSxPQUFoQixBQUFnQixBQUFPLEFBQ3ZCO0FBQ0E7NEJBQVksTUFBQSxBQUFNLGFBQU4sQUFDUixZQUNBLFVBRlEsQUFFRSxhQUNWLFVBSFEsQUFHRSxNQUNWLFVBSlEsQUFJRSxPQUpGLEFBS1IsYUFMSixBQUFZLEFBTVIsQUFFUDtBQUNKO0FBQ0o7QUFDSjs7O0FBRUQ7QUFDQSxTQUFBLEFBQVMsWUFBVCxBQUFxQjtBQUNyQjtBQUNBLFdBQUEsQUFBVyxZQUFYLEFBQXVCOztBQUV2QjtBQUNBLElBQU0sWUFBWSxtQkFBQSxBQUFTLFFBQVQsQUFBaUIsUUFBbkMsQUFBa0IsQUFBeUI7QUFDM0MsVUFBQSxBQUFVOzs7QUN6RFY7Ozs7O0FBRUEsU0FBQSxBQUFTLGFBQVQsQUFBc0IsUUFBUSxBQUMxQjtRQUFJLFVBQVUsU0FBQSxBQUFTLGVBQXZCLEFBQWMsQUFBd0IsQUFDdEM7WUFBQSxBQUFRLE1BQVIsQUFBYyxVQUFkLEFBQXdCLEFBQ3hCO0FBQ0g7OztBQUVELFNBQUEsQUFBUyxVQUFULEFBQW1CLFFBQVEsQUFDdkI7UUFBSSxVQUFVLFNBQUEsQUFBUyxlQUF2QixBQUFjLEFBQXdCLEFBQ3RDO1lBQUEsQUFBUSxNQUFSLEFBQWMsVUFBZCxBQUF3QixBQUN4QjtBQUNIOzs7USxBQUVRLGUsQUFBQTtRLEFBQWMsWSxBQUFBOzs7QUNkdkI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7O0FBRkE7O0ksQUFBWTs7QUFHWjs7SSxBQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVaO0FBQ0EsSUFBTSxtQkFFRjtrQkFBQSxBQUFZLFFBQVosQUFBb0IsV0FBcEIsQUFBK0IsYUFBYTs4QkFDeEM7O2FBQUEsQUFBSyxTQUFMLEFBQWMsQUFDZDthQUFBLEFBQUssWUFBTCxBQUFpQixBQUNqQjthQUFBLEFBQUssY0FBTCxBQUFtQixBQUNuQjthQUFBLEFBQUssY0FBYyxTQUFBLEFBQVMsZUFBZSxLQUEzQyxBQUFtQixBQUE2QixBQUNoRDthQUFBLEFBQUssV0FBVyxTQUFBLEFBQVMsZUFBekIsQUFBZ0IsQUFBd0IsQUFDeEM7YUFBQSxBQUFLLGVBQWUsU0FBQSxBQUFTLGVBQTdCLEFBQW9CLEFBQXdCLEFBQzVDO2FBQUEsQUFBSyxjQUFMLEFBQW1CLEFBQ25CO2FBQUEsQUFBSyxhQUFMLEFBQWtCLEFBQ2xCO2FBQUEsQUFBSyxlQUFMLEFBQW9CLEFBQ3BCO2FBQUEsQUFBSztBQUFMLEFBQWlCLEFBR2pCO0FBSGlCLEFBQ2I7YUFFSixBQUFLO0FBQUwsQUFBaUIsQUFHcEI7QUFIb0IsQUFDYjtBQUlSOztBQXBCRTs7Ozs7O2FBOERGOztBQTlERTs7O3NDQWlFWSxBQUVWOztnQkFBSSxnQkFBZ0IsU0FBQSxBQUFTLHVCQUFxQixLQUE5QixBQUFtQyxZQUF2RCxBQUNBO2dCQUFJLGlCQUFpQixjQUFyQixBQUFtQyxBQUNuQztnQkFBSSxjQUFKLEFBQWtCLEFBRWxCOztpQkFBSyxJQUFJLElBQVQsQUFBYSxHQUFHLElBQWhCLEFBQW9CLGdCQUFwQixBQUFvQyxLQUFLLEFBRXJDOztBQUNBO3FCQUFBLEFBQUssVUFBVyxjQUFBLEFBQWMsR0FBOUIsQUFBaUMsUUFBUyxjQUFBLEFBQWMsR0FBeEQsQUFBMkQsQUFFM0Q7O0FBQ0E7b0JBQUksUUFBUSxXQUFXLGNBQUEsQUFBYyxHQUFkLEFBQWlCLFFBQXhDLEFBQVksQUFBb0MsQUFDaEQ7K0JBQUEsQUFBZSxBQUNsQjtBQUVEOztpQkFBQSxBQUFLLFdBQUwsQUFBZ0IsQUFDbkI7QUFHRDs7QUFyRkU7Ozs7O0FBQUE7YUFBQTt3Q0FBQSxBQXlGYyxjQXpGZCxBQXlGNEIsUUFBUSxBQUVsQzs7Z0JBQUksaUJBQUEsQUFBaUIsZ0JBQWdCLEtBQXJDLEFBQTBDLFlBQWEsQUFDbkQ7b0JBQUksV0FBQSxBQUFXLGlCQUFpQixLQUE1QixBQUFpQyxXQUFqQyxBQUE0QyxjQUFoRCxBQUFJLEFBQTBELElBQUssQUFDL0Q7eUJBQUEsQUFBSyxVQUFMLEFBQWUsc0JBQWYsQUFBcUMsQUFDckM7d0JBQUcsS0FBSCxBQUFRLFlBQVksQUFDaEI7OEJBQUEsQUFBTSxVQUFOLEFBQWdCLEFBQ25CO0FBQ0o7QUFMRCx1QkFLTyxBQUNIO3lCQUFBLEFBQUssVUFBTCxBQUFlLHNCQUFmLEFBQXFDLEFBQ3JDO3lCQUFBLEFBQUssYUFBTCxBQUFrQixBQUNsQjswQkFBQSxBQUFNLGFBQU4sQUFBbUIsQUFDdEI7QUFDSjtBQUVEOztnQkFBSSxpQkFBQSxBQUFpQixXQUFyQixBQUFnQyxVQUFVLEFBQ3RDO29CQUFJLFdBQUEsQUFBVyxxQkFBcUIsS0FBaEMsQUFBcUMsV0FBckMsQUFBZ0QsU0FBcEQsQUFBSSxBQUF5RCxXQUFZLEFBQ3JFO3lCQUFBLEFBQUssVUFBTCxBQUFlLDBCQUFmLEFBQXlDLEFBQ3pDO3dCQUFHLEtBQUgsQUFBUSxhQUFhLEFBQ2pCOzhCQUFBLEFBQU0sVUFBTixBQUFnQixBQUNoQjs2QkFBQSxBQUFLLFlBQUwsQUFBaUIsVUFBakIsQUFBMkIsT0FBM0IsQUFBa0MsQUFDckM7QUFDSjtBQU5ELHVCQU1PLEFBQ0g7eUJBQUEsQUFBSyxVQUFMLEFBQWUsMEJBQWYsQUFBeUMsQUFDekM7eUJBQUEsQUFBSyxjQUFMLEFBQW1CLEFBQ25COzBCQUFBLEFBQU0sYUFBTixBQUFtQixBQUNuQjt5QkFBQSxBQUFLLFlBQUwsQUFBaUIsVUFBakIsQUFBMkIsSUFBM0IsQUFBK0IsQUFDbEM7QUFDSjtBQUVKO0FBdkhDO0FBQUE7YUFBQTs4Q0FBQSxBQXlIb0IsWUF6SHBCLEFBeUhnQyxVQUFVLEFBQ3hDO0FBQ0E7Z0JBQUksbUJBQW1CLFNBQUEsQUFBUyxrQkFBaEMsQUFBdUIsQUFBMkIsQUFDbEQ7Z0JBQUksaUJBQWlCLGlCQUFyQixBQUFzQyxBQUN0QztpQkFBSyxJQUFJLElBQVQsQUFBYSxHQUFHLElBQWhCLEFBQW9CLGdCQUFwQixBQUFvQyxLQUFLLEFBQ3JDO2lDQUFBLEFBQWlCLEdBQWpCLEFBQW9CLFVBQXBCLEFBQThCLEFBQ2pDO0FBRUQ7O3VCQUFBLEFBQVcsVUFBWCxBQUFxQixBQUN4QjtBQWxJQztBQUFBO2FBQUE7bUNBQUEsQUFvSVMsT0FBTyxBQUNkO2dCQUFJLFlBQVksU0FBQSxBQUFTLGVBQXpCLEFBQWdCLEFBQXdCLEFBQ3hDO0FBQ0E7c0JBQUEsQUFBVSx3QkFBVixBQUFnQyxBQUNuQztBQXhJQztBQUFBO2FBQUE7cUNBMElXLEFBQ1Q7QUFDQTtnQkFBTSxhQUFhLFNBQUEsQUFBUyxpQkFBaUIsS0FGcEMsQUFFVCxBQUFtQixBQUErQixjQUFjLEFBRWhFOztBQUNBO2lCQUFBLEFBQUssWUFBTCxBQUFpQixBQUVqQjs7QUFDQTtpQkFBSyxJQUFJLElBQVQsQUFBYSxHQUFHLElBQUksV0FBcEIsQUFBK0IsUUFBL0IsQUFBdUMsS0FBSyxBQUN4QzsyQkFBQSxBQUFXLEdBQVgsQUFBYyxpQkFBZCxBQUErQixVQUFVLEtBQUEsQUFBSyxZQUFMLEFBQWlCLFlBQWpCLEFBQTZCLEtBQXRFLEFBQXlDLEFBQWtDLEFBQzlFO0FBRUQ7O0FBQ0Q7aUJBQUEsQUFBSyxZQUFMLEFBQWlCLGlCQUFqQixBQUFrQyxVQUFVLEtBQUEsQUFBSyxhQUFMLEFBQWtCLEtBQTlELEFBQTRDLEFBQXVCLEFBQ3JFO0FBeEpDO0FBQUE7YUFBQTtxQ0FBQSxBQTBKVyxHQUFHLEFBQ1o7QUFDQTtBQUVBOztBQUNBO2NBQUEsQUFBRSxBQUVGOztBQUNBO2dCQUFJLFdBQUEsQUFBVyxxQkFBcUIsS0FBaEMsQUFBcUMsV0FBckMsQUFBZ0QsaUJBQWhELEFBQWlFLGlCQUFyRSxBQUFJLEFBQWtGLFlBQWEsQUFDL0Y7cUJBQUEsQUFBSyxVQUFMLEFBQWUsMEJBQWYsQUFBeUMsQUFDekM7b0JBQUcsS0FBSCxBQUFRLGNBQWMsQUFDbEI7MEJBQUEsQUFBTSxVQUFOLEFBQWdCLEFBQ25CO0FBQ0o7QUFMRCxtQkFLTyxBQUNIO3FCQUFBLEFBQUssVUFBTCxBQUFlLDBCQUFmLEFBQXlDLEFBQ3pDO3FCQUFBLEFBQUssZUFBTCxBQUFvQixBQUNwQjtzQkFBQSxBQUFNLGFBQU4sQUFBbUIsQUFDdEI7QUFFRDs7QUFDQTtnQkFBSSxLQUFBLEFBQUssWUFBTCxBQUFpQixZQUFZLEtBQWpDLEFBQUksQUFBa0MsWUFBWSxBQUM5QztBQUNBO0FBQ0E7QUFDQTt5QkFBQSxBQUFTLGVBQVQsQUFBd0Isc0JBQXhCLEFBQThDLE1BQTlDLEFBQW9ELFVBQXBELEFBQThELEFBQ2pFO0FBTEQsbUJBS08sQUFDSDtBQUNBO3FCQUFBLEFBQUssYUFBTCxBQUFrQixVQUFsQixBQUE0QixJQUE1QixBQUFnQyxBQUNuQztBQUNKO0FBdkxDO0FBQUE7YUFBQTtvQ0FBQSxBQXdCaUIsV0FBVyxBQUMxQjtnQkFBSSxlQUFKLEFBQ0E7aUJBQUssSUFBTCxBQUFXLE9BQVgsQUFBa0IsV0FBVyxBQUN6QjtvQkFBSSxVQUFBLEFBQVUsZUFBZCxBQUFJLEFBQXlCLE1BQU0sQUFDL0I7d0JBQUksVUFBQSxBQUFVLFNBQWQsQUFBdUIsT0FBTyxBQUMxQjtrQ0FBQSxBQUFVLEFBQ1Y7QUFDSDtBQUNMOzhCQUFBLEFBQVUsQUFDVDtBQUNKO0FBQ0Q7bUJBQUEsQUFBTyxBQUNWO0FBRUQ7O0FBdENFOztBQUFBO2FBQUE7b0NBQUEsQUF1Q2lCOztnQkFFVCxhQUFhLEVBRkQsQUFFbEIsQUFBcUIsUUFBUSxBQUM3QjtnQkFBTSxZQUFZLEVBQUEsQUFBRSxPQUhGLEFBR2xCLEFBQTJCLE9BQU8sQUFDbEM7Z0JBQU0sV0FBVyxFQUFBLEFBQUUsT0FKRCxBQUlsQixBQUEwQixNQUFNLEFBQ2hDO2dCQUFNLFNBQVMsRUFBQSxBQUFFLE9BTEMsQUFLbEIsQUFBd0IsR0FMTixBQUVsQixDQUc0QixBQUU1Qjs7QUFDQTtpQkFBQSxBQUFLLHNCQUFMLEFBQTJCLFlBQTNCLEFBQXVDLEFBRXZDOztBQUNBO2lCQUFBLEFBQUssWUFBTCxBQUFpQixZQUFqQixBQUE2QixVQUE3QixBQUF1QyxBQUV2Qzs7QUFDQTtpQkFBQSxBQUFLLGdCQUFMLEFBQXFCLFdBQXJCLEFBQWdDLEFBRWhDOztBQUNBO2dCQUFLLEtBQUEsQUFBSyxZQUFMLEFBQWlCLFlBQVksS0FBbEMsQUFBSyxBQUFrQyxZQUFhLEFBQ2hEO3FCQUFBLEFBQUssYUFBTCxBQUFrQixVQUFsQixBQUE0QixPQUE1QixBQUFtQyxBQUN0QztBQUVKO0FBNURDO0FBQUE7O1dBQUE7QUFBTjs7a0IsQUEwTGU7OztBQ25NZjs7Ozs7QUFFQSxTQUFBLEFBQVMsWUFBVCxBQUFxQixXQUFXLEFBQy9CO0tBQUksV0FBVyxTQUFBLEFBQVMsY0FBeEIsQUFBZSxBQUF1QixBQUN0QztVQUFBLEFBQVMsVUFBVCxBQUFtQixJQUFuQixBQUF1QixBQUN2QjtRQUFBLEFBQU8sQUFDUDs7O0FBRUQsU0FBQSxBQUFTLG1CQUFULEFBQTRCLE9BQTVCLEFBQW1DLE9BQU8sQUFDekM7S0FBSSxNQUFNLE1BQUEsQUFBTSxVQUFoQixBQUFVLEFBQWdCLEFBRTFCOztBQUtBOzs7OztNQUFJLElBQUksSUFBUixBQUFZLEdBQUcsSUFBZixBQUFtQixPQUFuQixBQUEwQixLQUFLLEFBQzlCO01BQUksUUFBUSxJQUFBLEFBQUksV0FBVyxDQUEzQixBQUFZLEFBQWdCLEFBQzVCO1FBQUEsQUFBTSxVQUFOLEFBQWdCLElBQWhCLEFBQW9CLCtDQUFwQixBQUFpRSxBQUNqRTtNQUFJLFFBQVEsSUFBQSxBQUFJLFdBQVcsQ0FBM0IsQUFBWSxBQUFnQixBQUM1QjtRQUFBLEFBQU0sVUFBTixBQUFnQixJQUFoQixBQUFvQixBQUNwQjtRQUFBLEFBQU0sd0JBQXFCLElBQTNCLEFBQStCLEFBQy9CO0FBRUQ7O1FBQUEsQUFBTyxBQUNQOzs7QUFFRCxTQUFBLEFBQVMsbUJBQVQsQUFBNEIsWUFBNUIsQUFBd0MsT0FBeEMsQUFBK0MsY0FBYyxBQUM1RDtLQUFJLE1BQU0sTUFBQSxBQUFNLFVBQVUsQ0FBMUIsQUFBVSxBQUFpQixBQUMzQjtLQUFJLE9BQU8sSUFBQSxBQUFJLFdBQWYsQUFBVyxBQUFlLEFBQzFCO01BQUEsQUFBSyxVQUFMLEFBQWUsSUFBZixBQUFtQixBQUNuQjtNQUFBLEFBQUssaUJBQUwsQUFBbUIsQUFDbkI7TUFBQSxBQUFLLFVBQVUsYUFBZixBQUE0QixBQUM1QjtRQUFBLEFBQU8sQUFDUDs7O0FBRUQsU0FBQSxBQUFTLGFBQVQsQUFBc0IsWUFBdEIsQUFBa0MsYUFBbEMsQUFBK0MsYUFBL0MsQUFBNEQsY0FBNUQsQUFBMEUsUUFBMUUsQUFBa0YsT0FBTyxBQUN4RjtLQUFJLE1BQU0sTUFBQSxBQUFNLFVBQVUsQ0FBMUIsQUFBVSxBQUFpQixBQUUzQjs7QUFLQTs7Ozs7TUFBSSxJQUFJLElBQVIsQUFBWSxHQUFHLElBQWYsQUFBbUIsWUFBbkIsQUFBK0I7O0FBRzlCO01BQUksUUFBUSxJQUFBLEFBQUksV0FBVyxDQUEzQixBQUFZLEFBQWdCLEFBQzVCO1FBQUEsQUFBTSxVQUFOLEFBQWdCLElBQWhCLEFBQW9CLDZDQUFwQixBQUErRCxBQUMvRDtNQUFJLFNBQVMsU0FBQSxBQUFTLGNBQXRCLEFBQWEsQUFBdUIsQUFDcEM7QUFDQTtTQUFBLEFBQU8scUJBQVAsQUFBMEIsVUFBMUIsQUFBK0IsQUFDL0I7QUFDQTtTQUFBLEFBQU8sWUFBUCxBQUFzQiw0QkFBdEIsQUFBNkMsQUFDN0M7UUFBQSxBQUFNLFlBQU4sQUFBa0IsQUFFbEI7O0FBQ0E7TUFBSSxRQUFRLElBQUEsQUFBSSxXQUFXLENBQTNCLEFBQVksQUFBZ0IsQUFDNUI7UUFBQSxBQUFNLFVBQU4sQUFBZ0IsSUFBaEIsQUFBb0IsQUFDcEI7TUFBSSxXQUFXLFNBQUEsQUFBUyxjQUF4QixBQUFlLEFBQXVCLEFBQ3RDO1dBQUEsQUFBUyxPQUFULEFBQWdCLEFBQ2hCO1dBQUEsQUFBUyxVQUFULEFBQW1CLElBQW5CLEFBQXVCLEFBQ3ZCO1dBQUEsQUFBUyxnQkFBVCxBQUF1QixVQWxCWSxBQWtCbkMsQUFBNEIsYUFBZSxBQUMzQztXQUFBLEFBQVMsT0FBTyxZQUFBLEFBQVMsVUFBVCxBQUFjLFFBbkJLLEFBbUJuQyxBQUFnQixBQUF1QixlQUFlLEFBQ3REO1dBQUEsQUFBUyxRQXBCMEIsQUFvQm5DLEFBQWlCLFlBcEJrQixBQUVuQyxDQWtCOEIsQUFDOUI7V0FBQSxBQUFTLFFBQVQsQUFBaUIsYUFyQmtCLEFBcUJuQyxBQUE0QixjQUFnQixBQUM1QztRQUFBLEFBQU0sWUFBTixBQUFrQixBQUNsQjtBQUVEOztRQUFBLEFBQU8sQUFDUDs7O1EsQUFFTyxjLEFBQUE7USxBQUFhLHFCLEFBQUE7USxBQUFvQixxQixBQUFBO1EsQUFBb0IsZSxBQUFBOzs7QUN4RTdEOzs7OztBQUVBLFNBQUEsQUFBUyxpQkFBVCxBQUEwQixPQUExQixBQUFpQyxPQUFqQyxBQUF3QyxPQUFPLEFBQzNDO1FBQUksWUFBSixBQUFnQixBQUNoQjtBQUNBO1NBQU0sSUFBTixBQUFVLFFBQVYsQUFBa0IsT0FBUSxBQUN0QjtZQUFLLE1BQUEsQUFBTSxlQUFOLEFBQXFCLFNBQVMsTUFBQSxBQUFNLE1BQU4sQUFBWSxTQUEvQyxBQUFtQyxBQUFxQixRQUFTLEFBQzdEO3lCQUFBLEFBQWEsQUFDaEI7QUFDSjtBQUNEO0FBQ0E7V0FBUSxTQUFSLEFBQWlCLEFBQ3BCOzs7QUFFRCxTQUFBLEFBQVMscUJBQVQsQUFBOEIsT0FBOUIsQUFBcUMsT0FBckMsQUFBNEMsT0FBTyxBQUMvQztRQUFJLGlCQUFKLEFBQXFCLEFBQ3JCO1FBQUksaUJBQUosQUFBcUIsQUFFckI7O1NBQUssSUFBTCxBQUFTLFFBQVQsQUFBaUIsT0FBTyxBQUNwQjtZQUFLLE1BQUEsQUFBTSxlQUFOLEFBQXFCLFNBQVMsTUFBQSxBQUFNLE1BQU4sQUFBWSxTQUEvQyxBQUFtQyxBQUFxQixRQUFTLEFBQzdEOzZCQUFBLEFBQWlCLEFBQ3BCO0FBQ0Q7WUFBSyxNQUFBLEFBQU0sZUFBTixBQUFxQixTQUFTLE1BQUEsQUFBTSxNQUFOLEFBQVksU0FBL0MsQUFBbUMsQUFBcUIsUUFBUyxBQUM3RDs2QkFBQSxBQUFpQixBQUNwQjtBQUNKO0FBRUQ7O1FBQUksQ0FBQSxBQUFDLGtCQUFrQixDQUF2QixBQUF3QixnQkFBZ0IsQUFDcEM7ZUFBQSxBQUFPLEFBQ1Y7QUFGRCxXQUVPLEFBQ0g7ZUFBQSxBQUFPLEFBQ1Y7QUFFSjs7O0FBRUQsU0FBQSxBQUFTLHFCQUFULEFBQThCLE9BQTlCLEFBQXFDLE9BQXJDLEFBQTRDLE9BQTVDLEFBQW1ELFFBQVEsQUFDdkQ7UUFBSSxlQUFKLEFBQW1CLEFBQ25CO1FBQUksZUFBSixBQUFtQixBQUNuQjtRQUFJLGNBQUosQUFBa0IsQUFDbEI7UUFBSSxjQUFKLEFBQWtCLEFBRWxCOztTQUFLLElBQUwsQUFBUyxRQUFULEFBQWlCLE9BQU8sQUFDcEI7WUFBSyxNQUFBLEFBQU0sZUFBWCxBQUFLLEFBQXFCLE9BQVEsQUFFOUI7O2dCQUFLLFFBQUwsQUFBYSxPQUFRLEFBQ2pCOytCQUFBLEFBQWUsQUFDZjsrQkFBQSxBQUFlLEFBQ2xCO0FBSEQsdUJBR1csUUFBSixBQUFZLE9BQVEsQUFDdkI7K0JBQUEsQUFBZSxBQUNmOytCQUFBLEFBQWUsQUFDbEI7QUFITSxhQUFBLFVBR0ksS0FBQSxBQUFLLFNBQVQsQUFBSSxBQUFjLFNBQVUsQUFDL0I7K0JBQUEsQUFBZSxBQUNsQjtBQUZNLGFBQUEsTUFFQSxBQUNIOytCQUFBLEFBQWUsQUFDbEI7QUFFSjtBQUNKO0FBRUQ7O1FBQUksZ0JBQUEsQUFBZ0IsZ0JBQWlCLGNBQWpDLEFBQStDLEtBQVEsY0FBM0QsQUFBeUUsR0FBSyxBQUMxRTtlQUFBLEFBQU8sQUFDVjtBQUZELFdBRVEsQUFDSjtlQUFBLEFBQU8sQUFDVjtBQUNKOzs7USxBQUVRLG1CLEFBQUE7USxBQUFrQix1QixBQUFBO1EsQUFBc0IsdUIsQUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbWVudURhdGEgPSB7XG4gIFwiU3RhcnRlcnNcIjoge1xuICAgIFwiU291cCBvZiB0aGUgZGF5XCI6IHtcbiAgICBcdFwibmFtZVwiOiBcIlNvdXAgb2YgdGhlIGRheVwiLFxuICAgICAgXCJwcm9kdWN0Q29kZVwiOiBcInNvdXBcIixcbiAgICAgIFwicHJpY2VcIjogM1xuICAgIH0sXG4gICAgXCJQw6J0w6lcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiUMOidMOpXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwicGF0ZVwiLFxuICAgICAgXCJwcmljZVwiOiA1XG4gICAgfSxcbiAgICBcIkJydXNjaGV0dGFcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiQnJ1c2NoZXR0YVwiLFxuICAgICAgXCJwcm9kdWN0Q29kZVwiOiBcImJydXNjaGV0dGFcIixcbiAgICAgIFwicHJpY2VcIjogNC41XG4gICAgfSxcbiAgICBcIlByYXduIENvY2t0YWlsXCI6IHtcbiAgICBcdFwibmFtZVwiOiBcIlByYXduIENvY2t0YWlsXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwicHJhd25cIixcbiAgICAgIFwicHJpY2VcIjogNlxuICAgIH0sXG4gIH0sXG4gIFwiTWFpbnNcIjoge1xuICAgIFwiU3RlYWtcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiU3RlYWtcIixcbiAgICAgIFwicHJvZHVjdENvZGVcIjogXCJzdGVha1wiLFxuICAgICAgXCJwcmljZVwiOiAxOFxuICAgIH0sXG4gICAgXCJNZWF0YmFsbHNcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiTWVhdGJhbGxzXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwibWVhdGJhbGxzXCIsXG4gICAgICBcInByaWNlXCI6IDExLjVcbiAgICB9LFxuICAgIFwiU2FsbW9uIEZpbGxldFwiOiB7XG4gICAgXHRcIm5hbWVcIjogXCJTYWxtb24gRmlsbGV0XCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwic2FsbW9uXCIsXG4gICAgICBcInByaWNlXCI6IDE0XG4gICAgfSxcbiAgICBcIlZlZ2V0YXJpYW4gTGFzYWduYVwiOiB7XG4gICAgXHRcIm5hbWVcIjogXCJWZWdldGFyaWFuIExhc2FnbmFcIixcbiAgICAgIFwicHJvZHVjdENvZGVcIjogXCJsYXNhZ25hXCIsXG4gICAgICBcInByaWNlXCI6IDEyXG4gICAgfSxcbiAgfSxcbiAgXCJEZXNzZXJ0c1wiOiB7XG4gICAgXCJTdGlja3kgVG9mZmVlIFB1ZGRpbmdcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiU3RpY2t5IFRvZmZlZSBQdWRkaW5nXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwic3RpY2t5XCIsXG4gICAgICBcInByaWNlXCI6IDRcbiAgICB9LFxuICAgIFwiVGlyYW1pc3VcIjoge1xuICAgIFx0XCJuYW1lXCI6IFwiVGlyYW1pc3VcIixcbiAgICAgIFwicHJvZHVjdENvZGVcIjogXCJ0aXJhbWlzdVwiLFxuICAgICAgXCJwcmljZVwiOiA0LjVcbiAgICB9LFxuICAgIFwiQ2hlZXNlY2FrZVwiOiB7XG4gICAgXHRcIm5hbWVcIjogXCJDaGVlc2VjYWtlXCIsXG4gICAgICBcInByb2R1Y3RDb2RlXCI6IFwiY2hlZXNlY2FrZVwiLFxuICAgICAgXCJwcmljZVwiOiA0LFxuICAgICAgXCJxdWFudGl0eVwiOiAxXG4gICAgfSxcbiAgICBcIkljZSBDcmVhbVwiOiB7XG4gICAgXHRcIm5hbWVcIjogXCJJY2UgQ3JlYW1cIixcbiAgICAgIFwicHJvZHVjdENvZGVcIjogXCJpY2VjcmVhbVwiLFxuICAgICAgXCJwcmljZVwiOiAzLjVcbiAgICB9LFxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZW51RGF0YTsiLCIndXNlIHN0cmljdCc7XG5cbi8vIEltcG9ydCBtZW51IGRhdGFcbmltcG9ydCBtZW51RGF0YSBmcm9tICcuL2RhdGEvbWVhbERhdGEnO1xuXG4vLyBJbXBvcnQgbWV0aG9kcyBmcm9tIHRhYmxlIGJ1aWxkaW5nIG1vZHVsZVxuaW1wb3J0ICogYXMgdGFibGUgZnJvbSAnLi9tb2R1bGVzL3RhYmxlJztcblxuLy8gSW1wb3J0IG91ciBvcmRlciBtb2R1bGUsIHdoaWNoIHdpbGwga2VlcCBhIHRhYiBvbiB0aGUgdXNlcidzIGFjdGlvbnMgYXMgdGhleSBpbnRlcmFjdCB3aXRoIHRoZSBVSVxuaW1wb3J0IE1lbnUgZnJvbSAnLi9tb2R1bGVzL21lbnUnO1xuXG4vLyBHcmFiIG91ciB0YXJnZXQgZm9yIHdoZXJlIGZvb2QgZm9ybSB3aWxsIGJlIGluamVjdGVkLlxuY29uc3QgdGFyZ2V0Zm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X193cmFwcGVyJyk7XG4vLyBHZW5lcmF0ZSBhIGRvY2ZyYWdcbmxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuLy8gU2V0IG51bWJlciBvZiBkaW5lcnMgLSBpbiBmdXR1cmUgd291bGQgYmUgZ29vZCB0byBsZXQgdXNlciBkZWNpZGUgdGhpcyBudW1iZXIgdmlhIHRoZSBVSVxubGV0IGRpbmVyQ291bnQgPSAyO1xuXG4vLyBDcmVhdGUgb3VyIG1lbnUgLSBvdXRwdXR0aW5nIHRoaXMgaW4gdGFibGUgZm9ybVxubGV0IG1lbnVUYWJsZSA9IHRhYmxlLmNyZWF0ZVRhYmxlKCdtZW51X190YWJsZScpO1xuXG4vLyBBZGQgbWVudSBjb2x1bW4gaGVhZGluZ3MsIGUuZy4gRGluZXIgMSwgRGluZXIgMlxubWVudVRhYmxlID0gdGFibGUuY3JlYXRlVGFibGVIZWFkZXJzKGRpbmVyQ291bnQsIG1lbnVUYWJsZSk7XG5cbi8vIEdlbmVyYXRlIG91ciBtZW51IHNlY3Rpb24gaGVhZGluZ3MgYW5kIGZvb2QgaXRlbXMgZm9yIGVhY2ggc2VjdGlvblxuZm9yICh2YXIgbWVudVNlY3Rpb24gaW4gbWVudURhdGEpIHtcbiAgICBpZiAoIG1lbnVEYXRhLmhhc093blByb3BlcnR5KG1lbnVTZWN0aW9uKSApIHtcbiAgICAgICAgLy8gRmlyc3QgaW5zZXJ0IGVhY2ggbWVudSBzZWN0aW9uIGhlYWRpbmdcbiAgICAgICAgbWVudVRhYmxlID0gdGFibGUuY3JlYXRlVGFibGVTZWN0aW9uKGRpbmVyQ291bnQsIG1lbnVUYWJsZSwgbWVudVNlY3Rpb24pO1xuICAgICAgICAvLyBUaWR5IHVwIGNvZGUgc28gd2UgZG9uJ3QgaGF2ZSB0byBxdW90ZSBtZW51RGF0YVttZW51U2VjdGlvbl0gYWxsIHRoZSB0aW1lXG4gICAgICAgIGxldCB0aWNrZXIgPSBtZW51RGF0YVttZW51U2VjdGlvbl07XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBjb3Vyc2UgaW4gdGlja2VyKSB7XG4gICAgICAgICAgICBpZiAoIHRpY2tlci5oYXNPd25Qcm9wZXJ0eShjb3Vyc2UpICkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdUaWNrZXIgPSB0aWNrZXJbY291cnNlXTtcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgZWFjaCBkaXNoIGludG8gdGhlIG1lbnUgdGFibGVcbiAgICAgICAgICAgICAgICBtZW51VGFibGUgPSB0YWJsZS5hZGRUYWJsZURhdGEoXG4gICAgICAgICAgICAgICAgICAgIGRpbmVyQ291bnQsICBcbiAgICAgICAgICAgICAgICAgICAgbmV3VGlja2VyLnByb2R1Y3RDb2RlLCBcbiAgICAgICAgICAgICAgICAgICAgbmV3VGlja2VyLm5hbWUsIFxuICAgICAgICAgICAgICAgICAgICBuZXdUaWNrZXIucHJpY2UsIFxuICAgICAgICAgICAgICAgICAgICBtZW51U2VjdGlvbiwgXG4gICAgICAgICAgICAgICAgICAgIG1lbnVUYWJsZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIEZpbmFsbHkgYWRkIHRhYmxlIHRvIHRoZSBkb2NmcmFnXG5mcmFnbWVudC5hcHBlbmRDaGlsZChtZW51VGFibGUpO1xuLy8gQW5kIGF0dGFjaCBvdXIgZG9jZnJhZ1xudGFyZ2V0Zm9ybS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG5cbi8vIE5vdyB3ZSBoYXZlIG91ciBtZW51IGxhaWQgb3V0LCBpbml0aWFsaXNlIGl0IHNvIGl0J3MgcmVhZHkgZm9yIHJlYWN0aW5nIHRvIHRoZSB1c2VyJ3MgYWN0aW9uc1xuY29uc3Qgb3JkZXJJbml0ID0gbmV3IE1lbnUoJ21lbnUnLCAnbWVudScsICcuanMtdmFsaWRhdGUnKTtcbm9yZGVySW5pdC5pbml0aWFsaXNlKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGRpc3BsYXlFcnJvcihlbGVtSWQpIHtcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICByZXR1cm47XG59XG5cbmZ1bmN0aW9uIGhpZGVFcnJvcihlbGVtSWQpIHtcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCk7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHJldHVybjtcbn1cblxuZXhwb3J0IHsgZGlzcGxheUVycm9yLCBoaWRlRXJyb3IgfTsiLCIndXNlIHN0cmljdCc7XG5cbi8vIEltcG9ydCBvdXIgbWVudSB2YWxpZGF0aW9uIG1vZHVsZVxuaW1wb3J0ICogYXMgdmFsaWRhdGlvbiBmcm9tICcuL3ZhbGlkYXRpb24nO1xuXG4vLyBJbXBvcnQgb3VyIGVycm9yIG1lc3NhZ2VzIG1vZHVsZVxuaW1wb3J0ICogYXMgZXJyb3IgZnJvbSAnLi9lcnJvcic7XG5cbi8vIENvbnN0cnVjdCBvdXIgTWVudSBvYmplY3RcbmNvbnN0IE1lbnUgPSBjbGFzcyBNZW51IHtcbiAgXG4gICAgY29uc3RydWN0b3IobWVudUlkLCBtZW51Q2xhc3MsIGlucHV0c0NsYXNzKSB7XG4gICAgICAgIHRoaXMubWVudUlkID0gbWVudUlkO1xuICAgICAgICB0aGlzLm1lbnVDbGFzcyA9IG1lbnVDbGFzcztcbiAgICAgICAgdGhpcy5pbnB1dHNDbGFzcyA9IGlucHV0c0NsYXNzO1xuICAgICAgICB0aGlzLm1lbnVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5tZW51SWQpO1xuICAgICAgICB0aGlzLmVycm9yTG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLW1lbnUtZXJyb3ItbG9nJyk7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXN1Ym1pdC1idXR0b24nKTtcbiAgICAgICAgdGhpcy5lcnJvcndhaXRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVycm9ybGltaXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lcnJvcm1pbmltdW0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tZW51T3JkZXIgPSB7XG4gICAgICAgICAgICAvLyBXZSB3aWxsIGFkZCB0byBvcmRlciBhcyB1c2VyIGludGVyYWN0cyB3aXRoIG1lbnVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lbnVTdGF0ZSA9IHtcbiAgICAgICAgICAgIC8vIFdlIHdpbGwgYWRkIHRvIG1lbnUgc3RhdGUgYXMgdXNlciBpbnB1dCBpcyB2YWxpZGF0ZWRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBGdW5jdGlvbiBjYWxsZWQgYWZ0ZXIgdXNlciBoaXRzIHN1Ym1pdC5cbiAgICAgICAgTG9vcCB0aHJvdWdoIG1lbnVTdGF0ZSBvYmplY3QgdG8gY2hlY2sgdGhlcmUgYXJlIG5vIGVycm9ycy4gUmV0dXJuIHRydWUgaWYgZ29vZCB0byBnbywgYWxsb3dpbmcgc3VibWlzc2lvbi5cbiAgICAqL1xuICAgIHN0YXRpYyBpc0Zvcm1WYWxpZChtZW51U3RhdGUpIHtcbiAgICAgICAgbGV0IGlzVmFsaWQ7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG1lbnVTdGF0ZSkge1xuICAgICAgICAgICAgaWYgKG1lbnVTdGF0ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lbnVTdGF0ZVtrZXldID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xuICAgIH1cblxuICAgIC8vIENhbGxlZCB3aGVuIG9uZSBvZiB0aGUgbWVudSBpbnB1dHMgY2hhbmdlXG4gICAgc3RhdGljIGlucHV0Q2hhbmdlKGUpIHtcblxuICAgICAgICBjb25zdCBhY3RpdmVFbGVtID0gZS50YXJnZXQ7IC8vIFRoZSBodG1sIGlucHV0IGVsZW1lbnQgd2hpY2ggaGFzIGNoYW5nZWRcbiAgICAgICAgY29uc3QgaXRlbVZhbHVlID0gZS50YXJnZXQudmFsdWU7IC8vIElucHV0IHZhbHVlIGUuZy4gc2FsbW9uXG4gICAgICAgIGNvbnN0IGl0ZW1OYW1lID0gZS50YXJnZXQubmFtZTsgLy8gTmFtZSBvZiB0aGUgaW5wdXQgZS5nLiBkaW5lci0xLWRlc3NlcnRzXG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9IGUudGFyZ2V0LmlkOyAvLyBJZCBvZiB0aGUgaW5wdXQgZS5nLiBkaW5lci0xLWNoZWVzZWNha2VcblxuICAgICAgICAvLyBGaXJzdCwgdW5jaGVjayBhbGwgb3RoZXIgY2hlY2tib3hlcyBmb3IgdGhhdCBkaW5lciwgZm9yIHRoYXQgY291cnNlXG4gICAgICAgIHRoaXMudG9nZ2xlT25lQ2hlY2tib3hPbmx5KGFjdGl2ZUVsZW0sIGl0ZW1OYW1lKTtcblxuICAgICAgICAvLyBOb3cgdXBkYXRlIHRoZSBtZW51T3JkZXIgb2JqZWN0XG4gICAgICAgIHRoaXMudXBkYXRlT3JkZXIoYWN0aXZlRWxlbSwgaXRlbU5hbWUsIGl0ZW1WYWx1ZSk7XG5cbiAgICAgICAgLy8gVmFsaWRhdGUgb3B0aW9ucyBjaG9zZW4gYnkgdXNlciwgdG8gZW5zdXJlIHRoZXkgYXJlIGluIGxpbmUgd2l0aCByZXN0YXVyYW50IHJ1bGVzXG4gICAgICAgIHRoaXMudmFsaWRhdGVPcHRpb25zKGl0ZW1WYWx1ZSwgaXRlbUlkKTtcblxuICAgICAgICAvLyBGaW5hbGx5IGlmIGFsbCB0aGUgaW5wdXRzIGFyZSBub3cgdmFsaWQsIHJlbW92ZSB0aGUgZXJyb3Igc3RhdGUgZnJvbSB0aGUgc3VibWl0IGJ1dHRvblxuICAgICAgICBpZiAoIHRoaXMuY29uc3RydWN0b3IuaXNGb3JtVmFsaWQodGhpcy5tZW51U3RhdGUpICkge1xuICAgICAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnanMtc3VibWl0LWJ1dHRvbi0taW4tZXJyb3InKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAqICAgQSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1lbnVPcmRlciBvYmplY3QsIGFuZCB3aGljaCBjYWxscyB0aGUgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBydW5uaW5nIHByaWNlIHRvdGFsXG4gICAgKi9cbiAgICB1cGRhdGVPcmRlcigpIHtcbiAgICAgICAgXG4gICAgICAgIGxldCBzZWxlY3RlZE1lYWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5tZW51Q2xhc3N9IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXTpjaGVja2VkYCk7XG4gICAgICAgIGxldCBub2RlTGlzdGxlbmd0aCA9IHNlbGVjdGVkTWVhbHMubGVuZ3RoO1xuICAgICAgICBsZXQgY3VycmVudEJpbGwgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlTGlzdGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEZvciBlYWNoIHNlbGVjdGVkIG1lYWwsIGFkZCBpdCB0byB0aGUgb3JkZXIgb2JqZWN0XG4gICAgICAgICAgICB0aGlzLm1lbnVPcmRlclsgc2VsZWN0ZWRNZWFsc1tpXS5uYW1lIF0gPSBzZWxlY3RlZE1lYWxzW2ldLmlkO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHByaWNlIHRvdGFsXG4gICAgICAgICAgICBsZXQgcHJpY2UgPSBwYXJzZUZsb2F0KHNlbGVjdGVkTWVhbHNbaV0uZGF0YXNldC5wcmljZSk7XG4gICAgICAgICAgICBjdXJyZW50QmlsbCArPSBwcmljZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlQmlsbChjdXJyZW50QmlsbCk7XG4gICAgfVxuXG5cbiAgICAvKlxuICAgICogICBUbyBhdm9pZCBhbmdlcmluZyB0aGUgdXNlciBieSBvbmx5IHRlbGxpbmcgdGhlbSB0aGVpciBzZWxlY3Rpb24gaXMgaW52YWxpZCB3aGVuIHRoZXkgZ2V0IHJvdW5kIHRvIGNsaWNraW5nIHRoZSBvcmRlciAoc3VibWl0KSBidXR0b24sXG4gICAgKiAgIHRlc3QgZm9yIDIgY29uZGl0aW9ucyBhdCB0aGlzIHN0YWdlIC0gd2FpdGVyIGFwcHJvdmFsIGFuZCBmb29kIGl0ZW1zIGJlaW5nIGluL291dCBvZiBzdG9ja1xuICAgICovXG4gICAgdmFsaWRhdGVPcHRpb25zKHNlbGVjdGVkRGlzaCwgaXRlbUlkKSB7XG4gICAgICAgICBcbiAgICAgICAgaWYgKHNlbGVjdGVkRGlzaCA9PT0gJ2NoZWVzZWNha2UnIHx8IHRoaXMuZXJyb3JsaW1pdCApIHtcbiAgICAgICAgICAgIGlmKCB2YWxpZGF0aW9uLmxpbWl0Tm90RXhjZWVkZWQodGhpcy5tZW51T3JkZXIsICdjaGVlc2VjYWtlJywgMSkgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51U3RhdGVbJ2xpbWl0Tm90RXhjZWVkZWQnXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5lcnJvcmxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmhpZGVFcnJvcignanMtZXJyb3ItbGltaXQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubWVudVN0YXRlWydsaW1pdE5vdEV4Y2VlZGVkJ10gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ybGltaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVycm9yLmRpc3BsYXlFcnJvcignanMtZXJyb3ItbGltaXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZERpc2ggPT09ICdwcmF3bicgfHwgJ3NhbG1vbicpIHtcbiAgICAgICAgICAgIGlmKCB2YWxpZGF0aW9uLm5vQmFubmVkQ29tYmluYXRpb25zKHRoaXMubWVudU9yZGVyLCAncHJhd24nLCAnc2FsbW9uJykgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51U3RhdGVbJ25vQmFubmVkQ29tYmluYXRpb25zJ10gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZXJyb3J3YWl0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IuaGlkZUVycm9yKCdqcy1lcnJvci13YWl0ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LS13YWl0ZXItbGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51U3RhdGVbJ25vQmFubmVkQ29tYmluYXRpb25zJ10gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yd2FpdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlcnJvci5kaXNwbGF5RXJyb3IoJ2pzLWVycm9yLXdhaXRlcicpO1xuICAgICAgICAgICAgICAgIHRoaXMubWVudUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWVudS0td2FpdGVyLWxpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdG9nZ2xlT25lQ2hlY2tib3hPbmx5KGFjdGl2ZUVsZW0sIGl0ZW1OYW1lKSB7XG4gICAgICAgIC8vIEZpcnN0LCB1bmNoZWNrIGFsbCBvdGhlciBjaGVja2JveGVzIGZvciB0aGF0IGRpbmVyLCBmb3IgdGhhdCBjb3Vyc2VcbiAgICAgICAgbGV0IHNhbWVOYW1lU2libGluZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShpdGVtTmFtZSk7XG4gICAgICAgIGxldCBub2RlTGlzdGxlbmd0aCA9IHNhbWVOYW1lU2libGluZ3MubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0bGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNhbWVOYW1lU2libGluZ3NbaV0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIGFjdGl2ZUVsZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlQmlsbChwcmljZSkge1xuICAgICAgICBsZXQgdG90YWxFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLW1lbnUtdG90YWwnKTtcbiAgICAgICAgLy8gTm93IHVwZGF0ZSB0aGUgcnVubmluZyB0b3RhbFxuICAgICAgICB0b3RhbEVsZW0uaW5uZXJIVE1MID0gYCZwb3VuZDske3ByaWNlfWA7XG4gICAgfVxuXG4gICAgaW5pdGlhbGlzZSgpIHtcbiAgICAgICAgLy8gU2V0IGZvcm0gdmFyaWFibGVzXG4gICAgICAgIGNvbnN0IG1lbnVJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuaW5wdXRzQ2xhc3MpOyAvLyBUaGUgaW5wdXRzIHRoYXQgdHJpZ2dlciB2YWxpZGF0aW9uXG5cbiAgICAgICAgLy8gUmVzZXQgZm9ybSB2YWx1ZXMsIGluIGNhc2UgdXNlciBoYXMgY2xpY2tlZCBiYWNrIGFmdGVyIHN1Ym1pdHRpbmcgZm9ybVxuICAgICAgICB0aGlzLm1lbnVFbGVtZW50LnJlc2V0KCk7XG5cbiAgICAgICAgLy8gTGlzdGVuIGZvciBjaGFuZ2VzIGluIHRoZSBjaGVja2JveCBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbnVJbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1lbnVJbnB1dHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jb25zdHJ1Y3Rvci5pbnB1dENoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsc28gbGlzdGVuIGZvciB0aGUgdXNlciBjbGlja2luZyBzdWJtaXRcbiAgICAgICB0aGlzLm1lbnVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMub25Gb3JtU3VibWl0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG9uRm9ybVN1Ym1pdChlKSB7XG4gICAgICAgIC8vIHVzZWZ1bCBmb3IgZGVidWdnaW5nXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubWVudVN0YXRlKTtcblxuICAgICAgICAvLyBIb2xkIGZpcmUgb24gdGhlIHN1Ym1pc3Npb25cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIHVzZXIgaGFzIG9yZGVyZWQgYXQgbGVhc3QgdHdvIGNvdXJzZXMsIG9uZSBvZiB3aGljaCBpcyBhIG1haW5cbiAgICAgICAgaWYoIHZhbGlkYXRpb24ubWluaW11bU9yZGVyQWNoaWV2ZWQodGhpcy5tZW51T3JkZXIsICdkaW5lci0wLW1haW5zJywgJ2RpbmVyLTEtbWFpbnMnLCAnZGluZXItMCcpICkge1xuICAgICAgICAgICAgdGhpcy5tZW51U3RhdGVbJ21pbmltdW1PcmRlckFjaGlldmVkJ10gPSB0cnVlO1xuICAgICAgICAgICAgaWYodGhpcy5lcnJvcm1pbmltdW0pIHtcbiAgICAgICAgICAgICAgICBlcnJvci5oaWRlRXJyb3IoJ2pzLWVycm9yLW1pbmltdW0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWVudVN0YXRlWydtaW5pbXVtT3JkZXJBY2hpZXZlZCddID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVycm9ybWluaW11bSA9IHRydWU7XG4gICAgICAgICAgICBlcnJvci5kaXNwbGF5RXJyb3IoJ2pzLWVycm9yLW1pbmltdW0nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJ1biB0aGUgbWVudVN0YXRlIG9iamVjdCB0aHJvdWdoIHRoZSBpc0Zvcm1WYWxpZCBmdW5jdGlvblxuICAgICAgICBpZiAodGhpcy5jb25zdHJ1Y3Rvci5pc0Zvcm1WYWxpZCh0aGlzLm1lbnVTdGF0ZSkpIHtcbiAgICAgICAgICAgIC8vIElmIGV2ZXJ5dGhpbmcgaXMgdmFsaWQsIGdvIGFoZWFkIHdpdGggc3VibWlzc2lvbiBhbmQgZ28gdG8gdGhhbmtzIHBhZ2VcbiAgICAgICAgICAgIC8vIHRoaXMubWVudUVsZW1lbnQuc3VibWl0KCk7XG4gICAgICAgICAgICAvLyBGb3IgdGhpcyBkZW1vLCB3ZSB3aWxsIHNldHRsZSBmb3IgYSBzdWNjZXNzIG1lc3NhZ2Ugb24gdGhpcyBzY3JlZW5cbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1zdWNjZXNzLW1lc3NhZ2UnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNob3cgdGhlIGVycm9yIHN0YXRlIG9uIHRoZSBzdWJtaXQgYnV0dG9uXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG5TdWJtaXQtLWluLWVycm9yJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNZW51O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBjcmVhdGVUYWJsZShjbGFzc05hbWUpIHtcblx0bGV0IG5ld1RhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcblx0bmV3VGFibGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuXHRyZXR1cm4gbmV3VGFibGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhYmxlSGVhZGVycyhjb3VudCwgdGFibGUpIHtcblx0dmFyIHJvdyA9IHRhYmxlLmluc2VydFJvdygwKTtcblxuXHQvKiBcblx0KiBJbnNlcnQgY29sdW1uIGhlYWRpbmdzLCBlLmcuIERpbmVyIDEsIERpbmVyIDIuXG5cdCogRm9yIGVhY2ggZGluZXIgSSBhbSBpbnNlcnRpbmcgdHdvIGNlbGxzLCB0aGUgZmlyc3Qgb2Ygd2hpY2ggaXMgYmxhbmsuXG5cdCogVGhpcyBlbnN1cmVzIHRoZXNlIGNvbHVtbiBoZWFkZXIgY2VsbHMgYXJlIHVuaWZvcm0gd2l0aCB0YWJsZSBjZWxscyBhcHBlYXJpbmcgYmVsb3cgdGhlbS5cblx0Ki9cdFxuXHRmb3IobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHRcdGxldCBjZWxsMSA9IHJvdy5pbnNlcnRDZWxsKC0xKTtcblx0XHRjZWxsMS5jbGFzc0xpc3QuYWRkKCdtZW51X19jb2x1bW4tYmxhbmsnLCBgbWVudV9fY29sdW1uLWJsYW5rLS0ke2l9YCk7XG5cdFx0bGV0IGNlbGwyID0gcm93Lmluc2VydENlbGwoLTEpO1xuXHRcdGNlbGwyLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2NvbHVtbi1oZWFkaW5nJyk7XG5cdFx0Y2VsbDIuaW5uZXJIVE1MID0gYERpbmVyICR7aSArIDEgfWA7XG5cdH1cblxuXHRyZXR1cm4gdGFibGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhYmxlU2VjdGlvbihkaW5lckNvdW50LCB0YWJsZSwgc2VjdGlvblRpdGxlKSB7XG5cdHZhciByb3cgPSB0YWJsZS5pbnNlcnRSb3coLTEpO1xuXHR2YXIgY2VsbCA9IHJvdy5pbnNlcnRDZWxsKDApO1xuXHRjZWxsLmNsYXNzTGlzdC5hZGQoJ21lbnVfX2NhdGVnb3J5Jyk7XG5cdGNlbGwuaW5uZXJIVE1MPSBgJHtzZWN0aW9uVGl0bGV9YDtcblx0Y2VsbC5jb2xTcGFuID0gZGluZXJDb3VudCAqIDI7XG5cdHJldHVybiB0YWJsZTtcbn1cblxuZnVuY3Rpb24gYWRkVGFibGVEYXRhKGRpbmVyQ291bnQsIHByb2R1Y3RDb2RlLCBwcm9kdWN0TmFtZSwgcHJvZHVjdFByaWNlLCBjb3Vyc2UsIHRhYmxlKSB7XG5cdHZhciByb3cgPSB0YWJsZS5pbnNlcnRSb3coLTEpO1xuICBcblx0LyogXG5cdCpcdFNvIGZvciBlYWNoIGRpbmVyLCBpbnNlcnQgYSBwcm9kdWN0IGRlc2NyaXB0aW9uIGFuZCBjaGVja2JveFxuXHQqIFx0V2hpbHN0IEknbSBvbmx5IGRpc3BsYXlpbmcgb25lIHByb2R1Y3QgZGVzY3JpcHRpb25zIG9uIHRoZSBmb3JtICh0byBhdm9pZCBpdCBiZWluZyB0b28gd29yZHkpLCBcblx0Klx0aXQncyBpbXBvcnRhbnQgdG8gaW5jbHVkZSBsYWJlbHMgZm9yIGVhY2ggY2hlY2tib3ggaW4gdGhlIG1hcmstdXAsIGZvciB0aG9zZSB3aG8gd2l0aCBhY2Nlc3NpYmlsaXR5IG5lZWRzIHdobyBjYW4ndCBzZWUgdGhlIFVJXG5cdCovXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBkaW5lckNvdW50OyBpKyspIHtcblx0XHRcblx0XHQvLyBGaXJzdCBhZGQgdGhlIHByb2R1Y3QgZGVzY3JpcHRpb24gY2VsbFxuXHRcdHZhciBjZWxsMSA9IHJvdy5pbnNlcnRDZWxsKC0xKTtcblx0XHRjZWxsMS5jbGFzc0xpc3QuYWRkKCdtZW51X19kZXNjcmlwdGlvbicsIGBtZW51X19kZXNjcmlwdGlvbi0tJHtpfWApO1xuXHRcdGxldCBsYWJlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuXHRcdC8vIEFzc29jaWF0ZSBsYWJlbCB3aXRoIGNvcnJlY3QgY2hlY2tib3ggYnV0dG9uXG5cdFx0bGFiZWwxLmh0bWxGb3IgPSBgZGluZXItJHtpfS0ke3Byb2R1Y3RDb2RlfWA7XG5cdFx0Ly8gSW5zZXJ0IHRleHQgZm9yIHByb2R1Y3QgbmFtZSwgcHJpY2UgXG5cdFx0bGFiZWwxLmlubmVySFRNTCA9IGAke3Byb2R1Y3ROYW1lfSwgJnBvdW5kOyR7cHJvZHVjdFByaWNlfWA7XG5cdFx0Y2VsbDEuYXBwZW5kQ2hpbGQobGFiZWwxKTtcblx0XHRcblx0XHQvLyBOb3cgYWRkIHRoZSBjaGVja2JveCBidXR0b24gZm9yIGVhY2ggZGluZXJcblx0XHR2YXIgY2VsbDIgPSByb3cuaW5zZXJ0Q2VsbCgtMSk7XG5cdFx0Y2VsbDIuY2xhc3NMaXN0LmFkZCgnbWVudV9fY2hvaWNlJyk7XG5cdFx0bGV0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRjaGVja2JveC50eXBlID0gJ2NoZWNrYm94Jztcblx0XHRjaGVja2JveC5jbGFzc0xpc3QuYWRkKCdqcy12YWxpZGF0ZScpO1xuXHRcdGNoZWNrYm94LmlkID0gYGRpbmVyLSR7aX0tJHtwcm9kdWN0Q29kZX1gOyAvLyBDb3JyZXNwb25kcyB0byBhY2NvbXBhbnlpbmcgbGFiZWxcblx0XHRjaGVja2JveC5uYW1lID0gYGRpbmVyLSR7aX0tJHtjb3Vyc2V9YC50b0xvd2VyQ2FzZSgpOyAvLyBUZWxscyBvdXIgZGF0YWJhc2Ugd2hpY2ggZmllbGQgdG8gcG9wdWxhdGUgXG5cdFx0Y2hlY2tib3gudmFsdWUgPSBwcm9kdWN0Q29kZTsgLy8gVmFsdWUgdG8gaW5wdXQgaW50byBkYXRhYmFzZVxuXHRcdGNoZWNrYm94LmRhdGFzZXQucHJpY2UgPSBgJHtwcm9kdWN0UHJpY2V9YDsgLy8gRWFzeSBhY2Nlc3MgdG8gdGhlIHByaWNlLCBmb3IgdGhlIGJpbGwgY2FsY3VsYXRpb25cblx0XHRjZWxsMi5hcHBlbmRDaGlsZChjaGVja2JveCk7XG5cdH1cblxuXHRyZXR1cm4gdGFibGU7XG59XG5cbmV4cG9ydCB7Y3JlYXRlVGFibGUsIGNyZWF0ZVRhYmxlSGVhZGVycywgY3JlYXRlVGFibGVTZWN0aW9uLCBhZGRUYWJsZURhdGF9OyIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbGltaXROb3RFeGNlZWRlZChvcmRlciwgaXRlbTEsIGxpbWl0KSB7XG4gICAgbGV0IGl0ZW1Db3VudCA9IDA7XG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBpdGVtcyBpbiB0aGUgb3JkZXIsIGFuZCBhZGQgdG8gY291bnQgaWYgeW91IHNlZSBmbGFnZ2VkIGl0ZW1cbiAgICBmb3IgKCBsZXQgaXRlbSBpbiBvcmRlciApIHtcbiAgICAgICAgaWYgKCBvcmRlci5oYXNPd25Qcm9wZXJ0eShpdGVtKSAmJiBvcmRlcltpdGVtXS5pbmNsdWRlcyhpdGVtMSkgKSB7XG4gICAgICAgICAgICBpdGVtQ291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBGaW5hbGx5IHNlZSBpZiB0aGUgbGltaXQgaGFzIGJlZW4gZXhjZWVkZWQgZm9yIHRoYXQgaXRlbVxuICAgIHJldHVybiAobGltaXQgPj0gaXRlbUNvdW50KTtcbn1cblxuZnVuY3Rpb24gbm9CYW5uZWRDb21iaW5hdGlvbnMob3JkZXIsIGl0ZW0xLCBpdGVtMikge1xuICAgIGxldCBub0l0ZW0xT3JkZXJlZCA9IHRydWU7XG4gICAgbGV0IG5vSXRlbTJPcmRlcmVkID0gdHJ1ZTtcbiAgICBcbiAgICBmb3IgKGxldCBpdGVtIGluIG9yZGVyKSB7XG4gICAgICAgIGlmICggb3JkZXIuaGFzT3duUHJvcGVydHkoaXRlbSkgJiYgb3JkZXJbaXRlbV0uaW5jbHVkZXMoaXRlbTEpICkge1xuICAgICAgICAgICAgbm9JdGVtMU9yZGVyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIG9yZGVyLmhhc093blByb3BlcnR5KGl0ZW0pICYmIG9yZGVyW2l0ZW1dLmluY2x1ZGVzKGl0ZW0yKSApIHtcbiAgICAgICAgICAgIG5vSXRlbTJPcmRlcmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW5vSXRlbTFPcmRlcmVkICYmICFub0l0ZW0yT3JkZXJlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7IFxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBtaW5pbXVtT3JkZXJBY2hpZXZlZChvcmRlciwgaXRlbTEsIGl0ZW0yLCBvcHRpb24pIHtcbiAgICBsZXQgaXRlbTFQcmVzZW50ID0gZmFsc2U7XG4gICAgbGV0IGl0ZW0yUHJlc2VudCA9IGZhbHNlO1xuICAgIGxldCBkaW5lcjFDb3VudCA9IDA7XG4gICAgbGV0IGRpbmVyMkNvdW50ID0gMDtcblxuICAgIGZvciAobGV0IGl0ZW0gaW4gb3JkZXIpIHtcbiAgICAgICAgaWYgKCBvcmRlci5oYXNPd25Qcm9wZXJ0eShpdGVtKSApIHtcblxuICAgICAgICAgICAgaWYgKCBpdGVtID09IGl0ZW0xICkge1xuICAgICAgICAgICAgICAgIGl0ZW0xUHJlc2VudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGluZXIxQ291bnQgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiggaXRlbSA9PSBpdGVtMiApIHtcbiAgICAgICAgICAgICAgICBpdGVtMlByZXNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRpbmVyMkNvdW50ICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYoIGl0ZW0uaW5jbHVkZXMob3B0aW9uKSApIHtcbiAgICAgICAgICAgICAgICBkaW5lcjFDb3VudCArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaW5lcjJDb3VudCArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiggaXRlbTFQcmVzZW50ICYmIGl0ZW0yUHJlc2VudCAmJiAoZGluZXIxQ291bnQgPiAxICkgJiYgKGRpbmVyMkNvdW50ID4gMSkgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgeyBsaW1pdE5vdEV4Y2VlZGVkLCBub0Jhbm5lZENvbWJpbmF0aW9ucywgbWluaW11bU9yZGVyQWNoaWV2ZWR9OyJdfQ==
