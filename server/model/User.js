const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    position : {
        type : Schema.Types.ObjectId,
        ref : 'Position',
        required : true
    },
    profile_img : {
        type : String,
        default : null
    },
    role : {
        type : Schema.Types.ObjectId,
        ref : 'Role',
    },
    bio : {
        type : String,
        default : null
    },
    about : {
        type : String,
        default : null
    },
    cv : {
        type : String,
        default : null
    },
    skills : {
        type : Array,
        default : null
    },
    address : {
        type : String,
        default : null
    },
    degree : {
        type : Array,
        default : null
    },
    job_preference : {
        type : Array,
        default : null
    },
    experience : {
        type : Schema.Types.ObjectId,
        ref : 'Experience',
        default : null
    },
    linkedin : {
        type : String,
        default : null
    },
    github : {
        type : String,
        default : null
    },
    portfolio : {
        type : String,
        default : null
    }
},{timestamps : true})

module.exports = mongoose.model('User',UserSchema)