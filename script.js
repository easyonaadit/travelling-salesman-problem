// const bodyx = document.getElementById('body')
// console.log(body)
const svg = document.getElementById('svg')
let index = 0;
const run = document.getElementById('run')
let count = 0; 
let hashtable = []
let firstNode = 0
let optimalPath = []

body.addEventListener('click', (e)=>{
    console.log('clicked the div')
    // console.log(e)
    // console.log(e.clientX + ' ' + e.clientY)  //i think this gives the absolute position of the mouse on the screen
    let div = document.createElement('div')
    // let node = document.createElement('circle')
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    let posX = ((e.pageX)/1500)*1500 
    let posY = ((e.pageY)/892)*892
    posX = (e.pageX/window.innerWidth) * 1500
    posY = (e.pageY/window.innerHeight) * 892
    // div.className = 'node'
    // node.setAttribute('cx', e.pageX)
    // node.setAttribute('cy', e.pageY)
    node.setAttribute('cx', e.pageX)
    node.setAttribute('cy', e.pageY)
    node.setAttribute('r', '13')
    if(firstNode == 0){
        node.setAttribute('class', 'node active-node')
        firstNode++
    }
    else{
        node.setAttribute('class', 'node')

    }
    // console.log(e.pageX)
    // console.log(e.pageY)
    // console.log(e.pageX+', '+e.pageY)
    // console.log(e.pageY)

    
    node.setAttribute('id', 'node'+index)
    index++
    
    // div.style.position = 'relative'
    div.style.left = e.pageX+"px"
    div.style.top = e.pageY+"px"
    // console.log(div)
    // document.body.appendChild(div)
    // document.body.appendChild(node)
    svg.appendChild(node)
    // console.log(document.getElementById('node1'))
    drawLines()
})

const drawLines = () =>{
    const nodes = document.getElementsByClassName('node')
    // console.table(nodes)
    // Array.of(nodes).forEach((node, index) => {
    //     console.log(node)
    //     console.log(index)
    // })
    // console.log(nodes[0])
    // [...nodes].forEach(node => {
    //     console.log(node, index)
        
    // });
    // console.log(nodes[0].getAttribute('cx'))

    for(let i=0; i<nodes.length; i++){
        let node1 = nodes[i]
        // let position1 = node1.getBoundingClientRect()
        for(let j = i+1; j<nodes.length; j++){
            let node2 = nodes[j]
            // let position2 = node2.getBoundingClientRect()
            // console.log(node1)
            // console.log(position1.left)
            // console.log(node2)
            // let line = document.createElement('svg')
            // let check = i+"-"+j;
            if(!hashtable.includes(i+"-"+j)){

                let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                
                line.id = i+"-"+j
                line.setAttribute('x1', node1.getAttribute('cx'))
                line.setAttribute('x2', node2.getAttribute('cx'))
                line.setAttribute('y1', node1.getAttribute('cy'))
                line.setAttribute('y2', node2.getAttribute('cy'))
                
                line.setAttribute('stroke', 'black')
                line.setAttribute('stroke-width', '4')
                line.setAttribute('class', 'line')
                // line.setAttribute('class', 'line test-class')
                
                
                
                // console.log(line)
                svg.appendChild(line)
                hashtable.push(i+"-"+j)
            }
            // console.log(nodes[i].getAttribute('pageX'))
            // line.attr('x1', nodes[i].getAttribute('pageX'))
        }
    }
}


run.addEventListener('click', ()=>{
    console.log("Running brute force TSP")
    const nodes = document.getElementsByClassName('node')
    let coordinates = []
    // console.table(document.getElementsByClassName('node'))

    for(let i = 0; i< nodes.length; i++){
        let posX = nodes[i].getAttribute('cx')
        let posY = nodes[i].getAttribute('cy') 
        coordinates[i] = {X: posX, 
                            Y: posY}
        // console.log(nodes[i])
        nodes[i].setAttribute('class', 'node active-node')

    }
    // console.table(document.getElementsByClassName('node'))
    // console.table(document.getElementsByClassName('active-node'))
    // console.table(coordinates)
    // console.log(nodes)

    bruteForceTSP(coordinates)



})


const bruteForceTSP = coordinates =>{

    let length = coordinates.length
    let cities = []
    for(let i = 0; i< length; i++){
        cities[i] = i;

    }

    let allPermutations = []
    // console.log(allPermutations)
    // let count = 0; 
    allPermutations = findAllPermutations([...cities], 1, length-1, allPermutations)
    // console.log(allPermutations[0])
    // console.log(allPermutations.length)
    // console.log(allPermutations[0].length)

    let minDistance = 999999;
    
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
            setFinalPath()
        }
    }, 200);
    

    for(let i = 0; i< allPermutations.length; i++){
        let distance = calculateDistance(allPermutations[i], coordinates)
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

    console.log("minimum distance is: ", minDistance)
    console.log("Optimal Path is: ", optimalPath)


}

