const express = require('express');
const {spawn} = require('child_process');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const routes = require('../routes/routes');


let urlencodedParser = bodyParser.urlencoded( {
    extended: true
});

const app = express();
app.post('/createClothing', urlencodedParser, routes.createFood);
app.post('/createAccount', urlencodedParser, routes.createAccount);
app.post('/createClothing', urlencodedParser, routes.createClothing);
app.post('/signUp', urlencodedParser, routes.createAccount);
app.get('/', (req, res) => {
    
    var dataToSend;
    // spawn new child process to call the python script
    //const python = spawn('python', ['script1.py']);
    const python = spawn('python', ['script2.py','node.js','python']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
    });
    
})

app.listen(3000);