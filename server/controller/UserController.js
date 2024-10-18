const User = require('../model/User')
const Role = require('../model/Role')
const bcrypt = require('bcrypt')
const createToken = require('../token/createToken')
const removeFile = require('../helper/removeFile')
const mongoose = require('mongoose')



const userController = {
    register : async(req,res) =>{
        try {
            let {fullname,email,phone,password,role,position} = req.body
            let emailExist = await User.findOne({email})
            if(emailExist){
                return res.status(400).json({message : 'Email already exist'})
            }
            let phoneExist = await User.findOne({phone})
            if(phoneExist){
                return res.status(400).json({message : 'Phone already exist'})
            }
            if(!role){
                let defaultRole = await Role.findOne({role : 'User'})
                if(defaultRole){
                    role = defaultRole._id
                }else {
                    return res.status(400).json({ message: 'Default role not found' });
                }
            }

            let salt = await bcrypt.genSalt(10)
            let hashPassword = await bcrypt.hash(password,salt)

            let user = await User.create({fullname,email,phone,password:hashPassword,role,position})
            let token = createToken(user._id)
            user = await User.findById(user._id).populate('role').populate('position');
            let maxAge =  24 * 60 * 60
            res.cookie('jwt',token,{httpOnly : true, maxAge:maxAge * 1000})
            return res.status(200).json({user,token})

        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    login : async(req,res) =>{
        try {
            let {email,password} = req.body
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message : 'Your email is not registered'})
            }
            let isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).json({message : 'Password does not match'})
            }
            let token = createToken(user._id)
            user = await User.findById(user._id).populate('role').populate('position');
            let maxAge =  24 * 60 * 60
            res.cookie('jwt',token,{httpOnly : true, maxAge:maxAge * 1000})
            return res.status(200).json({user,token})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    logout : async(req,res) =>{
        try {
            res.cookie('jwt','',{maxAge:1})
            return res.status(200).json({message : 'Logout success'})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    userList : async(req,res) =>{ 
        try {
            let currentUser = req.user
            if(currentUser.role.role !== 'Admin' && currentUser.role.role !== 'Super Admin'){
                return res.status(401).json({message : 'You don\'t have permission'})               
            }
            let user = await User.find().populate('role').populate('position')
            return res.status(200).json({user})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    userEdit : async(req,res) =>{ 
        try {
            let currentUser = req.user
            let {fullname,phone,role,position,skills,degree,address,linkedin,github,portfolio,job_preference,bio,about,country,state,city} = req.body
            let editUser = await User.findByIdAndUpdate(currentUser._id,
                                {
                                    fullname,phone,role,position,skills,degree,address,linkedin,
                                    github,portfolio,job_preference,bio,about,country,state,city
                                },{new : true}).populate('role').populate('position')
            return res.status(200).json({message:"Edit User Success"})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    me : async(req,res) =>{   
        return res.json(req.user)
    },

    uploadCv : async(req,res)=>{
        try {
            let currentUser = req.user
            let user = await User.findById(currentUser._id)
            let cv = {cv : '/' + req.file.filename}
            let data = await User.findByIdAndUpdate(currentUser._id,cv,{new : true})   
            await removeFile(__dirname + '/../public/cv/' + user.cv)
            return res.status(200).json({message : 'Upload CV success'})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    changeEmail : async(req,res) =>{
        try {
            let currentUser = req.user
            let {email} = req.body
            let emailExist = await User.findOne({email})
            if(emailExist){
                return res.status(400).json({message : 'Email already exist'})
            }
            let user = await User.findById(currentUser._id)
            if(!user){
                return res.status(400).json({message : 'User not found'})
            }
            user.email = email
            user = await User.findByIdAndUpdate(currentUser._id,user,{new : true})
            return res.status(200).json({message : 'Change email success'})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    changePassword : async(req,res) =>{
        try {
            let currentUser = req.user
            let {oldPassword,newPassword} = req.body
            let user = await User.findById(currentUser._id)
            let checkPassword = await bcrypt.compare(oldPassword,user.password)
            if(!checkPassword){
                return res.status(400).json({message : 'Old password does not match'})
            }
            let salt = await bcrypt.genSalt(10)
            let hashPassword = await bcrypt.hash(newPassword,salt)
            user.password = hashPassword
            await user.save()
            return res.status(200).json({message : 'Change password success'})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    } ,

    userDelete : async(req,res)=>{
        try {
            let currentUser = req.user
            if(!currentUser && currentUser.role.role !== 'Super Admin'){
                return res.status(400).json({message : 'You don\'t have permission'})
            }
            let id = req.params.id
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({message : 'Invalid ID'})
            }
            let user = await User.findById(id)
            if(!user){
                return res.status(400).json({message : 'User not found'})
            }
            user = await User.findByIdAndDelete(id)
            await removeFile(__dirname + '/../public/cv/' + user.cv)
            return res.status(200).json({message : 'Delete user success'})
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    }


}

module.exports = userController