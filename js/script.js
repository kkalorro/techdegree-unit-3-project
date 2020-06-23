//////////
// Init //
//////////

// User name textbox selector
const selectUserName = document.querySelector('#name');
// Job title dropdown selector
const selectTitle = document.querySelector('#title');
// Other job title textbox selector
const selectOtherTitle = document.querySelector('#other-title');
// Credit card div selector
const selectCreditCard = document.querySelector('#credit-card');
// PayPal div selector
const selectPayPal = document.querySelector('#paypal');
// Bitcoin div selector
const selectBitcoin = document.querySelector('#bitcoin');

///////////////
// Functions //
///////////////

function initializePage() {
    // Focus on the first input box
    document.querySelector('input').focus();

    // Hide other title textbox
    selectOtherTitle.hidden = true;

    // Hide shirt color options
    

    // Hide payment info divs
    selectCreditCard.hidden = true;
    selectPayPal.hidden = true;
    selectBitcoin.hidden = true;
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
        selectOtherTitle.hidden = false;
    } else {
        selectOtherTitle.hidden = true;
    }
});