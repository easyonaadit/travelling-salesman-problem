const express = require('express')
const cors = require('cors')
const { permute } = require('./helper_functions/permute')
const { calculateDistance } = require('./helper_functions/calculateDistance')
// import express from 'express'
// const bodyParser = require('body-parser')
// import Express from 'express'
// import bodyParser from 'body-parser'

const app = express()
app.use(express.json())
app.use(cors())
const port = 9876
let count = 0;
let optimalPath = []



app.get('/api/login', (req, res)=>{
    console.log(req.body)
    res.json({"message": "form submitted"})
})

app.get('/api', (req, res)=>{
    console.log("Server Started")
    
    res.json({"users": ["userone", "usertwo", "userthree"]})
})

app.post('/api',  async (req, res)=>{
    // console.log("post hit at server")
    // console.log('%cThis is the request body: ','color: #ff0000',req.body)
    console.log("This is req.body.nodes :",req.body.nodes)
    console.log("This is the first element",req.body.nodes[0])
    // console.log("This is the length",req.body.nodes.length)
    // console.log("These are the coordinates: ("+req.body.nodes[0].x+ ", "+req.body.nodes[0].y+ ")")
    count = 0;

    let length = req.body.nodes.length
    let minDistance = 999999;
    

    let allPermutations = []

    allPermutations = permute(length, allPermutations)

    // allPermutations = findAllPermutations([...cities], 1, length-1, allPermutations)
    // console.log(allPermutations)

    // res.json(allPermutations)
    // res.write(JSON.stringify({'hello':'world'}))

    // for(let i = 0; i< 999999999; i++){count++}
    // console.log("THIS IS AFTER THE RES>JSON()")

    // res.write(JSON.stringify({'world':'hello'}))
    // res.end()

    for(let i = 0; i< allPermutations.length; i++){
        let distance = calculateDistance(allPermutations[i], req.body.nodes)
        // console.log(allPermutations[i])
        
        // console.log("%c distance of ", 'color: #ff00ff', allPermutations[i], " is: ", distance)
        if(distance<minDistance)
        {
            // console.log('%cinside if statement', 'color: #00ff00')
            minDistance = distance;
            optimalPath = allPermutations[i]
            // console.log('%coptimal path', 'color: #00ff00', optimalPath)

        }

        

    }

    const values = {
        permutations: allPermutations,
        minDistance: minDistance,
        optimalPath: optimalPath
    }

    console.log("minimum distance is: ", minDistance)
    console.log("Optimal Path is: ", optimalPath)

    res.json(values)

})



app.get('/', (req, res) => {
    res.json({a: "Hello world"})
})

app.listen(port, ()=>{
    console.log("listing on port: ", port)
} )