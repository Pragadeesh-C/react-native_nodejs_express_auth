const express = require("express")
const AsyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userSchema")
const jwt = require('jsonwebtoken')

const registerUser  = AsyncHandler(async(req,res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already avaialble")
    }
    if(email.search('@')==-1){
        res.status(400)
        throw new Error("Please enter valid email address")
    }
    if(password.length < 8){
        res.status(400)
        throw new Error("Password should be of 8 characters minimum")
    }

    const hashedPassword = await bcrypt.hash(password,10)
    console.log("Hashed",hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    console.log(user)
    if(user){
        res.status(201).json({
            id:user.id,
            email:user.email
        })
    }
    else{
        res.status(404)
        throw new Error("User data is invalid")
    }
})  

const loginUser = AsyncHandler(async(req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email})
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user:{username:user.username,
            email:user.email,
            id:user.id,
            },
        },
        process.env.PRIVATE_KEY,
        {expiresIn:"15m"})
        res.status(200).json(accessToken)
    }
    else{
        res.status(401)
        throw new Error("Email or Password is incorrect")
    }
})

module.exports = {registerUser,loginUser}