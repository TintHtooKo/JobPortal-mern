const User = require('../model/User')
const Role = require('../model/Role')
const bcrypt = require('bcrypt')
const createToken = require('../token/createToken')

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
            return
        }
    },

    me : async(req,res) =>{   
        return res.json(req.user)
    }


}

module.exports = userController