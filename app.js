const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
var path = require('path');

// create express app
const app = express();

app.set("view engine", "ejs");

// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// enable cors
app.use(cors())

https.get('https://fakestoreapi.com/products', (response) => {
    let data = '';
    response.on('data', (chunck) => {
        data += chunck;
    });
    response.on('end', () => {
        //  console.log(data);
        app.get('/', (req, res) => {
            //  res.send(__dirname)
            res.render("index", { data: data })
            // res.send("hiiiiiiii")
        })
        app.get('/addcart.html', (req, res) => {
            res.sendFile('views/addcart.html', { root: __dirname })
        })
    });
}).on('error', (error) => {
    console.log(error);
});

// listen for requests
app.listen(6175, () => {
    console.log("Server is listening on port 6175");
})