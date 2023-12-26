let count = 0

function permute(length, allPermutations){
    let cities = []
    for(let i = 0; i< length; i++){
        cities[i] = i;
    }
    count = 0;

    return findAllPermutations([...cities], 1, length-1, allPermutations)
}


const findAllPermutations = (cities, start, end, allPermutations) =>{
    // console.log("inside the function: ", allPermutations)
    if(start == end){
        allPermutations[count++] = cities.slice()
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

module.exports = {permute}