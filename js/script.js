//////////
// Init //
//////////

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

// Input elements selector
const selectInputs = document.querySelectorAll('input');

// Activities field selector
const selectActivitiesField = document.querySelector('.activities');

// Activities legend selector
const selectActivitiesLegend = selectActivitiesField.firstElementChild;

// Get all the inputs in selectActiviesField
const selectActivitiesInputs = selectActivitiesField.getElementsByTagName('input');

// Payment dropdown selector
const selectPaymentSelect = document.querySelector('#payment');

// Credit card div selector
const selectCreditCardDiv = document.querySelector('#credit-card');

    // Credit card inputs selector
    const selectPaymentInputs = selectCreditCardDiv.querySelectorAll('.col input');

// PayPal div selectordocument.querySelectorAll('input')
const selectPayPalDiv = document.querySelector('#paypal');
// Bitcoin div selector
const selectBitcoinDiv = document.querySelector('#bitcoin');

// Submit button selector
const selectSubmitButton = document.querySelector('form button');

// 'data-cost' sum in Activities
let cost = 0;

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
    checkPaymentDivs();
});

////////////////////
// Error Checking //
////////////////////

function initializeErrorSpans() {
    // Create error element
    function createErrorElement (element) { //(errorNumber, element) {
        // Create a span element to house the error message
        const span = document.createElement('span');
        // Classify this as an error message for future tracking then hide it
        span.classList.add('error', 'is-hidden');
        // span.classList.add('error');

        // span.textContent = errorMessages[errorNumber];
        // span.textContent = 'test';

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
            // Toggle error message after element
            // (bool) ? toggleHidden(element.nextElementSibling, false) : toggleHidden(element.nextElementSibling, true);
        };

        ////////////
        // Inputs //
        ////////////

        function validateName() {
            // User name textbox selector
            const selectUserName = document.querySelector('#name');

            // Case insensitive name pattern is alphanumerical inputs
            const regex = /[a-z]+/i;
            

            // If field is empty
            if (selectUserName.value === '') {
                // Error span value = $Error
                selectUserName.nextElementSibling.textContent = 'Field cannot be empty.';
                // Show error span
                toggleHidden(selectUserName.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectUserName, true);
            // If field is invalid
            } else if (!regex.test(selectUserName.value)) {
                // toggleInvalid(selectUserName, true);
                // Error span value = $Error
                selectUserName.nextElementSibling.textContent = 'Field must contain at least one alphabet character.';
                // Show error span
                toggleHidden(selectUserName.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectUserName, true);
            // If field is OK
            } else {
                // toggleInvalid(selectUserName, false);
                // Hide error span
                toggleHidden(selectUserName.nextElementSibling, true);
                toggleInvalid(selectUserName,false);
            }
        }

        function validateMail() {
            // User mail textbox selector
            const selectUserMail = document.querySelector('#mail');

            // Case insensitive mail pattern is standard email format
            const regex = /^[^@]+\@[^@.]+\.[a-z]{2,3}$/i;
            
            // If field is empty
            if (selectUserMail.value === '') {
                // Error span value = $Error
                selectUserMail.nextElementSibling.textContent = 'Field cannot be empty.';
                // Show error span
                toggleHidden(selectUserMail.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectUserMail, true);
            // If field is invalid
            } else if (!regex.test(selectUserMail.value)) {
                // toggleInvalid(selectUserName, true);
                // Error span value = $Error
                selectUserMail.nextElementSibling.textContent = 'Valid email addresses contains an "@" and a "." with a 2-3 letter suffix.';
                // Show error span
                toggleHidden(selectUserMail.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectUserMail, true);
            // If field is OK
            } else {
                // toggleInvalid(selectUserName, false);
                // Hide error span
                toggleHidden(selectUserMail.nextElementSibling, true);
                toggleInvalid(selectUserMail,false);
            }
        }

        function validateOtherTitle() {
            // Case insensitive name pattern is alphanumerical inputs
            const regex = /[a-z]+/i;

            // If field is empty
            if (!selectOtherTitle.classList.contains('is-hidden') && selectOtherTitle.value === '') {
                // Error span value = $Error
                selectOtherTitle.nextElementSibling.textContent = 'Field cannot be empty.';
                // Show error span
                toggleHidden(selectOtherTitle.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectOtherTitle, true);
            // If field is invalid
            } else if (!selectOtherTitle.classList.contains('is-hidden') && !regex.test(selectOtherTitle.value)) {
                // toggleInvalid(selectUserName, true);
                // Error span value = $Error
                selectOtherTitle.nextElementSibling.textContent = 'Field must contain at least one alphabet character.';
                // Show error span
                toggleHidden(selectOtherTitle.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectOtherTitle, true);
            // If field is OK
            } else {
                // toggleInvalid(selectUserName, false);
                // Hide error span
                toggleHidden(selectOtherTitle.nextElementSibling, true);
                toggleInvalid(selectOtherTitle,false);
            }
        }
        
        function validateShirtDesign() {
            // If field is invalid
            if (!selectDesignSelect.selectedIndex) {
                // Error span value = $Error
                selectDesignSelect.nextElementSibling.textContent = 'Must select a Shirt Design.';
                // Show error span
                toggleHidden(selectDesignSelect.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectDesignSelect, true);
            // If field is OK
            } else {
                // toggleInvalid(selectUserName, false);
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
                // Error span value = $Error
                selectActivitiesLegend.nextElementSibling.textContent = 'At least one activity must be checked.';
                // Show error span
                toggleHidden(selectActivitiesLegend.nextElementSibling, false);
                // Highlight field
                toggleInvalid(selectActivitiesLegend, true);
            // If field is OK
            } else {
                // toggleInvalid(selectUserName, false);
                // Hide error span
                toggleHidden(selectActivitiesLegend.nextElementSibling, true);
                toggleInvalid(selectActivitiesLegend,false);
            }
        }

        
        function validateCreditCard() {
            if (selectPaymentSelect.value === 'credit card') {
                // Credit card number input selector
                const selectCCInput = selectCreditCardDiv.querySelector('#cc-num');
                // Zip input selector
                const regex = /^\d+$/;
                // const regexLength = /^\d{13,15}$/;

                // If field is empty
                if (selectCCInput.value === '') {
                    console.log('test1');
                    // Error span value = $Error
                    selectCCInput.nextElementSibling.textContent = 'Field cannot be empty.';
                    // Show error span
                    toggleHidden(selectCCInput.nextElementSibling, false);
                    // Highlight field
                    toggleInvalid(selectCCInput, true);
                // If field is invalid
                } else if (regex.test(selectCCInput.value) && selectCCInput.value.length >= 13 && selectCCInput.value.length <= 16) {
                    console.log('test2');
                    // toggleInvalid(selectUserName, true);
                    // Error span value = $Error
                    selectCCInput.nextElementSibling.textContent = 'Credit Card numbers must contain 13 through 16 digits.';
                    // Show error span
                    toggleHidden(selectCCInput.nextElementSibling, false);
                    // Highlight field
                    toggleInvalid(selectCCInput, true);
                // If field is OK
                } else {
                    console.log('test3');
                    // toggleInvalid(selectUserName, false);
                    // Hide error span
                    toggleHidden(selectCCInput.nextElementSibling, true);
                    toggleInvalid(selectCCInput,false);
                }
            }
        }
            
        function validateZipCode() {
            if (selectPaymentSelect.value === 'credit card') {
                // Zip input selector
                const selectZipInput = selectCreditCardDiv.querySelector('#zip');
                // Credit card patterns are all numeric characters
                const regex = /^\d+$/;

                // If field is empty
                if (selectZipInput.value === '') {
                    // Error span value = $Error
                    selectZipInput.nextElementSibling.textContent = 'Field cannot be empty.';
                    // Show error span
                    toggleHidden(selectZipInput.nextElementSibling, false);
                    // Highlight field
                    toggleInvalid(selectZipInput, true);
                // If field is invalid
                } else if (regex.test(selectZipInput.value) && selectZipInput.value.length === 5) {
                    // toggleInvalid(selectUserName, true);
                    // Error span value = $Error
                    selectZipInput.nextElementSibling.textContent = 'Zip code must be 5-digits.';
                    // Show error span
                    toggleHidden(selectZipInput.nextElementSibling, false);
                    // Highlight field
                    toggleInvalid(selectZipInput, true);
                // If field is OK
                } else {
                    // toggleInvalid(selectUserName, false);
                    // Hide error span
                    toggleHidden(selectZipInput.nextElementSibling, true);
                    toggleInvalid(selectZipInput,false);
                }
            }
        }

        function validateCVV() {
            if (selectPaymentSelect.value === 'credit card') {
                // CVV input selector
                const selectCVVInput = selectCreditCardDiv.querySelector('#cvv');
                // Credit card patterns are all numeric characters
                const regex = /^\d+$/;

                // If field is empty
                if (selectCVVInput.value === '') {
                    // Error span value = $Error
                    selectCVVInput.nextElementSibling.textContent = 'Field cannot be empty.';
                    // Show error span
                    toggleHidden(selectCVVInput.nextElementSibling, false);
                    // Highlight field
                    toggleInvalid(selectCVVInput, true);
                // If field is invalid
                } else if (selectCVVInput.test(selectCVVInput.value) && selectCVVInput.value.length === 3) {
                    // toggleInvalid(selectUserName, true);
                    // Error span value = $Error
                    selectCVVInput.nextElementSibling.textContent = 'CVV must contain 3 digits.';
                    // Show error span
                    toggleHidden(selectCVVInput.nextElementSibling, false);
                    // Highlight field
                    toggleInvalid(selectCVVInput, true);
                // If field is OK
                } else {
                    // toggleInvalid(selectUserName, false);
                    // Hide error span
                    toggleHidden(selectCVVInput.nextElementSibling, true);
                    toggleInvalid(selectCVVInput,false);
                }
            }
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

// Error check on blur
for (let i = 0; i < selectPaymentInputs.length; i++) {
    selectPaymentInputs[i].addEventListener('blur', (e) => {
        // // If a credit card field, parse numbers
        // if (e.target.id === 'cc-num' || e.target.id === 'zip' || e.target.id === 'cvv') {
        //     e.target.value = parseNumbers(e.target.value);
        // }

        checkErrors();
    })
}

// Error check upon user releasing a key on an input
for (let i = 0; i < selectInputs.length; i++) {
    // Error checking on keyUp
    selectInputs[i].addEventListener('keyup', (e) => {
        // // If a credit card field, parse numbers
        // if (e.target.id === 'cc-num' || e.target.id === 'zip' || e.target.id === 'cvv') {
        //     e.target.value = parseNumbers(e.target.value);
        // }

        checkErrors();
    });
}

// Error check on clicking the submit button
selectSubmitButton.addEventListener('click', (e) => {
    // Toggle the show errors checker so errors begin checking in real-time
    isShowingErrors = true;

    // // If a credit card field, parse numbers
    // if (e.target.id === 'cc-num' || e.target.id === 'zip' || e.target.id === 'cvv') {
    //     e.target.value = parseNumbers(e.target.value);
    // }

    // Prevent default on errors
    if (checkErrors()) {
        console.log('errors');
        e.preventDefault();
    } else { 
        console.log('no errors');
    }
});

/////////////
// Runtime //
/////////////

// A predetermined starting state for the form on-load

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
checkPaymentDivs();

// Preemptively create hidden error messages
initializeErrorSpans();