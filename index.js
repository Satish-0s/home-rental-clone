const mongoose = require("mongoose");
const initData = require("./data.js") // access all the listing data (data.js) and store to init
const listing = require("../model/listing.js"); // access listing which is store in model file

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // connection to mongoDb
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log("err");
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDb = async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("data saved")
};
initDb();
//index.js is used for , it delete the previously data in mongodb and then insert the data of listing (data.js) and update the data in database(mongodb)