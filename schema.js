// joi : an npm package tool for schema validation on server side

const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description:Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),   //min value is set at 0 so that price can't be negative
        image: Joi.string().allow("",null),
    }).required()           //joi k andar listing naam ki object hmesha honi hi honi chahiye ( required )
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});