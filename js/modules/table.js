'use strict';

function createTable(className) {
	let newTable = document.createElement('table');
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
	for(let i = 0; i < count; i++) {
		let cell1 = row.insertCell(-1);
		cell1.classList.add('menu__column-blank', `menu__column-blank--${i}`);
		let cell2 = row.insertCell(-1);
		cell2.classList.add('menu__column-heading');
		cell2.innerHTML = `Diner ${i + 1 }`;
	}

	return table;
}

function createTableSection(dinerCount, table, sectionTitle) {
	var row = table.insertRow(-1);
	var cell = row.insertCell(0);
	cell.classList.add('menu__category');
	cell.innerHTML= `${sectionTitle}`;
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
	for(var i = 0; i < dinerCount; i++) {
		// First add the product description cell
		var cell1 = row.insertCell(-1);
		cell1.classList.add('menu__description', `menu__description--${i}`);
		let label1 = document.createElement('label');
		// Associate label with correct checkbox button
		label1.htmlFor = `diner-${i}-${productCode}`;
		// Insert text for product name, price 
		label1.innerHTML = `${productName}, &pound;${productPrice}`;
		cell1.appendChild(label1);
		
		// Now add the checkbox button for each diner
		var cell2 = row.insertCell(-1);
		cell2.classList.add('menu__choice');
		let checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.classList.add('js-validate');
		checkbox.id = `diner-${i}-${productCode}`; // Corresponds to accompanying label
		checkbox.name = `diner-${i}-${course}`.toLowerCase(); // Tells our database which field to populate 
		checkbox.value = productCode; // Value to input into database
		checkbox.dataset.price = `${productPrice}`; // Easy access to the price, for the bill calculation
		cell2.appendChild(checkbox);
	}

	return table;
}

export {createTable, createTableHeaders, createTableSection, addTableData};