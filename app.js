if (process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
// console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter  = require("./routes/review.js");
const userRouter  = require("./routes/user.js");


const dbUrl = process.env.ATLASDB_URL;


main()
.then((res) => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);    // engine is defined as ejsMate
app.use(express.static(path.join(__dirname, "/public")));  //to serve static files like css,image etc.

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,       //we want the user to keep logged in till 24hr i.e 24*3600 seconds
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE!", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,   // now login Date + milliseconds in 7 days (1 week)
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,    // to prevent from cross scripting attack [for security]
    },
};

// app.get("/", (req,res) => {
//     res.send("Hi, i am root");
// });



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //to use static authenticate method of passport-local-mongoose model 

passport.serializeUser(User.serializeUser()); //user se related info ko store krwana
passport.deserializeUser(User.deserializeUser()); //user se related info ko de-store krwana

app.use((req,res,next)=> {          //middleware
    res.locals.success = req.flash("success");  //locals are variables jo har jagah accesible hote h 
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser",async (req,res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"   // username is automatically defined in passport-local-mongoose
//     });

//     let registerdUser = await User.register(fakeUser, "helloWorld");  //password = helloWorld //register method will automatically save the fakeuser data in DB
//     res.send(registerdUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);    //here "/listings/:id/reviews" is the parent route
app.use("/", userRouter);

app.all("*",(req,res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) =>{
    let { statusCode = 500, message="Something went wrong!" } =  err;   //set default values so that if no other error is there , then it can print these values
    res.status(statusCode).render("error.ejs",{ message });
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});