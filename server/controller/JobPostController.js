const JobPost = require('../model/JobPost')

const JobPostController = {
    index : async(req,res) => {
        try {
            let jobPost = await JobPost.find()
            return res.status(200).json(jobPost)
        } catch (error) {
            return res.status(500).json({message : error.message})
        }
    },

    create : async(req,res) => {
        return res.json('create')
    },

    detail : async(req,res) => {
        return res.json('detail')
    },

    update : async(req,res) => {
        return res.json('update')
    },

    delete : async(req,res)=>{
        return res.json('delete')
    }
}

module.exports = JobPostController