const findAllPermutations = (cities, start, end, allPermutations) =>{
    // console.log("inside the function: ", allPermutations)
    if(start == end){
        allPermutations[count++] = cities
    }
    for(let i = start; i <= end; i++){
        let temp = cities[start]
        cities[start] = cities[i]
        cities[i] = temp
        
        findAllPermutations([...cities], start+1, end, allPermutations)

        temp = cities[start]
        cities[start] = cities[i]
        cities[i] = temp


    }

    return allPermutations
}

const calculateDistance = (permutation, coordinates) => {
    let totalDistance = 0
    for(let i =0; i< permutation.length-1; i++){
        let dist = distanceBetweenCities(permutation[i], permutation[i+1], coordinates)
        // console.log("Calculate dist of (", permutation[i],", ", permutation[i+1],") is: ", dist)
        totalDistance = totalDistance + dist


    }
    // console.log("Total distance of ", permutation," is: ", totalDistance)
    let startCity = coordinates[0];
    let endNode = permutation[permutation.length-1]
    let endCity = coordinates[endNode]
    // console.log("Start City: ", startCity, "(", startCity.X,", ", startCity.Y,")")
    // console.log("End City: ", endCity,"(", endCity.X,", ", endCity.Y, ")")
    // let finalDist = Math.sqrt(Math.pow((coordinates[0].X - coordinates[permutation[permutation.length-1]].X)) + Math.pow((coordinates[0].Y - coordinates[permutation[permutation.length-1]].Y)))
    let finalDist = startEndDistance(startCity, endCity)
    // console.log("Final Distance of ", permutation," is: ", finalDist)


    totalDistance = totalDistance + finalDist

    // console.log("%c TOTAL DISTANCE OF ", 'color: #ff0000', permutation, "is: ", totalDistance)

    return totalDistance

}

const startEndDistance = (city1, city2) =>{
    return Math.sqrt(Math.pow((city1.X - city2.X), 2) + Math.pow((city1.Y - city2.Y), 2))
}

const distanceBetweenCities = (city1, city2, coordinates) => {
    let c1 = coordinates[city1]
    let c2 = coordinates[city2]
    return Math.sqrt(Math.pow((c1.X - c2.X), 2) + Math.pow((c1.Y - c2.Y), 2))

}


const setFinalPath = () =>{
    console.log(optimalPath)
    // optimalPath.push(0)

    let selectedLines = []
    for(let j = 0; j< optimalPath.length-1; j++){
        let linePart1 = optimalPath[j]
        let linePart2 = optimalPath[j+1]
        let lineID = ''
        //use ternary operator for this!!!
        if(linePart1 < linePart2){
            lineID = linePart1 + "-" + linePart2
        }
        else{
            lineID = linePart2 + "-" + linePart1
        }
        selectedLines.push(lineID)
        console.log("%cTHE LINE ID IS: ", 'color: #0000ff', lineID)
    }
    console.table('%cTHIS IS THAT TABLE','color: #00ff00', selectedLines)

    const listOfAllLines = document.getElementsByClassName('line')
    console.log("Before",listOfAllLines)
    console.log(listOfAllLines.length)
            // console.log(listOfAllLines[0])
    for(let i = 0; i< listOfAllLines.length; i++){
        console.log(i)
        console.log("%call lines at ",'color: #ff0000' , i, listOfAllLines[i])
        // listOfAllLines[i].setAttribute('class', 'line')
        listOfAllLines[i].classList.baseVal = 'line'
        console.log("%call lines at ",'color: #ff0000' , i, listOfAllLines[i])
    }
    console.log("After",listOfAllLines)

            // let lastnode = allPermutations[k].length-1
        // console.log(lastnode)
    selectedLines.push("0-"+optimalPath[optimalPath.length-1])

    console.log('%cTHESE ARE THE SELECTED LINES', 'color: #66ff11')
    console.log(selectedLines)



    selectedLines.forEach(element => {

                // element.setAttribute('class', 'line active-line')
                // console.log(document.getElementById(element))
        let someLine = document.getElementById(element)
        console.log(someLine)
        // someLine.setAttribute('class', 'line active-line')
        someLine.classList.baseVal = 'active-line'
                // document.getElementById(element).setAttribute('class', 'line active-line')
            });
            selectedLines.forEach(line => {
            console.log("After adding the active class",document.getElementById(line))

        })

        console.log("After",listOfAllLines)


}