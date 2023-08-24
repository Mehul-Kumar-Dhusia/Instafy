const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const router = express.Router()

router.post('/register' , async (req , res) => {
    try{
        // Hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password , salt)

        // Creating the user
        const NewUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashPassword,
        })
        
        // Saving the user
        const user = await NewUser.save()
        res.status(200).json(user)

    }catch(err){
        console.log(err);
    }
})

router.post("/login" , async (req , res) => {
    try{
        const user = await User.findOne({email : req.body.email})
        !user && res.status(404).send("User not found")

        const validPassword = await bcrypt.compare(req.body.password , user.password) 
        !validPassword && res.status(404).send("Wrong password")

        res.status(200).json(user)
    }catch(err){
        console.log(err);
    }
})
module.exports = router