const Role = require('../model/Role')
const mongoose = require('mongoose')

const RoleController = {
    index : async(req,res) => {
        try {
            let role = await Role.find()
            return res.status(200).json(role)
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    create : async(req,res) => {
        try {
            let {role} = req.body
            let newRole = await Role.create({role})
            return res.status(200).json(newRole)
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
            let role = await Role.findById(id)
            if(!role){
                return res.status(404).json({message : 'Role not found'})
            }
            return res.json(role)
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
            let role = await Role.findById(id)
            if(!role){
                return res.status(404).json({message : 'Role not found'})
            }
            await Role.findByIdAndDelete(id)
            return res.status(200).json({message : 'Role deleted'})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    }
}

module.exports = RoleController