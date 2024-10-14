const Position = require('../model/Position')
const mongoose = require('mongoose')

const positionController = {
    index : async(req,res) => {
        try {
            let position = await Position.find()
            return res.status(200).json(position)
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },
    create : async(req,res) => {
        try {
            let {position} = req.body
            let newPosition = await Position.create({position})
            return res.status(200).json(newPosition)
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },
    detail : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : 'Invalid ID'})
            }
            let position = await Position.findById(id)
            if(!position){
                return res.status(404).json({message : 'Position not found'})
            }
            return res.json(position)
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },
    delete : async(req,res) => {
        try {
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : 'Invalid ID'})
            }
            let position = await Position.findById(id)
            if(!position){
                return res.status(404).json({message : 'Position not found'})
            }
            await Position.findByIdAndDelete(id)
            return res.status(200).json({message : 'Position deleted'})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    }
}

module.exports = positionController