
/*
{
    "type": "node",
    "request": "launch",
    "name": "triple-sum",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["triple-sum"]
}
*/
/*

1 3 5 7
5 7 9
7 9 11 13

b[i] = 5 => 0
b[i] = 7 => 4*1 = 4
b[i] = 9 => 4*2 = 8

12

*/

const getSmallerElementCount = (arr, searchVal) => {

    // Initialize and pointers
    let lo = -1
    let hi = arr.length;
    let mid = Math.floor((lo + hi) / 2);

    // while mid index is greater than lo index and smaller than hi index
    while(mid > lo && mid < hi) {
    
        // check if mid value is the search value then break
        if(arr[mid] === searchVal) {
            break;
        } else {

            // if mid value is greater than search value assign mid to hi
            if(arr[mid] > searchVal) {
                hi = mid;

            // Else assign mid to lo
            } else {
                lo = mid;
            }

            // Calculate new mid
            mid = Math.floor((lo + hi) / 2);
        }
    }

    // return mid + 1;  
    if(arr[mid] > searchVal) {
        return mid;
    } else {
        return mid + 1;
    }
}

function triplets(a, b, c) {

    const lenA = a.length;
    const lenB = b.length;
    const lenC = c.length;

    // Sort the a and b arrays
    const sortedA = a.sort((x,y) => x - y);
    const sortedB = b.sort((x,y) => x - y);
    const sortedC = c.sort((x,y) => x - y);

    // Initialize triplet counter
    let tripletCounter = 0;
    let prevB;

    // Iterate the values on Array b
    for(let i = 0; i < b.length; i++) {

        // Eliminate duplicates
        if(prevB && prevB === sortedB[i]) continue;

        // Find number of elements in a smaller than b[i]
        let countA = 0;
        while (sortedA[countA] <= sortedB[i] && countA < lenA) countA++;

        // Find number of elements in b smaller than b[i]
        let countC = 0;
        while (sortedC[countC] <= sortedB[i] && countC < lenC) countC++;

        // add product to triplet counter
        tripletCounter += countA * countC;
        prevB = sortedB[i];
    }

    // return triplet counter
    return tripletCounter;

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const lenaLenbLenc = readLine().split(' ');

    const lena = parseInt(lenaLenbLenc[0], 10);

    const lenb = parseInt(lenaLenbLenc[1], 10);

    const lenc = parseInt(lenaLenbLenc[2], 10);

    const arra = readLine().split(' ').map(arraTemp => parseInt(arraTemp, 10));

    const arrb = readLine().split(' ').map(arrbTemp => parseInt(arrbTemp, 10));

    const arrc = readLine().split(' ').map(arrcTemp => parseInt(arrcTemp, 10));

    const result = triplets(arra, arrb, arrc);
    return [result];
}

module.exports = {
    main: main
}

