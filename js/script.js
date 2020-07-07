///////////
// Goals //
///////////
// X. Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
// X. Program at least one of your error messages so that more information is provided depending on the error.
    // For example, if the user hasn’t entered a credit card number and the field is completely blank, the error message reads
    // “Please enter a credit card number.” If the field isn’t empty but contains only 10 numbers, the error message reads 
    // “Please enter a number that is between 13 and 16 digits long.” 
// 3. Program your form so that it provides a real-time validation error message for at least one text input field. Rather than
    // providing an error message on submit, your form should check for errors and display messages as the user begins typing inside
    // a text field. For example, if the user enters an invalid email address, the error appears as the user begins to type, and
    // disappears as soon as the user has entered a complete and correctly formatted email address. You must accomplish this with your
    // own JavaScript code. Do not rely on HTML5's built-in email validation.
    //
    // NOTE: If you implement the above exceeds requirements in your form, make sure you detail in your submission notes which input
    // will have different error messages depending on the error, and which input will have "real time" validation messages, so your
    // reviewer won't miss them by accident. 


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
const selectOtherTitle = document.querySelector('#other-title');

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

// Activities legend selector
const selectActivitiesLegend = selectActivitiesField.firstElementChild;

// Get all the inputs in selectActiviesField
const selectActivitiesInputs = selectActivitiesField.getElementsByTagName('input');

// Payment dropdown selector
const selectPaymentSelect = document.querySelector('#payment');

// Credit card div selector
const selectCreditCard = document.querySelector('#credit-card');
// PayPal div selectordocument.querySelectorAll('input')
const selectPayPal = document.querySelector('#paypal');
// Bitcoin div selector
const selectBitcoin = document.querySelector('#bitcoin');

// Submit button selector
const selectSubmitButton = document.querySelector('form button');

// Input elements selector
const selectInputs = document.querySelectorAll('input');

// 'data-cost' sum in Activities
let cost = 0;

////////////////////
// Base Functions //
////////////////////

// Add or remove class to hide element
toggleHidden = (element, bool) => { bool ? element.classList.add('is-hidden') : element.classList.remove('is-hidden'); };

// Add or remove class to make element's text red
toggleInvalidText = (element, bool) => { 
    bool ? element.classList.add('is-invalid-text') : element.classList.remove('is-invalid-text');
    // Toggle error message after legend elements
    if (element.tagName === 'LEGEND') {
        (bool) ? toggleHidden(element.nextElementSibling, false) : toggleHidden(element.nextElementSibling, true);
    }
    
};

// Add or remove class to make element's border red
toggleInvalidBorder = (element, bool) => {
    bool ? element.classList.add('is-invalid-border') : element.classList.remove('is-invalid-border');
    // Toggle error message after element
    (bool) ? toggleHidden(element.nextElementSibling, false) : toggleHidden(element.nextElementSibling, true);
};

////////////////////////////////
// One-time Startup Functions //
////////////////////////////////

function initializeErrorMessages() {

    // Container for error message
    errorMessages = [
        // Index 0: name input error
        'Input at least 1 alphabet character.',
        // Index 1: mail input error
        'Valid email addresses contains an "@" and a "."',
        // Index 2: shirt design error
        'Must select a Shirt Design.',
        // Index 3: activities error
        'At least one Activity must be selected.',
        // Index 4: credit card error
        'Credit Card numbers must contain 13 through 16 digits.',
        // Index 5: zip code error
        'Zip code must be 5-digits.',
        // Index 6: cvv error
        'CVV must contain 3 or 4 digits.'
    ];

    // Create error element
    function createErrorElement(errorNumber, element) {
        // Create a span element to house the error message
        const span = document.createElement('span');
        span.classList.add('error', 'is-hidden');
        span.textContent = errorMessages[errorNumber];

        // Insert error element after target element
        element.parentElement.insertBefore(span, element.nextElementSibling);
    }

    // Error messages for inputs
    for (let i = 0; i < selectInputs.length; i++) {
        // Create error message for non-checkbox inputs
        if (selectInputs[i].getAttribute('type') != 'checkbox') {
            let errorNumber;
            
            // Assign error message based on element's id
            switch (selectInputs[i].id) {
                case 'name':
                    errorNumber = 0;
                    break;
                case 'mail':
                    errorNumber = 1;
                    break;
                case 'other-title':
                    errorNumber = 0;
                    break;
                case 'cc-num':
                    errorNumber = 4;
                    break;
                case 'zip':
                    errorNumber = 5;
                    break;
                case 'cvv':
                    errorNumber = 6;
                    break;
            }

            // Place error message after input
            createErrorElement(errorNumber, selectInputs[i]);
        }
    }

    // Create error message for shirt design when no selection is chosen
    if (selectDesignSelect) {
        createErrorElement(2, selectDesignSelect);
    }

    // Create error message for activities when no boxes are checked
    if (selectActivitiesLegend) {
        createErrorElement(3, selectActivitiesLegend);
    }
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
}

