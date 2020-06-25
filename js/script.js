//////////
// Init //
//////////

// User name textbox selector
const selectUserName = document.querySelector('#name');
// Job title dropdown selector
const selectTitle = document.querySelector('#title');
// Other job title textbox selector
const selectOtherTitle = document.querySelector('#other-title');
// Design dropdown selector
const selectDesignSelect = document.querySelector('#design');
// Design dropdown options
const selectDesignOptions = document.querySelectorAll('#design option');
// Colors dropdown selector
const selectColorsSelect = document.querySelector('#color');
// Color dropdown options
const selectColorOptions = document.querySelectorAll('#color option');
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


// Initial classes for Shirts
function initializeShirts() {
    for (let i = 0; i < selectColorOptions.length; i++) {
        // Shorthand variable for current option
        const option = selectColorOptions[i];
        const val = option.value;
    
        // Give these values the class 'pun'
        if (val === 'cornflowerblue' || val === 'darkslategrey' || val === 'gold') {
            option.classList.add('pun');
        // Give these values the class 'heart'
        } else if (val === 'tomato' || val === 'steelblue' || val === 'dimgrey') {
            option.classList.add('heart');
        }
    }
}

// Hide shirt color options
function resetShirtOptions () {
    // Remove all shirt options from select dropdown
    for (let i = 0; i < selectColorOptions.length; i++) {
        toggleVisibility(selectColorOptions[i], true);
    }
}


function initializePage() {
    // Focus on the first input box
    document.querySelector('input').focus();

    // Initial classes for shirts
    initializeShirts();

    // Hide other title textbox
    toggleVisibility(selectOtherTitle, true);

    // Initial settings for shirt
    resetShirtOptions();

    // Add shirt theme requirement
    selectColorsSelect.querySelector('#no-design').hidden = false;

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
   
    if (val === 'js puns') {
        // Hide all shirt options
        resetShirtOptions();
        // Show all '.puns' options
        for (let i = 0; i < selectColorOptions.length; i++) {
            // Show current index if classified as a pun shirt
            if (selectColorOptions[i].classList.contains('pun')) {
                toggleVisibility(selectColorOptions[i], false);
            }
        }
    } else if (val === 'heart js') {
        // Hide all shirt options
        resetShirtOptions();
        // Show all '.heart' options
        for (let i = 0; i < selectColorOptions.length; i++) {
            // Show current index if classified as a heart shirt
            if (selectColorOptions[i].classList.contains('heart')) {
                toggleVisibility(selectColorOptions[i], false);
            }
        }
    }
});