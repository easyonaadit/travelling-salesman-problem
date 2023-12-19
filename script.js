// const bodyx = document.getElementById('body')
// console.log(body)
const svg = document.getElementById('svg')
let index = 0;
const run = document.getElementById('run')
let count = 0; 

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
    node.setAttribute('class', 'node')
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
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

            line.id = i+"-"+j
            line.setAttribute('x1', node1.getAttribute('cx'))
            line.setAttribute('x2', node2.getAttribute('cx'))
            line.setAttribute('y1', node1.getAttribute('cy'))
            line.setAttribute('y2', node2.getAttribute('cy'))

            line.setAttribute('stroke', 'black')
            line.setAttribute('stroke-width', '4')
            

            // console.log(line)
            svg.appendChild(line)
            // console.log(nodes[i].getAttribute('pageX'))
            // line.attr('x1', nodes[i].getAttribute('pageX'))
        }
    }
}


run.addEventListener('click', ()=>{
    console.log("Running brute force TSP")
    const nodes = document.getElementsByClassName('node')
    let coordinates = []

    for(let i = 0; i< nodes.length; i++){
        let posX = nodes[i].getAttribute('cx')
        let posY = nodes[i].getAttribute('cy') 
        coordinates[i] = {X: posX, 
                            Y: posY}

    }
    // console.table(coordinates)
    // console.log(nodes)

    bruteForceTSP( coordinates)



})


const bruteForceTSP = coordinates =>{

    let length = coordinates.length
    let cities = []
    for(let i = 0; i< length; i++){
        cities[i] = i;

    }

    let allPermutations = []
    console.log(allPermutations)
    // let count = 0; 
    allPermutations = findAllPermutations([...cities], 0, length-1, allPermutations)
    console.log(allPermutations[0])
    console.log(allPermutations.length)
    console.log(allPermutations[0].length)

    let minDistance = 999999;
    let optimalPath = []

    for(let i = 0; i< allPermutations.length; i++){
        let distance = calculateDistance(allPermutations[i], coordinates)
        console.log("%c distance of ", 'color: #ff00ff', allPermutations[i], " is: ", distance)
        if(distance<minDistance)
        {
            console.log('%cinside if statement', 'color: #00ff00')
            minDistance = distance;
            optimalPath = allPermutations[i]
            console.log('%coptimal path', 'color: #00ff00', optimalPath)

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
        console.log("Calculate dist of (", permutation[i],", ", permutation[i+1],") is: ", dist)
        totalDistance = totalDistance + dist


    }
    console.log("Total distance of ", permutation," is: ", totalDistance)
    let startCity = coordinates[0];
    let endNode = permutation[permutation.length-1]
    let endCity = coordinates[endNode]
    console.log("Start City: ", startCity, "(", startCity.X,", ", startCity.Y,")")
    console.log("End City: ", endCity,"(", endCity.X,", ", endCity.Y, ")")
    // let finalDist = Math.sqrt(Math.pow((coordinates[0].X - coordinates[permutation[permutation.length-1]].X)) + Math.pow((coordinates[0].Y - coordinates[permutation[permutation.length-1]].Y)))
    let finalDist = startEndDistance(startCity, endCity)
    console.log("Final Distance of ", permutation," is: ", finalDist)


    totalDistance = totalDistance + finalDist

    console.log("%c TOTAL DISTANCE OF ", 'color: #ff0000', permutation, "is: ", totalDistance)

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



let factorial = length =>{
    if(length <= 1){
        return 1;
    }
    return length * factorial(length-1)

}

