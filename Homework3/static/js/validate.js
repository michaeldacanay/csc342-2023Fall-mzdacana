
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const senderFirstName = document.querySelector('#sender-first-name');
    const senderLastName = document.querySelector('#sender-last-name');
    const recipientFirstName = document.querySelector('#recipient-first-name');
    const recipientLastName = document.querySelector('#recipient-last-name');
    // const selectedNotifyRadio = document.querySelector('input[name="notification-method"]:checked');
    const emailRadio = document.querySelector('#email-radio')
    const smsRadio = document.querySelector('#sms-radio')
    const email = document.querySelector('#email');
    const phone = document.querySelector('#phone');
    const expirationDate = document.querySelector('#expiration-date');
    const cvv = document.querySelector('#cvv');
    const submit = document.querySelector('#submit');
  
    //name.setCustomValidity('Name can only be "Mary" or "Stu"');
  
    form.addEventListener("submit", e => {
        let expirationDateInput = new Date(expirationDate.value);
        let today = new Date(); // Create a Date object for today

        // Compare the input date with today's date
        if (expirationDateInput < today) {
            e.preventDefault();
            alert("Credit card is expired.");
        }

        if (emailRadio.checked) {
            if (email.value.length === 0) {
                alert("Please enter email.");
                e.preventDefault();
            } else {
                // Regular expression to validate email format
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!emailRegex.test(email.value)) {
                    alert("Please enter a valid email address.");
                    // e.preventDefault();
                }
            }
        }

        if (smsRadio.checked && phone.value.length === 0) {
            alert("Please enter phone number.");
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

