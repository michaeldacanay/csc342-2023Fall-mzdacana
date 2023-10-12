
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const senderFirstName = document.querySelector('#sender-first-name');
    const senderLastName = document.querySelector('#sender-last-name');
    let recipientFirstName = document.querySelector('#recipient-first-name');
    const recipientLastName = document.querySelector('#recipient-last-name');
    const expirationDate = document.querySelector('#expiration-date');
    const cvv = document.querySelector('#cvv');
    const submit = document.querySelector('#submit');
  
    //name.setCustomValidity('Name can only be "Mary" or "Stu"');
  
    form.addEventListener("submit", e => {
        let expirationDateInput = new Date(expirationDate.value);
        // Create a Date object for today
        let today = new Date();

        // Compare the input date with today's date
        if (expirationDateInput >= today) {
            console.log('The input date is today or in the future.');
        } else {
            alert("Credit card is expired");
            e.preventDefault();
        }

        // make sure that CVV is 3 or 4 characters long
        if (cvv.value.length < 3 || cvv.value.length > 4) {
            alert("CVV must be between 3 and 4 characters.");
            e.preventDefault();
        }

        // ban Stu Dent from receicing payment
        if (recipientLastName.value == 'Dent' && 
            (recipientFirstName.value == 'Stu' || recipientFirstName.value == 'Stuart')) {
            alert("Stuart AKA Stu Dent is banned from receiving payment.");
            e.preventDefault();
        }
    });

    // enforce only numeric input for CVV
    cvv.addEventListener("keydown", e => {
        if (/^[0-9]$/.test(e.key)) {
            console.log('Key', e.key, 'was pressed!');
            cvv.textContent += e.key;
        } else {
            e.preventDefault();
        }
    });
    
});

