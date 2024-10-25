const mongoose = require('mongoose')
const Schema = mongoose.Schema
const JobPostSchema = new Schema({
    position : {
        type : String,
        required : true
    },
    job_preference : {
        type : Array,
        required : true
    },
    about_job : {
        type : String,
        required : true
    },
    requirements : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    responsibility : {
        type : String,
        required : true
    },
    offer : {
        type : String,
        required : true
    },
    salary_start : {
        type : Number,
        required : true
    },
    salary_end : {
        type : Number,
        required : true
    },
    currency : {
        type : String,
        required : true,
    },
    createdUser : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }

},{timestamps : true})

module.exports = mongoose.model('JobPost',JobPostSchema)