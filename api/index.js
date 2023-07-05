const express = require('express')
const mongoose = require('mongoose')
const User = require("./models/User")
const jwt = require('jsonwebtoken')
const cors = require('cors')

require("dotenv").config()

mongoose.connect(process.env.MONGO_URL) 
const jwtSecret = process.env.JWT_SECRET

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use(express.json())

app.get("/test", (req,res) => {
    res.json('ok')
})

app.post("/register", async (req,res) => {
    const {username,password} = req.body
    const createdUSer = await User.create({username,password});
    jwt.sign({userId : createdUSer._id}, jwtSecret, {} , (err,token) => {
        if(err) throw err;
        res.cookie('token', token).status(201).json({id: createdUSer._id})
    })
})

app.listen(4000)