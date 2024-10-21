const Experience = require('../model/Experience')
const mongoose = require('mongoose')
const User = require('../model/User')

const ExperienceController = {
    index : async(req,res) => {
        try {
                let exp = await Experience.find().populate({path : 'user',select : 'id fullname email'})
            return res.status(200).json(exp)
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    create : async(req,res) => {
        try {
            let currentUser = req.user
            if(!currentUser){
                return res.status(401).json({message : 'You don\'t have permission'})
            }
            let {company,company_url,position,start_date,end_date,responsibilities} = req.body
            let newExp = await Experience.create({user : currentUser._id,company,company_url,position,start_date,end_date,responsibilities})

            // Update the User document to include the new experience
            await User.findByIdAndUpdate(
                currentUser._id,
                { $push: { experience: newExp } },  // Add the experience ID to the experience array
                { new: true }  // Option to return the updated user document
            );

            return res.status(200).json(newExp)
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
            let exp = await Experience.findById(id).populate('user')
            if(!exp){
                return res.status(404).json({message : 'Experience not found'})
            }
            return res.status(200).json(exp)
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    update : async(req,res) => {
        try {
            let currentUser = req.user
            if(!currentUser){
                return res.status(401).json({message : 'You don\'t have permission'})
            }
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : 'Invalid ID'})
            }
            let exp = await Experience.findById(id).populate('user')
            if(!exp){
                return res.status(404).json({message : 'Experience not found'})
            }
            let editExp = await Experience.findByIdAndUpdate(id,req.body,{new : true})
            return res.status(200).json(editExp)
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    delete : async(req,res) => {
        try {
            let currentUser = req.user
            if(!currentUser){
                return res.status(401).json({message : 'You don\'t have permission'})
            }
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : 'Invalid ID'})
            }
            let exp = await Experience.findById(id).populate('user')
            if(!exp){
                return res.status(404).json({message : 'Experience not found'})
            }
            await Experience.findByIdAndDelete(id)

            // Remove the experience from the user's experience array
            await User.findByIdAndUpdate(exp.user._id, {
                $pull: { experience: id }
            });
            return res.status(200).json({message : 'Experience deleted'})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    }
}

module.exports = ExperienceController