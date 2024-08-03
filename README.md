CHECK HERE: https://my-first-project-fcmn.onrender.com

# Project AirBnb

- **Reviews Model**
- - comment : String
- - rating : Number
- - createdAt : date,time

Creating Reviews:

1. setting up review form
2. submitting the form

//Validations

1. Client side validation: (using form) //bootstrap
2. Server side validation: (using joi npm package):

- - 1. joi shcema create
- - 2. schema validate function
- - 3. this function is passed as middleware to app.post method

styling reviews: showing in card form
deleting reviews

# Express Router

express routers are a way to organize your express application usch that our primary app.js file does not become bloated(file size very much)

# using merge Params

it preserves the req.params values from the parent router. If the parent and the child have conflicting param names, the child's value take precedence.

# COOKIES

HTTP Cookies are small blocks of data created by a web server while a user is browsing a website and placed on the user's computer or other device by the user's web browser.

// Express has the ability to send cookies

//cookie parse : using cookie-parser (an npm package)

//SIGNED COOKIES: to make sure cookies are not changed/tempered
signed property: to check if the cookie is signed or not

# lec 49

### Stateful protocol:

require server to save the status and session information eg: FTP( file transfer protocol)
EG: UPI

isme generally request bhale hi same ho but kayi bari state k basis pe hamara response change ho jata h

### Stateless Protocol:

does not require the server to retain the server info or data eg: HTTP EG: Cash

isme agar req same h to generally response bhi same hi hota h

# express session

an attempt to make our session stateful.
express session jo bhi hmari website pe user aate h or wo koi session ( client to server interaction ) start karte h, wo uss session se related info save krta h or us session k liye ek session ID bna ta h ( on server side )

[ eg. Amazon website ]
session ID (user1) :{
item : laptop, item: charger
}

( on client side ) express session will not send the whole data of items of user1 , but it will only send the session ID to the browser on client side. This session ID info is saved on the browser in the form of COOKIES

## single session :

multiple requests , responses can be send between client and server provided client and server must remain same.
so ek single session me client and server same rehte h but unke beech me multiple req res ho skte h

### 05 connect flash:

- npm package
- messages ko flash krwata h
- appears single time only, i.e after refresh do not appear again
- flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.
- to use flash , session ko use karna compulsory h

### res locals

- use this property to set variables acccessible in templates rendered with res.render

### cookie in session options

cookie

- Settings object for the session ID cookie. The default value is { path: '/', httpOnly: true, secure: false, maxAge: null }.
- cookie ka kaam h sessions ko track krna
- by default cookie ki koi expiration date nhi hoti h
- practical application: ek bar login krke us tab ko band kr diya, next time naya tab kholenge ya wapas koi tab kholenge then we don't need to login again [fb 14 to 20 days, linkedin: few days tk login rhta h , github: 1 week ]
- kyuki sari info cookies k form me hmare browser pe save ho jati h

# lec 50 : Authentication & Authorization

- Authentication: process of verifying who someone is
- - eg signup, login
- Authorization: process of verifying what specific applications, files, and data a user has access to

### how are passwords stored?

- we never store the passwords as it is. We store their hashed form [output of hashing function]

### hashing function:

- for every i/p there is fixed o/p
- they are one way functions, we can't get input from output
- for a different input, there is a different output but of same length
- small changes in input should bring large changes in output
- eg: SHA256, MD5, CRC, bcrypt,

### Salting:

- a technique to protect passwords stored in databases by adding a string of 32 (called salt) or more characters and then hashing them.

### passport

- library of npm that helps in authentication
- Passport is Express-compatible authentication middleware for Node.js.
- passport-local: Passport strategy for authenticating with a username and password.
- passport-local-mongoose: Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.
- - You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

### configuring strategy:

#### passport.initialize()

- a middleware that initializes passport

#### passport.session():

- a web application needs the ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is known as a session.

#### passport.use(new LocalStrategy(User.authenticate()))

- passport local uses pbkdf2 hashing algo

#### Get signup/ post signup

# lec 51

#### connecting Login Route

- How to check if user is logged in? :
  req.isAuthenticated() //passport method

- logout user
- jaise hi sign up ho jaye wese hi automatically login ho jaye
- passport k pass /logout method hota h jo automatically logout kr deta h
  wese hi passport k pass /login method bhi hota h

