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

function pushToDb(data){

	admin.database().ref('/').set({
    	username: data
    	
	});

}








//logic

let response = "Unknown, send me something from QT";
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
    result = req.body.result;
    
	pushToDb(result);
    console.log("POST request received.")

	res.send("Sent to DB, hopefully");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
