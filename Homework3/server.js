// Import our Express dependency
const express = require('express');
const hbs = require('hbs');
const multer = require('multer');
const upload = multer({dest: 'static/uploads/'});

const app = express();  // Create a new server instance
const PORT = 3000;  // Port number we want to use of this server

const html_dir = __dirname + '/templates/';


// Set up Middleware

// Configure hbs as the template engine
app.set('view engine', 'hbs');
app.set('views', 'templates')

// Designate the public folder as the location to look for static resources
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.get("/",(req, res) => {
    res.sendFile(html_dir + "form.html");
});

app.post("/send", upload.single('sender-image'), (req, res) => {
    console.log("Body", req.body);
    console.log("File", req.file);
    
    try {
        if(req.body['sender-first-name'] == "" || !('sender-first-name' in req.body)) {
            throw new Error("sender first name is required");
        }
        if(req.body['sender-last-name'] == "" || !('sender-last-name' in req.body)) {
            throw new Error("sender last name is required");
        }
        if(req.body['recipient-last-name'] == "Dent" && (req.body['recipient-first-name'] == "Stu" || req.body['recipient-first-name'] == "Stuart")) {
          throw new Error("Stu Dent is banned from receiving payment");
        }
        if(req.body['recipient-first-name'] == "" || !('recipient-first-name' in req.body)) {
            throw new Error("recipient first name is required");
        }
        if(req.body['recipient-last-name'] == "" || !('recipient-last-name' in req.body)) {
            throw new Error("recipient last name is required");
        }
        if(req.body.message == "" || !('message' in req.body)) {
            throw new Error("message is required");
        }
        if(req.body['notification-method'] == "" || !('notification-method' in req.body)) {
            throw new Error("notification method is required");
        }
        if(req.body['notification-method'] == "email" && req.body['email'] == "") {
            throw new Error("email is required");
        }
        if(req.body['notification-method'] == "sms" && req.body['phone'] == "") {
            throw new Error("phone is required for sms");
        }
        // payment validation
        if(req.body['card-type'] == "" || !('card-type' in req.body)) {
            throw new Error("card type is required");
        }
        if(req.body['card-number'] == "" || !('card-number' in req.body)) {
            throw new Error("card number is required");
        }
        const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        if (!cardNumberPattern.test(req.body['card-number'])) {
            throw new Error("card number must match XXXX-XXXX-XXXX-XXXX format");
        }
        if(req.body['expiration-date'] == "" || !('expiration-date' in req.body)) {
            throw new Error("card expiration date is required");
        }

        const expirationDate = new Date(req.body['expiration-date']);
        const currentDate = new Date(); // Get the current date
        if (expirationDate < currentDate) {
            throw new Error('card is expired');
        }

        if(req.body['cvv'] == "" || !('cvv' in req.body)) {
            throw new Error("card cvv is required");
        }
        if(req.body['cvv'].length < 3 || req.body['cvv'].length > 4) {
            throw new Error("card cvv must be 3 or 4 numbers");
        }
        if(req.body['amount'] == "" || !('amount' in req.body) || isNaN(req.body['amount'])) {
            throw new Error("payment amount is required or invalid");
        }

        if(req.body['agree-to-terms'] == "" || !('agree-to-terms' in req.body)) {
            throw new Error("must agree to terms");
        }

        let data = {
            senderFirstName: req.body['sender-first-name'],
            senderLastName: req.body['sender-last-name'],
            senderImagePath: '/uploads/' + req.file['filename'],
            recipientFirstName: req.body['recipient-first-name'],
            recipientLastName: req.body['recipient-last-name'],
            message: req.body.message,
            notificationMethod: req.body['notification-method'],
            email: req.body.email,
            phone: req.body.phone,
            cardType: req.body['card-type'],
            cardNumber: req.body['card-number'],
            expirationDate: req.body['expiration-date'],
            cvv: req.body.cvv,
            amount: req.body.amount,
            currentDate: currentDate,
        }

        // Render the hbs template with the dynamic content
        res.render('success', data); // 'success' corresponds to 'success.hbs'

    }
    catch(err) {
        res.send("Validation Failed. " + err);
    }
    
});

// Ask our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));