'use strict';

// Import menu data
import menuData from './data/mealData';

// Import methods from table building module
import * as table from './modules/table';

// Import our menu module, which will monitor and react to user's actions as they interact with the UI
import Menu from './modules/menu';

// Grab target div where our populated menu will be injected.
const targetform = document.querySelector('.menu__wrapper');

// Generate a docfrag
let fragment = document.createDocumentFragment();

// Set number of diners - in future would be good to let user decide this number via the UI
let dinerCount = 2;

// Create our menu - outputting this in table form
let menuTable = table.createTable('menu__table');

// Add menu column headings, e.g. Diner 1, Diner 2
menuTable = table.createTableHeaders(dinerCount, menuTable);

// Generate our menu section headings and food items for each section
for (var menuSection in menuData) {
    if ( menuData.hasOwnProperty(menuSection) ) {
        // First insert each menu section heading
        menuTable = table.createTableSection(dinerCount, menuTable, menuSection);
        // Tidy up code so we don't have to quote menuData[menuSection] all the time
        let ticker = menuData[menuSection];
        
        for (var course in ticker) {
            if ( ticker.hasOwnProperty(course) ) {
                let newTicker = ticker[course];
                // Insert each dish into the menu table
                menuTable = table.addTableData(
                    dinerCount,  
                    newTicker.productCode, 
                    newTicker.name, 
                    newTicker.price, 
                    menuSection, 
                    menuTable
                );
            }
        }
    }
}

// Finally add table to the docfrag
fragment.appendChild(menuTable);
// And attach our docfrag
targetform.appendChild(fragment);

// Now we have our menu laid out, initialise the menu so it's ready for reacting to the user's actions
const orderInit = new Menu('menu', 'menu', '.js-validate');
orderInit.initialise();
