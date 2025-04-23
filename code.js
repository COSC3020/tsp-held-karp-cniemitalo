function tsp_hk(distance_matrix) {
    let n = distance_matrix.length;  
    //matrices of length 1 or less have no path
    if (n <= 1) {
        return 0; 
    }

    let shortest = Infinity; 

    for (let start = 0; start < n; start++) {
        //for storing values 
        //fill cities with 0, 1, 2, ...
        let memo = new Map(); 
        let cities = [...Array(n).keys()]; 

        //find the shortest path for this starting point 
        let length = heldKarp(distance_matrix, start, cities, memo);

        //determine if its the shortest path in the entire matrix 
        if (length < shortest) {
            shortest = length; 
        } 
    }

    return shortest; 
}

function heldKarp(matrix, current, cities, memo) {
    //create unique key for current city for memoization 
    const key = JSON.stringify([cities.slice().sort(), current]); 

    //check if length has already been computed
    //return it's value if so  
    if (memo.has(key)) {
        return memo.get(key); 
    }

    //base case 
    if (cities.length === 2) {
        //find the last city and 
        let remainingCity = cities.find(c => c !== current); 
        let distance = matrix[current][remainingCity]; 
        memo.set(key, distance); 
        return distance; 
    }

    let min = Infinity; 

    //iterate through the remaining cities in the matrix 
    cities.forEach(next => {
        if (next !== current) {
            //remaining cities that aren't the current city 
            //find the shortest path of them 
            let remaining = cities.filter(c => c !== current); 
            let distance = matrix[current][next] + heldKarp(matrix, next, remaining, memo); 

            if (distance < min) {
                min = distance; 
            }
        }
    }); 

    //store the shorest path to save work later 
    //return the value 
    memo.set(key, min); 
    return min; 
}
