const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const UserRoute = require('./route/UserRoute')
const PositionRoute = require('./route/PositionRoute')
const ExperienceRoute = require('./route/ExperienceRoute')
const JobApplyRoute = require('./route/JobApplyRoute')
const JobPostRoute = require('./route/JobPostRoute')
const RoleRoute = require('./route/RoleRoute')
const cookieParser = require('cookie-parser')
const app = express()


mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`)
    })
}) 

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.get('',(req,res)=>{
    res.status(200).json({message : 'Server is good'})
})
app.use('/user',UserRoute)
app.use('/position',PositionRoute)
app.use('/role',RoleRoute)
app.use('/exp',ExperienceRoute)
app.use('/jobapply',JobApplyRoute)
app.use('/jobpost',JobPostRoute)

