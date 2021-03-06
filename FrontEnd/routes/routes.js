const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Mongo connection
mongoose.connect('mongodb+srv://admin:LJVRsz0lCEuzWymQ@apparel-app.qaodr.mongodb.net/data?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);


let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

//Schema for clothing
let clothesSchema = mongoose.Schema({
    itemId: String,
    type: String,
    color: String,
    season: String,
    description: String,
    imgData: String,
    username: String
  });

let Clothing = mongoose.model('Clothing', clothesSchema);


//get clothing with the username of user
exports.createClothing = (req, res) => {
    let clothing = new Clothing({
        itemId: req.body.itemId,
        type: req.body.clothing,
        color: req.body.color,
        season: req.body.season,
        color: req.body.color,
        username: req.body.username
      });
      clothing.save((err) => {
        if (err) return console.error(err);
        console.log(req.body.type + ' added');
      });
  }
  
  //user Account schema
  let accountSchema = mongoose.Schema({
    username: String,
    password: String,
  });

  
let Account = mongoose.model('Account_Collection', accountSchema);

exports.getPython = (req, res) => {
  var dataToSend;
  // spawn new child process to call the python script
  // get the image from the database 
  const python = spawn('python', ['Handle2.py','Image']);

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
}
  
exports.createAccount = (req, res) => {
  //set account to user input
    let account = new Account({
      username: req.body.userName,
      password: req.body.passWord,
    });
    //save and redirect to signin
    account.save((err) => {
      if (err) return console.error(err);
      console.log(req.body.userName + ' added');
    });
    res.redirect('../pages/signin.html');
  }

  //API get of clothing with userName
exports.getClothing = (req, res) => {
  Clothing.find({ username: req.params.userName}, (err, clothing) => {
    if (err) return console.error(err);
    console.log(req.params.username);

    res.json(clothing);
})
}

//Delete clothing with id
exports.delete = (req, res) => {
  Clothing.findByIdAndDelete(req.params.id, (err, clothing) => {
    if (err) return console.error(err);
  });
};

exports.logout = (req, res) => {
  //Destroy the session and go back to login
  req.session.destroy(err => {
    if(err) {
      console.log(err);
    } else {
      res.redirect('../pages/signin.html');
    };
  });
}

exports.attemptlogin = (req, res) => {
  //finds account with username
  Account.find({ username: req.body.username}, (err, account) => {
    if (err) return console.error(err);
    //compares password of that username to input
    //if it goes through, they are authenticated, otherwise no
      if(req.body.username == account[0].username &&  req.body.password == account[0].password) {
      req.session.user = {
        isAuthenticated: true,
        username: req.body.username
      }
      console.log(req.body.username)
      res.redirect('../pages/wardrobe.html')
    } else {
      res.redirect('../pages/signin.html')
    }
  });
}
