const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded( {
    extended: true
});

const app = express();
app.post('/createClothing', urlencodedParser, routes.createFood);
app.post('/createAccount', urlencodedParser, routes.createAccount);

app.listen(3000);