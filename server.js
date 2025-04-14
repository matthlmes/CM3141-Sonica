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


// SOCKET IO SETUP
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
  });


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
    if(!req.session.loggedin){res.redirect('/');return;}    //Checks user is logged in, if not send them back to the log in page
    var currentuser = req.session.currentuser;
    var email = req.session.currentemail;
    
    db.collection('events').find({"targetUser":email}).toArray(function(err, result){
        if(err) throw err;

        this.eventArray = result;

            res.render('pages/home', {
                username: currentuser
                });
            
        });

   
});

// CALENDAR PAGE
app.get('/calendar', function(req, res){
    if(!req.session.loggedin){res.redirect('/');return;}    //Checks user is logged in, if not send them back to the log in page
    var number = 1;
    res.render('pages/calendar', {
        newNumber: number
    })
   
});

// PLACEMENT PAGE
app.get('/placements', function(req, res){
    if(!req.session.loggedin){res.redirect('/');return;}    //Checks user is logged in, if not send them back to the log in page
        res.render('pages/placements');
   
});

// PROFILE PAGE
app.get('/profile', function(req, res){
    if(!req.session.loggedin){res.redirect('/');return;}    //Checks user is logged in, if not send them back to the log in page
    var email = req.session.currentemail;

    db.collection('users').findOne({"login.email":email}, function(err, result){        //Search db with email and returns all info
        if(err) throw err;

            var fname = result.fname;
            var lname = result.lname;
            var school = result.school;
            var pfp = result.pfp;

            res.render('pages/profile', {
                email: email,
                fname: fname,
                lname: lname,
                school: school,
                image: pfp
                });
            
        });
   
});




//------------------------------------------------------------------------------------------

/* app.start(async function(req, res){
    console.log(db.collection('soc').find());
}) */

//when called gathers all events (Called by calendarWeek.js and calendar.js)
app.get('/getEvents', function (req, res) {
    if (!req.session.loggedin) {
        res.status(401).send('Unauthorized');
        return;
    }
    const email = req.session.currentemail;
    db.collection('events').find({ "targetUser": email }).toArray(function (err, result) {
        if (err) throw err;
        
        res.json(result);
        });
    });

app.get('/isAdmin',function (req, res) {
    if(req.session.currentuser == 'admin' || req.session.currentuser == 'Admin'){
        console.log("Admin login");
        console.log(req.session.currentuser);
        res.send(true);
    }
    else{
        console.log("Non-admin login");
        console.log(req.session.currentuser);
        res.send(false);
    }
    return;
})

app.post('/addEvent', async function(req, res){
    
    //Required as checkbox returns 'on' or 'off' and true / false is needed
    if(req.body.allDayCheck == 'on'){
        allDay = true;
    } else{
        allDay = false;
    }

    const currentDate = new Date();
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    // Check if the start or end dates are in the past
    if (startDate < currentDate || endDate < currentDate) {
        console.log("Error: Cannot set past dates and times.");
        res.redirect('/home?error=pastDates');  // Redirect with an error message
        return;
    }

    let datatostore = {
        "title": req.body.eventTitle,
        "start": req.body.startDate,
        "end": req.body.endDate,
        "allDay": allDay,
        "extendedProps": {"location": req.body.location, "building": req.body.building},
        "studentEmail": req.session.currentemail,        //email stored alongside as a sort of "ID"
        "targetUser": req.body.Target
    }

    db.collection('events').insertOne(datatostore, function(err, result){
        if(err) throw err;
        console.log("Event Added");
        res.redirect('/home');
    })

});

// SIGN-UP
app.post('/signup', async function(req, res){

    defaultPFP = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png"

    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) throw err;
        bcrypt.hash(req.body.psw, salt, function(err, hash){
            if(err) throw err;
            let datatostore = {
                "fname": req.body.fname,
                "lname": req.body.lname,
                "login": {"email": req.body.email, "password": hash},
                "school": req.body.school,
                "pfp": defaultPFP
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
    let password = req.body.psw;

    db.collection('users').findOne({"login.email":username}, function(err, result){
        if (err) throw err;
        
        //IF NO USER REDIRECT TO INDEX
        if(!result){res.redirect('/');
            console.log('No User Found')
        return
        }

        username = result.fname;
        lastname = result.lname;
        email = result.login.email;
        school = result.school;

        bcrypt.compare(password, result.login.password, function(err, result) {
        // result == true
        console.log(result);
        //CHECKS PASSWORD AGAINST USER
            if(result == true){
                console.log("true")
                console.log(result);
                req.session.loggedin = true; 
                req.session.currentuser = username;
                req.session.currentemail = email;
                req.session.currentlname = lastname;
                req.session.currentschool = school;
                res.redirect('/home');
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


app.post('/addPost', function(req, res){
    //data needs stored
    const isoDate = new Date();
    const ISO = isoDate.toISOString();
    var currentuser = req.session.currentuser;
    db.collection('users').findOne({"login.username":currentuser}, function (err, authPic){
        if(err) throw err;
        var authorPic = authPic.picture;
            
        var datatostore = {
            "title":req.body.title,
            "category":req.body.category,
            "headerImg":req.body.headerImg,
            "description":req.body.description,
            "authorPic": authorPic,
            "Author":req.session.currentuser,
            "authorURL": "/user/" + req.session.currentuser,
            "published":ISO.slice(0 , 19) // Cuts out unwanted date information
        }
        db.collection('posts').insertOne(datatostore, function(err, result){
            if (err) throw err;
                console.log("saved to database");
                //when complete redirect back to index
                res.redirect('/dashboard');
        });
    });  
});


app.post('/updateUsername', function(req, res) {
    var query = { "login.username": req.session.currentuser};
    var newvalues = { $set: {"login.username": req.body.updateUsername}};
    db.collection('users').updateOne(query,newvalues, function(err, result) {
    if (err) throw err;
        res.redirect('/');
    });
});