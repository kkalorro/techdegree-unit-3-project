//////////
// Init //
//////////

// User name textbox selector
const selectUserName = document.querySelector('#name');
// User mail textbox selector
const selectUserMail = document.querySelector('#mail');


// Job title dropdown selector
const selectTitle = document.querySelector('#title');
// Other job title textbox selector
let selectOtherTitle;

// Design dropdown selector
const selectDesignSelect = document.querySelector('#design');
// Design dropdown options
const selectDesignOptions = document.querySelectorAll('#design option');
// Colors label
const selectColorsLabel = document.querySelector('#colors-js-puns').firstElementChild;
// Colors dropdown selector
const selectColorsSelect = document.querySelector('#color');
// Color dropdown options
const selectColorsOptions = document.querySelectorAll('#color option');

// Activities field selector
const selectActivitiesField = document.querySelector('.activities');

// Get all the inputs in selectActiviesField
const selectActivitiesInputs = selectActivitiesField.getElementsByTagName('input');

// Payment dropdown selector
const selectPaymentSelect = document.querySelector('#payment');

// Credit card div selector
const selectCreditCard = document.querySelector('#credit-card');
// PayPal div selector
const selectPayPal = document.querySelector('#paypal');
// Bitcoin div selector
const selectBitcoin = document.querySelector('#bitcoin');

// Submit button selector
const selectSubmitButton = document.querySelector('form button');

// 'data-cost' sum in Activities
let cost = 0;

///////////////
// Functions //
///////////////

// Add or remove class to hide element
toggleHidden = (element, bool) => { bool ? element.classList.add('is-hidden') : element.classList.remove('is-hidden'); };

// Add or remove class to make element's text red
toggleInvalidText = (element, bool) => { bool ? element.classList.add('is-invalid-text') : element.classList.remove('is-invalid-text') };

// Add or remove class to make element's border red
toggleInvalidBorder = (element, bool) => { bool ? element.classList.add('is-invalid-border') : element.classList.remove('is-invalid-border') };

// Create a custom textbox after the title select
function initializeOtherJob() {
    const textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.id = 'other-title';
    
    selectTitle.parentElement.appendChild(textbox);

    selectOtherTitle = document.querySelector('#other-title');
}

// Initial classes for Shirts
function initializeShirts() {
    for (let i = 0; i < selectColorsOptions.length; i++) {
        // Shorthand variable for current option
        const cur = selectColorsOptions[i];
        const val = cur.value;
    
        // Give these values the class 'pun'
        if (val === 'cornflowerblue' || val === 'darkslategrey' || val === 'gold') {
            cur.classList.add('pun');
        // Give these values the class 'heart'
        } else if (val === 'tomato' || val === 'steelblue' || val === 'dimgrey') {
            cur.classList.add('heart');
        }
    }

    // Add shirt label instructions
    selectColorsLabel.innerHTML += '<b><i>(Please select a T-shirt theme)</i></b>';

}

// Hide shirt color options and show dropdown requirements
function resetShirtOptions() {

    // Remove first child of shirt design dropdown
    toggleHidden(selectDesignSelect.firstElementChild, true);
    // selectDesignSelect.firstElementChild.classList.add('is-hidden');

    // Remove all shirt options from select dropdown
    for (let i = 0; i < selectColorsOptions.length; i++) {
        toggleHidden(selectColorsOptions[i], true);
    }

        // Remove label header
        selectColorsSelect.value = null;

        // This helps with the appearance for Firefox browsers, but has undesirable affects on Chrome
        // selectColorsSelect.style.width = '100%';

}

function resetPaymentDivs() {
    toggleHidden(selectCreditCard, true);
    toggleHidden(selectPayPal, true);
    toggleHidden(selectBitcoin, true);
}

function initializePage() {
    // Focus on the first input box
    document.querySelector('input').focus();

    // Initial classes for shirts
    initializeShirts();

    // Create other title textbox then hide it until needed
    initializeOtherJob();
    toggleHidden(selectOtherTitle, true);

    // Initial settings for shirt
    resetShirtOptions();

    // Add shirt theme requirement
    // selectColorsSelect.querySelector('#no-design').hidden = false;

    // Hide first option in payment dropdown
    toggleHidden(selectPaymentSelect.firstElementChild, true);

    // Select credit card option from start
    selectPaymentSelect.value = 'credit card';

    // Hide payment info divs
    resetPaymentDivs();
}

