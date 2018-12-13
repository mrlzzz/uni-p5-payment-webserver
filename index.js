// Express config

const express = require('express')
const admin = require('firebase-admin');

const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Firebase config

admin.initializeApp({
	credential: admin.credential.cert('paymentapp-fd05e-firebase-adminsdk-6ux8g-bc9c07222c.json'),
 	databaseURL: "https://paymentapp-fd05e.firebaseio.com"
});

const db = admin.database();







// Firebase logic

let users = db.ref("/users");
let transactions = db.ref("/transactions");

function pushTransaction(timestamp, amount, currency, terminalID, pan, pin){

	transactions.push().set({
			
			"Timestamp": timestamp,
			"Amount": amount,
			"Currency": currency,
			"TerminalID": terminalID,
			"PAN": pan,
			"PIN": pin,
			"Amount": amount
	});

	console.log("Transaction pushed, congratulations!");
}

function verifyTransaction(pan, pin, amount){

	users.on('value', function(snapshot) {
		snapshot.forEach(function(child) {

			let user = child.val().CreditCard

			if(user.PAN === pan ){
				console.log("Found corresponding PAN."); 

				if(user.PIN === pin) {
					console.log("PIN is correct");

					if(user.Amount >= amount){
						console.log("Sufficient funds.");
					} else console.log("Insufficient funds.");

				}	else console.log("Incorrect PIN");

			} else console.log("Corresponding PAN not found.");
			
	  	});
	});
}



// Initial data - run once to fill up DB
// Fills up DB with two main "tables"

/* DONT RUN THIS CODEEEEE
db.ref('/').set({
	users: [
		{
			"CreditCard": {
			    "IssuingNetwork": "Visa",
			    "PAN": "5270820790587748",
			    "Name": "Landon Carter",
			    "CVV": "821",
			    "Amount": "216",
				"Currency": "DKK",
			    "Exp": "01/2020",
			    "PIN": "1234"
			}
		},
		{
			"CreditCard": {
			    "IssuingNetwork": "Master Card",
			    "PAN": "5159191881143965",
			    "Name": "Aiden Perez",
			    "CVV": "101",
			    "Amount": "1228",
				"Currency": "DKK",
			    "Exp": "05/2021",
			    "PIN": "5685"
			}
		},
		{
			"CreditCard": {
			    "IssuingNetwork": "Master Card",
			    "PAN": "5118215196387353",
			    "Name": "James Evans",
			    "CVV": "791",
			    "Amount": "522",
				"Currency": "DKK",
			    "Exp": "01/2023",
			    "PIN": "1010"
			}
		}
	],
	
	transactions: []
});
*/


/*transactions.push().set({
	
	"Timestamp": "timestamp",
	"Amount": "amount",
	"Currency": "currency",
	"TerminalID": "terminalID",
	"PAN": "pan",
	"PIN": "pin"			
	
});
*/
// Data container initialization

let response = "Unknown, send me something from QT";
let result = "No idea why is it here";

let timestamp = "";
let amount = "";
let currency = "";
let terminalID = "";
let pan = "";
let pin = "";


// Retrieve data from QT app

app.post("/post", function(req, res){

    timestamp = req.body.timestamp;
	amount = req.body.amount;
	currency = req.body.currency;
	terminalID = req.body.terminalID;
	pan = req.body.pan;
    pin = req.body.pin;
    
	pushTransaction(timestamp, amount, currency, terminalID, pan, pin);
	verifyTransaction(pan, pin, amount);

    console.log("POST request received.")

	// Response to QT app

	res.send("Sent to DB, hopefully.");
})

// Basic routing, HTTP GET and POST methods

app.get('/', function(req, res){

    res.send("Result: " + result);

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




























