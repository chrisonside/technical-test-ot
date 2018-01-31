function createTable(className) {
	let newTable = document.createElement('table');
	newTable.classList.add(className);
	return newTable;
}

function createTableHeaders(count, table) {
	// Insert table row
	var row = table.insertRow(0);

	// Now insert cells for this row. 
	// For each diner I am inserting two cells, one for the food label and one for the radio selection button
	for(let i = 0; i < count; i++) {
		let cell1 = row.insertCell(-1);
		let cell2 = row.insertCell(-1);
		cell2.innerHTML = `Diner ${i + 1 }`;
	}

	return table;
}

function createTableSection(dinerCount, table, sectionTitle) {
	var row = table.insertRow(-1);
	var cell = row.insertCell(0);
	cell.innerHTML= `${sectionTitle}`;
	cell.colSpan = dinerCount * 2;
	return table;
}

function addTableData(dinerCount, productCode, productName, productPrice, course, table) {
	// First insert our row
	var row = table.insertRow(-1);
  
	// Now insert our cells for this row
	for(var i = 0; i < dinerCount; i++) {
		// First add description cell
		var cell1 = row.insertCell(-1);
		cell1.classList.add('diner__description', `diner__description--${i}`);
			let label1 = document.createElement('label');
		label1.htmlFor = `diner-${i}-${productCode}`;
		label1.innerHTML = `${productName}, &pound;${productPrice}`;
		cell1.appendChild(label1);
		// Now add the radio button for each diner
		var cell2 = row.insertCell(-1);
		cell2.classList.add('diner__choice');
		let radio = document.createElement('input');
		radio.type = 'radio';
		radio.id = `diner-${i}-${productCode}`;
		radio.name = `diner-${i}-${course}`;
		radio.value = productCode;
		radio.dataset.name = `${productName}`;
		radio.dataset.price = `${productPrice}`;
		cell2.appendChild(radio);
	}

	return table;
}

export {createTable, createTableHeaders, createTableSection, addTableData};