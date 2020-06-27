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

// Credit card div selector
const selectCreditCard = document.querySelector('#credit-card');
// PayPal div selector
const selectPayPal = document.querySelector('#paypal');
// Bitcoin div selector
const selectBitcoin = document.querySelector('#bitcoin');

///////////////
// Functions //
///////////////

// Element visibility toggler
function toggleVisibility(element, bool) {
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
function resetShirtOptions () {

    // Remove first child of shirt design dropdown
    selectDesignSelect.firstElementChild.classList.add('is-hidden');

    // Remove all shirt options from select dropdown
    for (let i = 0; i < selectColorsOptions.length; i++) {
        toggleVisibility(selectColorsOptions[i], true);
    }

        // Remove label header
        selectColorsSelect.value = null;

        // This helps with the appearance for Firefox browsers, but has undesirable affects on Chrome
        // selectColorsSelect.style.width = '100%';

}


function initializePage() {
    // Focus on the first input box
    document.querySelector('input').focus();

    // Initial classes for shirts
    initializeShirts();

    // Create other title textbox then hide it until needed
    initializeOtherJob();
    toggleVisibility(selectOtherTitle, true);

    // Initial settings for shirt
    resetShirtOptions();

    // Add shirt theme requirement
    // selectColorsSelect.querySelector('#no-design').hidden = false;

    // Hide payment info divs
    toggleVisibility(selectCreditCard, true);
    toggleVisibility(selectPayPal, true);
    toggleVisibility(selectBitcoin, true);
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
        toggleVisibility(selectOtherTitle, false);
    } else {
        toggleVisibility(selectOtherTitle, true);
    }
});

// Shirt color options change based on design choice
selectDesignSelect.addEventListener('change', (e) => {
    // Variable for target's value
    const val = e.target.value;

    // Hide the initial design option
    selectDesignSelect.firstElementChild.hidden = true;

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
            toggleVisibility(selectColorsOptions[i], false);
        // If a heart option
        } else if (val === 'heart js' && selectColorsOptions[i].classList.contains('heart')) {
            // Save the first option's value
            if (firstOption === null) {
                firstOption = selectColorsOptions[i].value;
            }
            // Make current option visable
            toggleVisibility(selectColorsOptions[i], false);
        }
    }

    selectColorsSelect.value = firstOption;
   
    // Somewhere here we need to show the very first entry.

});

// Activities

// Create a cost textbox
const costDiv = document.createElement('div');
costDiv.innerHTML = '<b>Total:</b> <span id="cost"></span>';
selectActivitiesField.appendChild(costDiv);

// Cost span selector
const cost = costDiv.lastElementChild;
cost.textContent = 123;

selectActivitiesField.addEventListener('change', (e) => {
    let total = 0;

    // Get all the inputs in selectActiviesField
    const inputs = selectActivitiesField.getElementsByTagName('input');

    // Collect all the Input Checks = true and get sum of data-cost
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked === true) {
            total += parseInt(inputs[i].getAttribute('data-cost'));
        }
    }

    // Parse into $
    let totalParse = total.toString();
    const regex = /^(\d*)$/;
    const replacement = '$$$1\.00';
    cost.textContent = totalParse.replace(regex, replacement);
    
    // Disable conflicting schedules
    //selectActivitiesField.children[1].firstElementChild.disabled = true
    // Add additional font coloring

});