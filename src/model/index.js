const mongoose = require('mongoose');

const Film = mongoose.model('Film', { 
    title: [
        {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        }
    
    ] ,
    description: [
        {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        }
    
    ] ,
    image_url: [
        {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        }
    ] ,
    trailer_url: [
        {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        }
    ]
});

module.exports = {Film};