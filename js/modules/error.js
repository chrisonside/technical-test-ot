'use strict';

function displayError(elemId) {
    let element = document.getElementById(elemId);
    element.style.display = 'block';
    return;
}

function hideError(elemId) {
    let element = document.getElementById(elemId);
    element.style.display = 'none';
    return;
}

export { displayError, hideError };