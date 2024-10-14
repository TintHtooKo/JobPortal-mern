const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PositionSchema = new Schema({
    position : {
        type : String,
        required : true
    }
},{Timestamps : true})

module.exports = mongoose.model('Position',PositionSchema)