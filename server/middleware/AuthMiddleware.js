const jwtToken = require('jsonwebtoken')
const User = require('../model/User')
const AuthMiddleware = async(req,res,next) => {
    let token = req.cookies.jwt
    if(token){
        jwtToken.verify(token,process.env.JWT_SECRET,(err,decodedToken)=>{
            if(err){
                return res.status(401).json({message : 'Unauthorized'})
            }else{
                User.findById(decodedToken._id).populate('role').populate('position').then((user)=>{
                    req.user = user
                    next()
                })
            }
        })
    }else{
        return res.status(400).json({message: 'Token need to provide'})
    }
}

module.exports = AuthMiddleware