//////////////////////////////////
// Repeating Start-up Functions //
//////////////////////////////////

// Hide shirt color options and show dropdown requirements
function resetShirtOptions() {

    // Remove all shirt options from select dropdown
    for (let i = 0; i < selectColorsOptions.length; i++) {
        toggleHidden(selectColorsOptions[i], true);
    }

    // This helps with the appearance for Firefox browsers, but has undesirable affects on Chrome
    // selectColorsSelect.style.width = '100%';

}

// Hide all payment fields
function resetPaymentDivs() {
    toggleHidden(selectCreditCard, true);
    toggleHidden(selectPayPal, true);
    toggleHidden(selectBitcoin, true);
}

/////////////
// Runtime //
/////////////

// Focus on the first input box by default
document.querySelector('input').focus();

// Preemptively create hidden error messages
initializeErrorMessages();

// Hide other title textbox
toggleHidden(selectOtherTitle, true);

// Categorize shirt options with class names for easier sorting
initializeShirts();

// Hide first descriptive option in shirt design dropdown
toggleHidden(selectDesignSelect.firstElementChild, true);

// Hide shirt colors dropdown
toggleHidden(selectColorsLabel, true);
toggleHidden(selectColorsSelect, true);

// Hide first option in payment dropdown
toggleHidden(selectPaymentSelect.firstElementChild, true);

// Select credit card option from start
selectPaymentSelect.value = 'credit card';

// Check which payment divs to show
checkPaymentDivs();

///////////////
// Listeners //
///////////////

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

    // Display parsed cost in $#.## format
    selectCost.textContent = costParsed.replace(regex, replacement);

    // Update error checker
    checkErrors();
});

// Open the other title textbox when dropdown is set to other
selectTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        toggleHidden(selectOtherTitle, false);
    } else {
        toggleHidden(selectOtherTitle, true);
    }

    // Update error checker
    checkErrors();
});

// Shirt color options change based on design choice
selectDesignSelect.addEventListener('change', (e) => {

    // Show colors label and dropdown
    if (selectColorsLabel.classList.contains('is-hidden') && selectColorsSelect.classList.contains('is-hidden')) {
        toggleHidden(selectColorsLabel, false);
        toggleHidden(selectColorsSelect, false);
    }

    // Hide all shirt options
    resetShirtOptions();

    // Track the first visible option
    let firstOption = null;

    // Search through all the options
    for (let i = 0; i < selectColorsOptions.length; i++) {
        // If a pun option
        if (e.target.value === 'js puns' && selectColorsOptions[i].classList.contains('pun')) {
            // Save the first option's value
            if (!firstOption) {
                firstOption = selectColorsOptions[i].value;
            }

            // Make current option visable
            toggleHidden(selectColorsOptions[i], false);
        // If a heart option
        } else if (e.target.value === 'heart js' && selectColorsOptions[i].classList.contains('heart')) {
            // Save the first option's value
            if (!firstOption) {
                firstOption = selectColorsOptions[i].value;
            }
            
            // Make current option visable
            toggleHidden(selectColorsOptions[i], false);
        }
    }

    // Choose the first shirt color option by default
    selectColorsSelect.value = firstOption;

    // Update error check
    checkErrors();
});

/////////////
// Payment //
/////////////

