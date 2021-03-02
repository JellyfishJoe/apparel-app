const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

let urlencodedParser = bodyParser.urlencoded( {
    extended: true
});

const app = express();
app.post('/createClothing', urlencodedParser, routes.createClothing);
app.post('/signUp', urlencodedParser, routes.createAccount);

app.listen(3000);