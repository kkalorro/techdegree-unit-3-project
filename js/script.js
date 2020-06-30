//////////
// Init //
//////////

// User name textbox selector
const selectUserName = document.querySelector('#name');
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

// Payment dropdown selector
const selectPayment = document.querySelector('#payment');

// Credit card div selector
const selectCreditCard = document.querySelector('#credit-card');
// PayPal div selector
const selectPayPal = document.querySelector('#paypal');
// Bitcoin div selector
const selectBitcoin = document.querySelector('#bitcoin');


// 'data-cost' sum in Activities
let cost = 0;

///////////////
// Functions //
///////////////

// Element visibility toggler
function toggleHidden(element, bool) {
    if (bool === true) {
        element.classList.add('is-hidden');
    } else {
        element.classList.remove('is-hidden');
    }
}

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

    // Remove first option in payment dropdown
    toggleHidden(selectPayment.firstElementChild, true);

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

    // Get all the inputs in selectActiviesField
    const inputs = selectActivitiesField.getElementsByTagName('input');

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
        for (let i = 0; i < inputs.length; i++) {
            if (timestamp === inputs[i].getAttribute('data-day-and-time') && targ.name != inputs[i].name) {
                // disable and classify matches
                inputs[i].disabled = true;
                inputs[i].parentElement.classList.add('disabled');
            }
        }
    } else {
        // Update cost
        cost -= parseInt(price);
        // check all other inputs for matching 'data-day-and-time'
        for (let i = 0; i < inputs.length; i++) {
            if (timestamp === inputs[i].getAttribute('data-day-and-time') && targ.name != inputs[i].name) {
                // enable and classify matches
                inputs[i].disabled = false;
                inputs[i].parentElement.classList.remove('disabled');
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



selectPayment.addEventListener('change', (e) => {
    // remove first entry
    toggleHidden(selectPayment.firstElementChild, true);

    // if id:payment value =
    switch (selectPayment.value) {
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