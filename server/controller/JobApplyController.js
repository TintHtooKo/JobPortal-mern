

const JobApplyController = {

    index : async(req,res) => {
        return res.json('index')
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

module.exports = JobApplyController