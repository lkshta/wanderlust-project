const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) =>{
         console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    //if some data already exists delete it
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:"669d57bbd085fa3ae02cde61"}));
    await Listing.insertMany(initData.data);   //data is key in exports function in data.js 
    console.log("data was initialized");
};

initDB();