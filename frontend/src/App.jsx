import { useEffect, useState } from 'react'
import ViewBox from './viewBox'

// "proxy": "https://localhost:9876",

const getNodes = () => {
    console.log("Hello world")
    // useEffect(()=>{})
    const fetchedNodes = document.getElementsByClassName('node')
    console.log("%cThis is the fetched nodes",'color: #ff0000',fetchedNodes)
    return fetchedNodes

  }

const getCoordinates = nodesList =>{
  // console.log(nodesList)
  const coords = []
  Array.from(nodesList).map(node => {
    let xCoordinate = node.getAttribute('cx')
    let yCoordinate = node.getAttribute('cy')
    coords.push({x: xCoordinate, y: yCoordinate})
  })
  return coords
}

function App() {
  const [backendDate, setBackendData] = useState([{}])
  useEffect(()=>{
      fetch('http://localhost:9876/api')
      .then(res => {
        if(res.ok){console.log("Success")}
        else {console.log("fail")}
         return res.json()
        })
      .then(data => {setBackendData(data)
      console.log("%cData is: ",'color: #00ff00', data)})
      .catch(err => console.log(err))
    }, [])
  
  function handleTSP(){
    const nodesList = getNodes()
    const nodeCoordinates = getCoordinates(nodesList)
    console.log(nodeCoordinates.length)
    const temp = {nodes: nodeCoordinates}
    // console.log(nodeCoordinates[0].getAttribute('cx'))

    fetch('http://localhost:9876/api', {
      method: "POST", 
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify()
    }).then( response => {

      if(response.ok){console.log("Fetch Success")}
      else {console.log("Fetch fail")}
      return response.json()
    })
    .then(data => {console.log("%cThis is the fetched data", 'color: #0000ff',data)})
    .catch(err => console.log(err))

    

    // fetch('http://localhost:6000/api/login', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type" : "application/json"
    //   },
    //   body: JSON.stringify({temp: "Hello world, this is temp"})
    // }).then( response => {
    //   if(response.ok){
    //     console.log("%cSuccess", 'color: #00ff00')
    //   }
    //   else{
    //     console.log("%cFaliure", 'color: #ff0000')
    //   }
    //   response.json()})
    // .then(data => console.log(data))
    // .catch(err => console.log(err))

  }

  return (
    <>
        <header>
        <h1>Travelling Salesman Problem</h1>
        <button id="run" onClick={handleTSP}>Run</button>
    </header>
    <ViewBox />
    
    </>
  )
}



export default App
