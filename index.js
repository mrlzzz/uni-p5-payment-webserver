//config

const express = require('express')
const admin = require('firebase-admin');

const app = express()

const port = process.env.PORT
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//firebase config





admin.initializeApp({
  credential: admin.credential.cert('paymentapp-fd05e-firebase-adminsdk-6ux8g-bc9c07222c.json'),
  databaseURL: "https://paymentapp-fd05e.firebaseio.com"
});

function pushToDb(timestamp, pin){

	admin.database().ref("/transactions").set(
	
		{
		"Timestamp": timestamp,
		"PIN": pin
		}
	
	);

}


admin.database().ref('/').set({
    	users: [
			{
				"CreditCard": {
				    "IssuingNetwork": "Master Card",
				    "CardNumber": "5270820790587748",
				    "Name": "Landon Carter",
				    "CVV": "821",
				    "Limit": "216$",
				    "Exp": "01/2020",
				    "PIN": "1234"
				}
			},
			{
				"CreditCard": {
				    "IssuingNetwork": "Master Card",
				    "CardNumber": "5159191881143965",
				    "Name": "Aiden Perez",
				    "CVV": "101",
				    "Limit": "1228$",
				    "Exp": "05/2021",
				    "PIN": "5685"
				}
			},
			{
				"CreditCard": {
				    "IssuingNetwork": "Master Card",
				    "CardNumber": "5118215196387353",
				    "Name": "James Evans",
				    "CVV": "791",
				    "Limit": "522$",
				    "Exp": "01/2023",
				    "PIN": "1010"
				}
			}
		],
		
		transactions: ""
    });








//logic

let response = "Unknown, send me something from QT";
let timestamp = "";
let pin = "";
let result = "";

function verify(r){

	if(r === "Accepted") {
	
		response = "Accepted";	

	} else { 

		response = "Rejected";	
	
	}

}

app.get('/', function(req, res){
    res.send("Result: " + result);
});

app.post("/post", function(req, res){
    timestamp = req.body.timestamp;
    pin = req.body.pin;
    
	pushToDb(timestamp, pin);
    console.log("POST request received.")

	res.send("Sent to DB, hopefully");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




























