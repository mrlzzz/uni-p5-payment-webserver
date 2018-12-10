//config

const express = require('express')
const app = express()

const port = process.env.PORT
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());






//logic

let result = "Unknown, send me something from QT";

app.get('/', function(req, res){
    res.send("Result: " + result);
});

app.post("/post", function(req, res){
    result = req.body.result;
    
    console.log("POST request received.")

	res.send("Accepted");

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
