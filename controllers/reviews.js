
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");



module.exports.createReview = async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();  
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req,res) => {
    let {id, reviewId} = req.params;

    //we have to delete that review from reviews array of listing
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});

    //delete from review 
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};