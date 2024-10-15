const jwtToken = require('jsonwebtoken')
const User = require('../model/User')
const AuthMiddleware = (req,res,next) =>{
    let token = req.cookies.jwt
    if(token){
        jwtToken.verify(token,process.env.JWT_SECRET,async(err,decodedValue)=>{
            if(err){
                return res.status(401).json({msg:'Unauthenticate'})
            }else{
                let user = await User.findById(decodedValue._id).populate('role').populate('position')             
                req.user = user
                next()
            }
        })
        
    }else{
        return res.status(400).json({msg:'token need to provide'})
    }
    
}

module.exports = AuthMiddleware