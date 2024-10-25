const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobApplySchema = new Schema({

},{timestamps : true})

module.exports = mongoose.model('JobApply',JobApplySchema)