// Loads payment div for selected option
function checkPaymentDivs() {
    function showDiv(div) {
        // First hide all payment divs
        resetPaymentDivs();
        // Show chosen div
        toggleHidden(div, false);   
    }

    // Show corresponding div based on payment dropdown selection
    switch (selectPaymentSelect.value) {
        // credit card
        case 'credit card':
            showDiv(selectCreditCard);
            break;
        // paypal
        case 'paypal':
            showDiv(selectPayPal);
            break;
        // bitcoin
        case 'bitcoin':
            showDiv(selectBitcoin);
            break;
    }
}

selectPaymentSelect.addEventListener('change', (e) => {
    checkPaymentDivs();
});

////////////////////
// Error Checking //
////////////////////

function checkErrors() {

    // Credit card input selector
    const selectCreditCardSelect = selectCreditCard.querySelector('#cc-num');
    // Zip code input selector
    const selectZipCodeSelect = selectCreditCard.querySelector('#zip');
    // CVV input selector
    const selectCVVSelect = selectCreditCard.querySelector('#cvv');
    // Case insensitive name pattern is alphanumerical inputs
    const regexName = /[a-z]+/i;

    // Case insensitive mail pattern is standard email format
    const regexEmail = /^[^@]+\@[^@.]+\.[a-z]+$/i;

    // Credit card patterns are all numeric characters
    const regexCreditCard = /^\d+$/;

    // Activities checked counter
    let checkCount = 0;

    // Invalid entry helper function
    function toggleInvalid(element, bool) {
        // Apply red border on element
        toggleInvalidBorder(element, bool);
        // Apply red text to preceeding element
        toggleInvalidText(element.previousElementSibling, bool);
    }

    // Highlight invalid name field in red
    (!regexName.test(selectUserName.value)) ? toggleInvalid(selectUserName, true) : toggleInvalid(selectUserName, false);

    // Highlight invalid mail field in red
    (!regexEmail.test(selectUserMail.value)) ? toggleInvalid(selectUserMail, true) : toggleInvalid(selectUserMail, false);

    // Highlight invalid other job role field in red
    (!selectOtherTitle.classList.contains('is-hidden') && !regexName.test(selectOtherTitle.value)) ?
        toggleInvalid(selectOtherTitle, true) : toggleInvalid(selectOtherTitle, false);

    // Highlight invalid shirt design dropdown in red
    (!selectDesignSelect.selectedIndex) ? toggleInvalid(selectDesignSelect, true) : toggleInvalid(selectDesignSelect, false);

    // Count checked activity inputs
    for (let i = 0; i < selectActivitiesInputs.length; i++) {

        // If activity input checked, increment checkCount by 1
        if (selectActivitiesInputs[i].checked) {
            checkCount++;
        }
    }

    // Highlight activities field in red if no activities checked
    (!checkCount) ? toggleInvalidText(selectActivitiesLegend, true) : toggleInvalidText(selectActivitiesLegend, false);

    // If payment type not selected
    (!selectPaymentSelect.selectedIndex) ? toggleInvalidText(selectPaymentSelect.previousElementSibling, true) :
        toggleInvalidText(selectPaymentSelect.previousElementSibling, false);


    // (Extra) Parse credit number to only digits

    // Highlight credit card number field in red if not 13 to 16 digits
    (regexCreditCard.test(selectCreditCardSelect.value) && selectCreditCardSelect.value.length >= 13 && selectCreditCardSelect.value.length <= 16) ?
        toggleInvalid(selectCreditCardSelect, false) : toggleInvalid(selectCreditCardSelect, true);
    // Highlight zip code field in red if not 5 digits
    (regexCreditCard.test(selectZipCodeSelect.value) && selectZipCodeSelect.value.length === 5) ? toggleInvalid(selectZipCodeSelect, false) :
        toggleInvalid(selectZipCodeSelect, true);
    // Highlight cvv field if not 3 or 4 digit number
    (regexCreditCard.test(selectCVVSelect.value) && selectCVVSelect.value.length >= 3 && selectCVVSelect.value.length <= 4) ? toggleInvalid(selectCVVSelect, false) :
        toggleInvalid(selectCVVSelect, true);
}

// If focus is on an input
for (let i = 0; i < selectInputs.length; i++) {
    // Error checking on keyUp
    selectInputs[i].addEventListener('keyup', (e) => {
        checkErrors();
    });
}

// Error checking on submit button
selectSubmitButton.addEventListener('click', (e) => {
    // Remove default submit button behavior
    e.preventDefault();

    checkErrors();
});