const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req,res,next) => {
    // console.log(req.path,"..", req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;  //jab loggein nhi h tab req k andar originalUrl ko save kra
        req.flash("error","you must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next) => {     //to check if user is owner of listing or not
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if( !listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req,res, next) => {
    let {error} = listingSchema.validate(req.body);    //to validate listing schema
    if(error){
        let errMsg  = error.details.map((el) => el.message).join(",");  //error k andar details object ko map karo( ro map return el.message for individual el(element)), and join all individuals with ","
        throw new ExpressError(400, errMsg ); 
    }else{
        next();
    }
};


module.exports.validateReview = (req,res, next) => {
    let {error} = reviewSchema.validate(req.body);    //to validate listing schema
    if(error){
        let errMsg  = error.details.map((el) => el.message).join(",");  //error k andar details object ko map karo( ro map return el.message for individual el(element)), and join all individuals with ","
        throw new ExpressError(400, errMsg ); 
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async (req,res,next) => {     //to check if user is author of review or not
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if( !review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};