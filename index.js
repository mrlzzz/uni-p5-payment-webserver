const express = require('express')
const app = express()


const port = 3000
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
let one = 'to ja :D';
let two = '';

app.get('/', function(req, res){

    res.send("One: " + one);

});




app.post("/post", function(req, res){

    one = req.body.name;
    two = req.body.text;

    

    return;
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))