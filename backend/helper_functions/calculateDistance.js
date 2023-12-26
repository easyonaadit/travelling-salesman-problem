const calculateDistance = (permutation, coordinates) => {
    let totalDistance = 0
    for(let i =0; i< permutation.length-1; i++){
        let dist = distanceBetweenCities(permutation[i], permutation[i+1], coordinates)
        // (index, index, array of objects)
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
    return Math.sqrt(Math.pow((city1.x - city2.x), 2) + Math.pow((city1.y - city2.y), 2))
}

const distanceBetweenCities = (city1, city2, coordinates) => {
    // (index, index, array of objects)
    let c1 = coordinates[city1]
    let c2 = coordinates[city2]
    return Math.sqrt(Math.pow((c1.x - c2.x), 2) + Math.pow((c1.y - c2.y), 2))

}


module.exports = {calculateDistance}

