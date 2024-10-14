const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RoleSchema = new Schema({
    role : {
        type : String,
        required : true
    }
},{Timestamps : true})

module.exports = mongoose.model('Role',RoleSchema)