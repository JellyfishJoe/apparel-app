const express = require('express');
const {spawn} = require('child_process');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const routes = require('../routes/routes');

const app = express();

let urlencodedParser = bodyParser.urlencoded( {
    extended: true
});

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
      next();
    } else {
      res.redirect('/login');
    }
}

app.use(expressSession({
    secret: 'something',
    saveUninitialized: true,
    resave: true
  }));

app.post('/createClothing', urlencodedParser, routes.createClothing);
app.post('/createAccount', urlencodedParser, routes.createAccount);
app.post('/signUp', urlencodedParser, routes.createAccount);
app.get('/api/clothing:userName', checkAuth, routes.getClothing);
app.get('/delete/:id', checkAuth, routes.delete);
app.get('/wardrobe', urlencodedParser, routes.getPython)
app.post('/login', urlencodedParser, routes.attemptlogin)
app.get('/logout', routes.logout);


app.listen(3000, () => {
	console.log("Server has started!")
})