/////////////
// Runtime //
/////////////

initializePage();

///////////////
// Listeners //
///////////////

// Open the other title textbox when dropdown is set to other
selectTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        toggleHidden(selectOtherTitle, false);
    } else {
        toggleHidden(selectOtherTitle, true);
    }
});

// Shirt color options change based on design choice
selectDesignSelect.addEventListener('change', (e) => {
    // Variable for target's value
    const val = e.target.value;

    // Hide the initial design option
    // selectDesignSelect.firstElementChild.hidden = true;

    // Remove shirt design requirement from label
    selectColorsLabel.innerHTML = 'Color:';


    // Hide all shirt options
    resetShirtOptions();

    let firstOption = null;

    // Search through all the options
    for (let i = 0; i < selectColorsOptions.length; i++) {
        // If a pun option
        if (val === 'js puns' && selectColorsOptions[i].classList.contains('pun')) {
            // Save the first option's value
            if (firstOption === null) {
                firstOption = selectColorsOptions[i].value;
            }
            // Make current option visable
            toggleHidden(selectColorsOptions[i], false);
        // If a heart option
        } else if (val === 'heart js' && selectColorsOptions[i].classList.contains('heart')) {
            // Save the first option's value
            if (firstOption === null) {
                firstOption = selectColorsOptions[i].value;
            }
            // Make current option visable
            toggleHidden(selectColorsOptions[i], false);
        }
    }

    selectColorsSelect.value = firstOption;
});

////////////////
// Activities //
////////////////

// Create a cost textbox
const costDiv = document.createElement('div');
costDiv.innerHTML = '<b>Total:</b> <span id="cost"></span>';
selectActivitiesField.appendChild(costDiv);
toggleHidden(selectActivitiesField.lastElementChild, true);

// Cost span selector
const selectCost = costDiv.lastElementChild;

// Do not show array containing 'data-day-and-time' values
const doNotEnable = [];

selectActivitiesField.addEventListener('change', (e) => {

    // Current target
    const targ = e.target;
    const checked = targ.checked;
    const price = targ.getAttribute('data-cost');
    const timestamp = targ.getAttribute('data-day-and-time');

    // if e.target is checked
    if (checked) {
        // Update cost
        cost += parseInt(price);
        // check all other inputs for matching 'data-day-and-time'
        for (let i = 0; i < selectActivitiesInputs.length; i++) {
            if (timestamp === selectActivitiesInputs[i].getAttribute('data-day-and-time') && targ.name != selectActivitiesInputs[i].name) {
                // disable and classify matches
                selectActivitiesInputs[i].disabled = true;
                selectActivitiesInputs[i].parentElement.classList.add('disabled');
            }
        }
    } else {
        // Update cost
        cost -= parseInt(price);
        // check all other inputs for matching 'data-day-and-time'
        for (let i = 0; i < selectActivitiesInputs.length; i++) {
            if (timestamp === selectActivitiesInputs[i].getAttribute('data-day-and-time') && targ.name != selectActivitiesInputs[i].name) {
                // enable and classify matches
                selectActivitiesInputs[i].disabled = false;
                selectActivitiesInputs[i].parentElement.classList.remove('disabled');
            }
        }
    }

    // Parse into $
    let costParsed = cost.toString();
    const regex = /^(\d*)$/;
    const replacement = '$$$1\.00';

    // If nothing is checked then hide cost
    if (cost === 0) {
        toggleHidden(selectActivitiesField.lastElementChild, true);
    // If cost isn't showing, show it
    } else if (selectActivitiesField.lastElementChild.classList.contains('is-hidden')) {
        toggleHidden(selectActivitiesField.lastElementChild, false);
    }
    selectCost.textContent = costParsed.replace(regex, replacement);
});

/////////////
// Payment //
/////////////



