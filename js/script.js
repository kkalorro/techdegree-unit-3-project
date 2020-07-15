//////////
// Init //
//////////

// Input elements selector
const selectInputs = document.querySelectorAll('input');

// Other job title textbox selector
const selectOtherTitle = document.querySelector('#other-title');

// Design dropdown selector
const selectDesignSelect = document.querySelector('#design');
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
// The sum of 'data-cost' in each checked activity input
let cost = 0;

// Payment dropdown selector
const selectPaymentSelect = document.querySelector('#payment');
// Credit card div selector
const selectCreditCardDiv = document.querySelector('#credit-card');
// PayPal div selectordocument.querySelectorAll('input')
const selectPayPalDiv = document.querySelector('#paypal');
// Bitcoin div selector
const selectBitcoinDiv = document.querySelector('#bitcoin');

// Tracks when to show errors and toggles to true when the submit button is pressed for the first time
let isShowingErrors = false;

////////////////////
// Base Functions //
////////////////////

// Add or remove class to hide element
toggleHidden = (element, bool) => { bool ? element.classList.add('is-hidden') : element.classList.remove('is-hidden'); };

//////////////////////////
// Other Role Functions //
//////////////////////////

// Job title dropdown selector
const selectTitle = document.querySelector('#title');

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

/////////////////////
// Shirt Functions //
/////////////////////

// Set classes for shirts on first time load
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

// Hide shirt color options and show dropdown requirements
function resetShirtOptions() {
    // Remove all shirt options from select dropdown
    for (let i = 0; i < selectColorsOptions.length; i++) {
        toggleHidden(selectColorsOptions[i], true);
    }
}

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

////////////////
// Activities //
////////////////

// Create a cost textbox
function initializeCost() {
    const costDiv = document.createElement('div');
    costDiv.innerHTML = '<b>Total:</b> <span id="cost"></span>';
    selectActivitiesField.appendChild(costDiv);
    toggleHidden(selectActivitiesField.lastElementChild, true);
}

