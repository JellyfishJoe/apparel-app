const express = require('express');
const {spawn} = require('child_process');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const routes = require('../routes/routes');


let urlencodedParser = bodyParser.urlencoded( {
    extended: true
});

const app = express();
app.post('/createClothing', urlencodedParser, routes.createClothing);
app.post('/createAccount', urlencodedParser, routes.createAccount);
app.post('/createClothing', urlencodedParser, routes.createClothing);
app.post('/signUp', urlencodedParser, routes.createAccount);
app.get('/api/clothing:userName', checkAuth, routes.getClothing);
app.get('/delete/:id', checkAuth, routes.delete);
app.get('/wardrobe', urlencodedParser, routes.getPython)


app.listen(3000, () => {
	console.log("Server has started!")
})