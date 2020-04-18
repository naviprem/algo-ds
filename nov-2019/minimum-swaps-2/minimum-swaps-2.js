
/*
{
    "type": "node",
    "request": "launch",
    "name": "minimum-swaps-2",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["minimum-swaps-2"]
}
*/

let swapCounter = 0;

const swap = (arr, i, j) => {
    if(i !== j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        swapCounter++;
    }
}


const minimumSwaps = (arr) => {   
    const minVal = arr.reduce((acc, curr) => acc < curr ? acc : curr); 
    if (minVal !== 0) {
        arr = arr.map(e => e - minVal);
    }
    
    for(let i = 0; i < arr.length; ) {
        if (arr[i] !== i) {
            swap(arr, arr[i], i);
        } else {
            i++
        }
    }
    return swapCounter;
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const n = parseInt(readLine(), 10);
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    let result = minimumSwaps(arr);
    return [result];
}

module.exports = {
    main: main
}

