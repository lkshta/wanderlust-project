const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    } ,
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [   //sare reviews ki object id ko store karne k liye
        {
            type: Schema.Types.ObjectId,
            ref: "Review",    //Review Model will be our reference
        },
    ],
    owner: {   //owner will refer user schema
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    // geometry: {
    //     type: {
    //         type: String, // Don't do `{ location: { type: String } }`
    //         enum: ['Point'], //'location.type' must be 'Point'
    //         required: true,
    //     },
    //     coordinates: {
    //         type:[Number],
    //         required: true,
    //     },
    // },
    // category: {      //homework
    //     type:String,
    //     enum: ["mountains", "arctic","farms", "deserts"],
    // },
});


//mongoose middleware 
listingSchema.post("findOneAndDelete" , async (listing) => {
    if(listing){
        await Review.deleteMany({_id:{ $in: listing.reviews}});
    }
} );

const Listing = mongoose.model("Listing", listingSchema);   // listings collection created
module.exports = Listing;