#### post login

#### listing owner

- init folder: helps to initialize our database
- index.js : access data from initData and apply map() on that data, map har ek individual object k andar nayi property ko add kar dega
- but this map() array ek andar changes nhi karta, ye ek naya array create karta h, and those new properties will be inserted to the new array

## Authorization for listing

1. hide "edit" and "delete" button for unauthorized users

- for this we need 2 informations:
- who is listing's owner? //exists in show.ejs [listing.owner._id]
- the user who is trying to edit and delte listing, who is that user? i.e. id of current user
- so if listing.id and currUser.id are same then the user can edit and delete the listing otherwise not

## Authorization for review

1. every review k sath uska author/owner hona chahiye

# lec 52 MVC( Model, View, Controller ):

- design pattern or framework
- mvc existing project k andar code ko likhne ka ek tarika h
- models folder: to store database
- views folder: to store things we want to render , to store our frontend core functionality
- controller folder: to store backend core functionality

#### router.route(path)

- it returns a instance of a single router which can then use to handle HTTTP verbs with optional middleware.
- Use router.route() to avoid duplicate route naming and thus typing errors.
- same path ko baar baar define na krna pade isliye

#### image upload

- problems:

1. form cannot send the files to backend
2. size limit
   // In mongodb, data is saved in BSON ( binary json ) format, and bson has limit to store the file, generally high quality pictures cannot be saved

- steps to image upload

1. we'll make our form capable of sending files from frontend to backend
2. we know we cannot save the file in mongo, so we'll use third party service ( generally companies save it to AWS cloud, Google cloud, microsoft azure).
   3rd party service : to save our files , and after saving the file will provide a link/ url to us
3. save this link in mongo

#### Manipulating form

- by default our form can send urlencoded data
- to send files from our form, we use:
  enctype="multipart/form-data" //encoding type
- to parse our form data [multipart/form-data] : we'll use multer library of npm
- - multer: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
- NOTE: Multer will not process any form which is not multipart (multipart/form-data).

#### cloud setup

- cloudinary and
- credentials ( name, api key, api secret etc) should not be shared with anyone. Sharing these can make your storage/ data accessible to others
- .env file: to store our environment variables ( credentials ) ( imp data that we don't want to share with others)
- - details are stored in "KEY=value" form in .env file
- we cannot access the environmental variables directly from the .env file
- to access them we use "dotenv" ( a third party npm package used to integrate env file with our backend )
- Dotenv: is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
- .env file ko ham sirf DEvelopment phase me use karte h , production phase me use nhi karte

- install cloudinary npm package ,
- install multer-storage-cloudinary npm package

- hum apne code ko btayenge ki cloudinary k account ko kese access kare

# lec 53

- setup : mapbox (API for maps )

##### GeoCoding:

- process of converting addresses ( like a street address ) into geographic coordinates ( like latitude and longitude ), which you can use to place markers on a map, or position the map.
- need to signup on mapbox by providing credit card details
- geocoding API exists in mapbox or google maps
- forward geocoding
- reverse geocoding
- A JS SDK for working with Mapbox APIs.Works in Node, the browser, and React Native.
  As of 6/11/18, the codebase has been rewritten and a new npm package released. The mapbox package is deprecated in favor of the new @mapbox/mapbox-sdk package. Please read the documentation and open issues with questions or problems.

##### GeoJSON :- in mongoose

- GeoJSON is a format for storing geographic points and polygons. MongoDB has excellent support for geospatial queries on GeoJSON objects.
- map marker
- map marker popup

#### two ways to hide something in css

1. display: none --> element gayab as well as no space is occupied by the element
2. visibility : hidden --> element gayab ho jaega but code me rhega, means it will occupy space

# lec 55

##### MONGO Atlas :

- Cloud Database service
- all database data online deploy
- deploy a multi-cloud database
- username, password notepad file

##### MONGO Session Store

- connect-mongo : A MongoDB based session store. a npm package

##### DEPLOYMENT

- RENDER,NETLIFY , CYCLIC etc. platforms for deploying your project
- in this project we'll deploy using RENDER

- Flow to deploy our project on RENDER
1. local system to github ( pvt repo )
2. github to render

- DO NOT push .env file to github. Also no need to push node_modules folder as well.
- using .gitignore 