// Activities cost updater and schedule conflict checker
selectActivitiesField.addEventListener('change', (e) => {

    // Cost span selector
    const selectCost = selectActivitiesField.lastElementChild;

    // Current target
    const targ = e.target;
    const checked = targ.checked;
    const price = targ.getAttribute('data-cost');
    const timestamp = targ.getAttribute('data-day-and-time');

    // If current target is checked
    if (checked) {
        // Update cost
        cost += parseInt(price);
        // Check all other inputs for matching 'data-day-and-time'
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
        // Check all other inputs for matching 'data-day-and-time'
        for (let i = 0; i < selectActivitiesInputs.length; i++) {
            if (timestamp === selectActivitiesInputs[i].getAttribute('data-day-and-time') && targ.name != selectActivitiesInputs[i].name) {
                // Enable and classify matches
                selectActivitiesInputs[i].disabled = false;
                selectActivitiesInputs[i].parentElement.classList.remove('disabled');
            }
        }
    }

    // Parse into $ format
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

/////////////
// Payment //
/////////////

// Hide all payment fields
function resetPaymentDivs() {
    toggleHidden(selectCreditCardDiv, true);
    toggleHidden(selectPayPalDiv, true);
    toggleHidden(selectBitcoinDiv, true);
}

// Loads payment div for selected option
function showPaymentDiv() {
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
            showDiv(selectCreditCardDiv);
            break;
        // paypal
        case 'paypal':
            showDiv(selectPayPalDiv);
            break;
        // bitcoin
        case 'bitcoin':
            showDiv(selectBitcoinDiv);
            break;
    }
}

selectPaymentSelect.addEventListener('change', (e) => {
    showPaymentDiv();
});

////////////////////
// Error Checking //
////////////////////

function initializeErrorSpans() {
    // Create error element
    function createErrorElement (element) {
        // Create a span element to house the error message
        const span = document.createElement('span');
        // Classify this as an error message for future tracking then hide it
        span.classList.add('error', 'is-hidden');
        // Insert error span after target element
        element.parentElement.insertBefore(span, element.nextElementSibling);
    }

    // Create error spans for non-checkbox inputs
    for (let i = 0; i < selectInputs.length; i++) {
        if (selectInputs[i].getAttribute('type') != 'checkbox') {
            // Place error message after input
            createErrorElement(selectInputs[i]);
        }
    }

    // Create error span for shirt design dropdown
    createErrorElement(selectDesignSelect);

    // Create error span message for activities
    createErrorElement(selectActivitiesLegend);
}
   
function parseNumbers(str) {
    // Regex pattern for numbers
    const regex = /(\d*)/g;

    // Regex matches from original string
    const matchStr = str.match(regex)
    
    // Finished string
    let parsedStr = '';

    // Reassemble match into a single string
    for (let i = 0; i < matchStr.length; i++) {
        parsedStr += matchStr[i];
    }
    return parsedStr;
}

function checkErrors() {
    // Check for errors only if isShowingErrors is toggled
    if (isShowingErrors) {

        // Error counter
        let errors = 0;

        // Invalid entry helper function
        function toggleInvalid(element, bool) {
            // In the specific case of the activities legend
            if (element.tagName === 'LEGEND') {
                // Toggle error message after legend
                (bool) ? toggleHidden(element.nextElementSibling, false) : toggleHidden(element.nextElementSibling, true);
                // Apply red text to preceeding element and increment error count
                toggleInvalidText(element, bool);
            } else {
                // Apply red border on element for non checkboxes
                toggleInvalidBorder(element, bool);
                // Apply red text to preceeding element and increment error count
                toggleInvalidText(element.previousElementSibling, bool);
            }
            
            // Increment error count
            if (bool) {
                errors += 1;
            }
        }

        // Add or remove class to make element's text red
        function toggleInvalidText (element, bool) { 
            // Toggle invalid class
            bool ? element.classList.add('is-invalid-text') : element.classList.remove('is-invalid-text');
        };

        // Add or remove class to make element's border red
        function toggleInvalidBorder (element, bool) {
            // Toggle invalid class
            bool ? element.classList.add('is-invalid-border') : element.classList.remove('is-invalid-border');
        };

        ////////////
        // Inputs //
        ////////////

        // Check an element to ensure it contains specfic value and length and pass provided error message
        function validateTextInput(element, regexValueReq, errorMsg) {
            // Field is valid if element contents is a specific value and length
            if (regexValueReq.test(element.value)) {
                // Hide error span
                toggleHidden(element.nextElementSibling, true);
                // Hide red highlight
                toggleInvalid(element, false);
            // If field is blank
            } else if (element.value === '') {
                // Update error message stating element contents is empty
                element.nextElementSibling.textContent = 'Field cannot be empty.';
                // Show error span
                toggleHidden(element.nextElementSibling, false);
                // Highlight field in red
                toggleInvalid(element, true);
            } else {
                // Update error message to provided error string
                element.nextElementSibling.textContent = errorMsg;
                // Hide error span
                toggleHidden(element.nextElementSibling, false);
                // Highlight field in red
                toggleInvalid(element, true);
            }
        }

        // Check an element to ensure it contains specfic value and length and pass provided error message
        function validatePaymentField(element, regexValueReq, regexLengthReq, errorMsg) {
            if (selectPaymentSelect.value === 'credit card') {
                validateTextInput(element, regexValueReq && regexLengthReq, errorMsg);
            }
        }

        function validateName() {
            // User name textbox selector
            const selectUserName = document.querySelector('#name');
            // Case insensitive name pattern is alphanumerical inputs
            const regex = /[a-z]+/i;

            validateTextInput(selectUserName, regex, 'Field must contain at least one alphabet character.');
        }

        function validateMail() {
            // User mail textbox selector
            const selectUserMail = document.querySelector('#mail');
            // Case insensitive mail pattern is standard email format
            const regex = /^[^@]+\@[^@.]+\.[a-z]{2,3}$/i;

            validateTextInput(selectUserMail, regex, 'Valid email addresses contains an "@" and a "." with a 2-3 letter suffix.');
        }

        function validateOtherTitle() {
            // Case insensitive name pattern is alphanumerical inputs
            const regex = /[a-z]+/i;

            // Field is valid if element contents is a specific value and length
            if (regex.test(selectOtherTitle.value)) {
                // Hide error span
                toggleHidden(selectOtherTitle.nextElementSibling, true);
                // Hide red highlight
                toggleInvalid(selectOtherTitle,false);
            // If field is blank
            } else if (!selectOtherTitle.classList.contains('is-hidden') && selectOtherTitle.value === '') {
                // Update error message stating element contents is empty
                selectOtherTitle.nextElementSibling.textContent = 'Field cannot be empty.';
                // Show error span
                toggleHidden(selectOtherTitle.nextElementSibling, false);
                // Highlight field in red
                toggleInvalid(selectOtherTitle, true);
            } else if (!selectOtherTitle.classList.contains('is-hidden')) {
                // Update error message to provided error string
                selectOtherTitle.nextElementSibling.textContent = 'Field must contain at least one alphabet character.';
                // Hide error span
                toggleHidden(selectOtherTitle.nextElementSibling, false);
                // Highlight field in red
                toggleInvalid(selectOtherTitle, true);
            }
        }
        
        function validateShirtDesign() {
            // If field is invalid
            if (!selectDesignSelect.selectedIndex) {
                // Update error message
                selectDesignSelect.nextElementSibling.textContent = 'Must select a Shirt Design.';
                // Show error span
                toggleHidden(selectDesignSelect.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectDesignSelect, true);
            // If field is OK
            } else {
                // Hide error span
                toggleHidden(selectDesignSelect.nextElementSibling, true);
                toggleInvalid(selectDesignSelect,false);
            }
        }               

        function validateActivities() {
            // Activities checked counter
            let checkCount = 0;

            // Count checked activity inputs
            for (let i = 0; i < selectActivitiesInputs.length; i++) {

                // If activity input checked, increment checkCount by 1
                if (selectActivitiesInputs[i].checked) {
                    checkCount++;
                }
            }

            // If field is invalid
            if (!checkCount) {
                // Update error message
                selectActivitiesLegend.nextElementSibling.textContent = 'At least one activity must be checked.';
                // Show error span
                toggleHidden(selectActivitiesLegend.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectActivitiesLegend, true);
            // If field is OK
            } else {
                // Hide error span
                toggleHidden(selectActivitiesLegend.nextElementSibling, true);
                toggleInvalid(selectActivitiesLegend,false);
            }
        }

        // Validate Credit Card field
        function validateCreditCard() {
            // Credit card number input selector
            const selectCCInput = selectCreditCardDiv.querySelector('#cc-num');
            // Credit card number value requirement is 13 to 16 digits
            const regex = /^\d{13,16}$/;
            // Check for errors and provide appropriate results
            validateTextInput(selectCCInput, regex, 'Credit Card numbers must contain 13 through 16 digits.');

        }
        
        // Validate Zip Code field
        function validateZipCode() {
            // Zip input selector
            const selectZipInput = selectCreditCardDiv.querySelector('#zip');
            // Zip code value requirement is 5 digits
            const regex = /^\d{5}$/;
            // Check for errors and provide appropriate results
            validateTextInput(selectZipInput, regex, 'Zip code must be 5-digits.');
        }

        // Validate CVV field
        function validateCVV() {
            // CVV input selector
            const selectCVVInput = selectCreditCardDiv.querySelector('#cvv');
            // CVV value requirement in regex
            const regex = /^\d{3}$/;
            // Check for errors and provide appropriate results
            validateTextInput(selectCVVInput, regex, 'CVV must contain 3 digits.');
        }
        
        validateName();
        validateMail();
        validateOtherTitle();
        validateShirtDesign();
        validateActivities();
        validateCreditCard();
        validateZipCode();
        validateCVV();

        return (errors) ? true : false; 
    }
}

// Credit card inputs selector
const selectPaymentInputs = selectCreditCardDiv.querySelectorAll('.col input');

// Actions to do when removing focus from a payment element
for (let i = 0; i < selectPaymentInputs.length; i++) {
    selectPaymentInputs[i].addEventListener('blur', (e) => {
        // If a credit card field, remove unnecessary characters
        if (e.target.id === 'cc-num' || e.target.id === 'zip' || e.target.id === 'cvv') {
            e.target.value = parseNumbers(e.target.value);
        }

        checkErrors();
    })
}

// Actions to do after a key is pushed when input element is selected
for (let i = 0; i < selectInputs.length; i++) {
    // Error checking on keyUp
    selectInputs[i].addEventListener('keyup', (e) => {
        // If a credit card field, remove unnecessary characters
        if (e.target.id === 'cc-num' || e.target.id === 'zip' || e.target.id === 'cvv') {
            e.target.value = parseNumbers(e.target.value);
        }

        checkErrors();
    });
}

// Submit button selector
const selectSubmitButton = document.querySelector('form button');

// Actions to do when the submit button is clicked
selectSubmitButton.addEventListener('click', (e) => {
    // Allow errors to start showing on the form
    isShowingErrors = true;

    // If a credit card field, remove unnecessary characters
    if (e.target.id === 'cc-num' || e.target.id === 'zip' || e.target.id === 'cvv') {
        e.target.value = parseNumbers(e.target.value);
    }

    // Prevent default on errors
    if (checkErrors()) {
        e.preventDefault();
    }
});

/////////////
// Runtime //
/////////////

// Focus on the first input box by default
document.querySelector('input').focus();

// Hide other title textbox
toggleHidden(selectOtherTitle, true);

// Categorize shirt options with class names for easier sorting
initializeShirts();

// Hide first descriptive option in shirt design dropdown
toggleHidden(selectDesignSelect.firstElementChild, true);

// Hide shirt colors dropdown
toggleHidden(selectColorsLabel, true);
toggleHidden(selectColorsSelect, true);

// Create activity cost span
initializeCost(); 

// Hide first option in payment dropdown
toggleHidden(selectPaymentSelect.firstElementChild, true);

// Select credit card option from start
selectPaymentSelect.value = 'credit card';

// Check which payment divs to show
showPaymentDiv();

// Preemptively create hidden error messages
initializeErrorSpans();