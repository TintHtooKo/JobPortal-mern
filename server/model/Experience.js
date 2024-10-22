    const mongoose = require('mongoose')
    const Schema = mongoose.Schema
    const ExperienceSchema = new Schema({
        user : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true
        },
        company : {
            type : String,
            required : true
        },
        company_url : {
            type : String,
            default : null
        },
        position : {
            type : String,
            required : true
        },
        start_date : {
            type : Date,
            required : true
        },
        end_date : {
            type : Date,
            default : null
        },
        responsibilities : {
            type : String,
            required : true
        }
    },{timestamps : true})

    module.exports = mongoose.model('Experience',ExperienceSchema)