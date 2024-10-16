const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ExperienceSchema = new Schema({

},{timestamps : true})

module.exports = mongoose.model('Experience',ExperienceSchema)