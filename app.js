const express = require("express")
const app = express();
const mongoose = require("mongoose");
const listing = require("./model/listing.js");
const methodOverride = require('method-override'); // for put request accessible , first install it  
app.use(methodOverride('_method'));
const path = require("path");
const ejsMate = require(`ejs-mate`); //ejs-mate boilerplate
app.engine("ejs", ejsMate ); // ejsmate boilerplate
app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
app.use(express.urlencoded({extended:true})); //for passing the data of req.params for get req.
app.use(express.static(path.join(__dirname,"/public"))); // for styling the website or image serving websites
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log("err");c
});

app.listen(8080,()=>{
    console.log("app is listening")
});

//home root
app.get("/",(req,res)=>{
    res.send("hey i am root");
})
//index route
app.get("/listing", async (req,res)=>{
    const alllisting= await listing.find({});
    res.render("./listing/index.ejs",{alllisting});
});

//new route to show that what we want to add
app.get("/listing/new",(req,res)=>{
    res.render("listing/new.ejs")
})

//added new route to listing
app.post("/listing",async(req,res)=>{
    let {title,description,image,price,location,country} = req.body;
    const newlist= new listing({title,description,image,price,location,country});
    await newlist.save();
    res.redirect("/listing");
});
// show route i.e,read
app.get("/listing/:id",async(req,res)=>{
    let {id}= req.params;
    const Listing= await listing.findById(id);
    res.render("./listing/show.ejs",{Listing});
})

//edit 
app.get("/listing/:id/edit",async(req,res)=>{
    let {id}= req.params;
    const Listing= await listing.findById(id);
    res.render("listing/edit.ejs",{Listing});
})
//update the page that we are editing the data
app.put("/listing/:id",async(req,res)=>{
    let {id}= req.params;
    const updatedata ={ title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        location: req.body.location,
        country: req.body.country,
    };
    await listing.findByIdAndUpdate(id,updatedata);
    res.redirect(`/listing/${id}`);
});

// delete the listing frpm show.ejs
app.delete("/clisting/:id",async(req, res)=>{
    let {id} = req.params;
    let deleteListing = await listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listing");
});





// app.get("/testlisting",async(req, res)=>{
//     const sampleListing = new listing({
//         title:"vrindavan",
//         description:"temple",
//         image:"image link",
//         price: 4500,
//         location: "up",
//         country:"india"
//     })
//     await sampleListing.save().then(()=>{
//         res.send("sample was saved");
//     })
// });