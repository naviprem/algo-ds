
/*
{
    "type": "node",
    "request": "launch",
    "name": "pairs",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["pairs"]
}
*/

function pairs(k, arr) {

    // Sort the array
    const sortedArr = arr.sort((a, b) => a - b);
    const len = arr.length;
    let pairsCounter = 0;

    // Iterate through the sorted array
    for(let i = 0; i < len; i++) {

        // Find the pair value
        const searchVal = k + sortedArr[i];
        

        // Binary search the pair value on the rest of the array
        // Initialize a pointers and pairs counter
        let lo = i + 1;
        let hi = len - 1;
        let mid = Math.floor((lo + hi) / 2);

        // While the mid pointer is greater than lo pointer and smaller than hi pointer
        while(mid > lo && mid < hi) {
            // Check if mid value is the search value
            if(sortedArr[mid] === searchVal) {

                // Increment pairs counter
                pairsCounter++;
                break;

            // Else if it the mid value is greater than search value, 
            } else {
                if(sortedArr[mid] > searchVal) {

                    // assign mid to hi
                    hi = mid;
                    mid = Math.floor((lo + hi) / 2);

                } else {

                    // else assign mid to lo
                    lo = mid;
                    mid = Math.floor((lo + hi) / 2);

                }
            }
        }
    }
    return pairsCounter;
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = pairs(k, arr);
    return [result];
}

module.exports = {
    main: main
}

