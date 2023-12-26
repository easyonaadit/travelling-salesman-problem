import { useEffect, useState } from 'react'
import ViewBox from './viewBox'
import './styles/App.css'

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
    console.log("These are Node Coordinates: ",nodeCoordinates)
    const temp = {nodes: nodeCoordinates}

    fetch('http://localhost:9876/api', {
      method: "POST", 
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(temp)
    }).then( response => {

      if(response.ok){console.log("Fetch Success")}
      else {console.log("Fetch fail")}
      return response.json()
    })
    .then(data => {
      console.log("%cThis is the fetched data", 'color: #0000ff',data); 
    // returnValues.minDistance = data.minDistance
    // returnValues.optimalPath = data.optimalPath
    // returnValues.permutations = data.permutations
  
    handleUI(data, nodeCoordinates)
  })
  .catch(err => console.log(err))
  }

  function handleUI(data, nodeCoordinates){
    console.log(data)
    const nodes = document.getElementsByClassName('node')
    const lines = document.getElementsByClassName('line')

    for(let i = 0; i< nodes.length; i++){
       
        nodes[i].setAttribute('class', 'node active-node')

    }

    let allPermutations = data.permutations

    let k = 0
    const output = setInterval(() => {
        // colourLines(allPermutations[i++])
        // console.log(k++)
        // console.log('all permutations length: ', allPermutations.length)
        let selectedLines = []
        let nextSelectedLines = []
        for(let j = 0; j< allPermutations[k].length-1; j++){
            let linePart1 = allPermutations[k][j]
            let linePart2 = allPermutations[k][j+1]
            let nextLine1 
                let nextLine2 
            if(k < allPermutations.length-1){

                nextLine1 = allPermutations[k+1][j]
                nextLine2 = allPermutations[k+1][j+1]
            }
            let lineID = ''
            let nextLineID = ''
            if(linePart1 < linePart2){
                lineID = linePart1 + "-" + linePart2
            }
            else{
                lineID = linePart2 + "-" + linePart1
            }
            selectedLines.push(lineID)

            //THIS PART IS FOR THE NEXT LINE
            if(k < allPermutations.length-1){

                if(nextLine1 < nextLine2){
                    nextLineID = nextLine1 + "-" + nextLine2
                }
                else{
                    nextLineID = nextLine2 + "-" + nextLine1
                }
                nextSelectedLines.push(nextLineID)
            }
            // let changeLineAttribute = document.getElementById(lineID)
            // console.log(changeLineAttribute)


        }
        let lastnode = allPermutations[k].length-1
        console.log(lastnode)
        selectedLines.push("0-"+allPermutations[k][allPermutations[k].length-1])
        selectedLines.forEach(element => {

            // element.setAttribute('class', 'line active-line')
            // console.log(document.getElementById(element))
            document.getElementById(element).setAttribute('class', 'line active-line')
        });

        setTimeout(() => {
            selectedLines.forEach(element => {

                if(!nextSelectedLines.includes(element)){

                    document.getElementById(element).setAttribute('class', 'line')
                }

                // element.setAttribute('class', 'line active-line')
                // console.log(document.getElementById(element))
            });
        }, 100);
        
        k++;
        if(k == allPermutations.length){
            clearInterval(output)
            for(let i = 0; i< lines.length; i++){
       
        lines[i].setAttribute('class', 'line')

    }
            setOptimalPath(data.optimalPath, lines)
        }
    }, 200);
    // console.log("These are the UI nodes: ", nodes)
    // console.log("These are the UI Lines: ", lines)

  }

  const setOptimalPath = (optimalPath, lines) => {
    let optimalLines = []
    let length = optimalPath.length
    for(let j = 0; j< length-1; j++){
            let linePart1 = optimalPath[j]
            let linePart2 = optimalPath[j+1]
            
            let lineID = ''
            if(linePart1 < linePart2){
                lineID = linePart1 + "-" + linePart2
            }
            else{
                lineID = linePart2 + "-" + linePart1
            }
            optimalLines.push(lineID)
          }
          let lineID = '0-'+optimalPath[length-1]
          optimalLines.push(lineID)
          console.log(optimalLines)
          
          for(let i = 0; i< optimalLines.length; i++){
            console.log(document.getElementById(optimalLines[i]))
            document.getElementById(optimalLines[i]).setAttribute('class', 'line active-line')
            // document.getElementById(optimalLines[i]).setAttribute('stroke', 'rgb(0, 0, 255)')
       
        // lines[i].setAttribute

    }
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