selectPaymentSelect.addEventListener('change', (e) => {
    // remove first entry
    toggleHidden(selectPaymentSelect.firstElementChild, true);

    // if id:payment value =
    switch (selectPaymentSelect.value) {
        // credit card
        case 'credit card':
            // hide all payment divs
            resetPaymentDivs();
            // show id:credit-card
            toggleHidden(selectCreditCard, false);
            break;
        // paypal
        case 'paypal':
            // hide all payment divs
            resetPaymentDivs();
            // show id:paypal
            toggleHidden(selectPayPal, false);
            break;
        // bitcoin
        case 'bitcoin':
            // hide all payment divs
            resetPaymentDivs();
            // show id:bitcoin
            toggleHidden(selectBitcoin, false);
            break;
    }
});

///////
// Validation after submit button
////

selectSubmitButton.addEventListener('click', (e) => {
    // Remove default submit button behavior
    e.preventDefault();

    // Case insensitive name pattern is alphanumerical inputs
    const regexName = /[a-z]+/i;

    // Case insensitive mail pattern is standard email format
    const regexEmail = /^[^@]+\@[^@.]+\.[a-z]+$/i;

    // Activities legend selector
    const selectActivitiesLegend = selectActivitiesField.firstElementChild;

    // Activities checked counter
    let checkCount = 0;

    // Credit card input selector
    const selectCreditCardSelect = selectCreditCard.querySelector('#cc-num');

    // Zip code input selector
    const selectZipCodeSelect = selectCreditCard.querySelector('#zip');

    // CVV input selector
    const selectCVVSelect = selectCreditCard.querySelector('#cvv');

    function toggleInvalid(element, bool) {
        // Apply red border on element
        toggleInvalidBorder(element, bool);
        // Apply red text to preceeding element
        toggleInvalidText(element.previousElementSibling, bool);
    }

    // Highlight invalid name field in red
    !regexName.test(selectUserName.value) ? toggleInvalid(selectUserName, true) : toggleInvalid(selectUserName, false);

    // Highlight invalid mail field in red
    !regexEmail.test(selectUserMail.value) ? toggleInvalid(selectUserMail, true) : toggleInvalid(selectUserMail, false);

    // Highlight invalid shirt design dropdown in red
    selectDesignSelect.selectedIndex <= 0 ? toggleInvalid(selectDesignSelect, true) : toggleInvalid(selectDesignSelect, false);

    // Highlight invalid shirt color dropdown in red
    selectColorsSelect.selectedIndex < 0 ? toggleInvalid(selectColorsSelect, true) : toggleInvalid(selectColorsSelect, false)

    // Search all activities
    for (let i = 0; i < selectActivitiesInputs.length; i++) {
        // If activity checked, increment checkCount by 1
        if (selectActivitiesInputs[i].checked) {
            checkCount++;
        }
    }

    // Highlight activities field in red if no activities checked
    !checkCount ? toggleInvalidText(selectActivitiesLegend, true) : toggleInvalidText(selectActivitiesLegend, false);

    // If payment type not selected
    !selectPaymentSelect.selectedIndex ? toggleInvalidText(selectPaymentSelect.previousElementSibling, true) :
        toggleInvalidText(selectPaymentSelect.previousElementSibling, false);

    // Credit card patterns are all numeric characters
    const regexCreditCard = /^\d+$/;

    // (Extra) Parse credit number to only digits

    regexCreditCard.test(selectCreditCardSelect.value) && selectCreditCardSelect.value.length === 12 ? toggleInvalid(selectCreditCardSelect, false) :
        toggleInvalid(selectCreditCardSelect, true);
    // if zip code is not a 5 digit number
    regexCreditCard.test(selectZipCodeSelect.value) && selectZipCodeSelect.value.length === 5 ? toggleInvalid(selectZipCodeSelect, false) :
        toggleInvalid(selectZipCodeSelect, true);
    // if CVV is not a 3 or 4 digit number
    regexCreditCard.test(selectCVVSelect.value) && selectCVVSelect.value.length === 3 || selectCVVSelect.value.length === 4 ? toggleInvalid(selectCVVSelect, false) :
        toggleInvalid(selectCVVSelect, true);
});