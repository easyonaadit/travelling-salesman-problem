const express = require('express')
const cors = require('cors')
// import express from 'express'
// const bodyParser = require('body-parser')
// import Express from 'express'
// import bodyParser from 'body-parser'

const app = express()
app.use(express.json())
app.use(cors())
const port = 9876


app.get('/api/login', (req, res)=>{
    console.log(req.body)
    res.json({"message": "form submitted"})
})

app.get('/api', (req, res)=>{
    console.log("Server Started")
    
    res.json({"users": ["userone", "usertwo", "userthree"]})
})

app.post('/api', (req, res)=>{
    console.log("post hit at server")
    
    res.json({"one": ["1", "2", "3"],
"2": ["3", "4", "5"]})
})

app.get('/', (req, res) => {
    res.json({a: "Hello world"})
})

app.listen(port, ()=>{
    console.log("listing on port: ", port)
} )