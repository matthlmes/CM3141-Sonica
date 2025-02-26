// BCRYPT SETUP
const bcrypt = require('bcrypt');
const saltRounds = 10;

// CONNECT TO MONGO
const MongoClient = require('mongodb-legacy').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbname = 'rguwork';

// LOAD NPM PACKAGES
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
const {Console, profile} = require('console');
const app = express();

app.use(session({secret: 'example'}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

// CONNECT TO DB
let db;
connectDB();
async function connectDB(){
    await client.connect();
    console.log('Connected Successfully to Server');
    db = client.db(dbname);
    app.listen(8080);
    console.log('Connected to Port: 8080');
};

//------------------------------------------------------------------------------------------

// RENDER PAGES (This gets server to display pages, PAGES WONT WORK WITHOUT BEING RENDERED)


// INDEX PAGE
app.get('/', function(req, res){
    res.render('pages/index');
});

// HOME PAGE
app.get('/home', function(req, res){
    //if(!req.session.loggedin){res.redirect('/');return;}    //Checks user is logged in, if not send them back to the log in page
        res.render('pages/home');
   
});





//------------------------------------------------------------------------------------------


// SIGN-UP
app.post('/signup', async function(req, res){

    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) throw err;
        bcrypt.hash(req.body.psw, salt, function(err, hash){
            if(err) throw err;
            let datatostore = {
                "fname": req.body.fname,
                "lname": req.body.lname,
                "login": {"email": req.body.email, "password": hash},
            }

            let email = req.body.email;
            db.collection('users').findOne({"login.email":email}, function(err, result){
                if(err) throw err;

                if(!result){
                    db.collection('users').insertOne(datatostore, function(err, result){
                        if(err) throw err;
                        console.log("User Created");
                        res.redirect('/');
                    });
                } else {
                    console.log("User Already Exists");
                    res.redirect('/users');
                }
            });
        });
    });
});


// LOGIN
app.post('/login', async function(req, res){
    let username = req.body.email;
    let password = req.body.password;

    db.collection('users').findOne({"login.email":username}, function(err, result){
        if (err) throw err;
        
        //IF NO USER REDIRECT TO INDEX
        if(!result){res.redirect('/');
            console.log('No User Found')
        return
        }

        bcrypt.compare(password, result.login.password, function(err, result) {
        // result == true
        console.log(result);
        //CHECKS PASSWORD AGAINST USER
            if(result == true){
                console.log("true")
                console.log(result);
                req.session.loggedin = true; 
                req.session.currentuser = result.fname;
                res.redirect('/dashboard');
            } else {
                res.redirect('/')
            }
        });
    });
});

//LOGOUT
app.get('/logout', function(req, res){
    req.session.loggedin = false;
    req.session.destroy();
    res.redirect('/');
});