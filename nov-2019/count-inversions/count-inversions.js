
/*
{
    "type": "node",
    "request": "launch",
    "name": "count-inversions",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["count-inversions"]
}
*/
const swap = (arr, a, b) => {
    const [temp] = arr.splice(b, 1);
    arr.splice(a, 0, temp);
}

const countInversions = (arr) => {
    let swapCounter = 0;
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        if(arr[i - 1] > arr[i]) {
            let j = i - 1;
            while(arr[j] > arr[i] && j >= 0) {
                swapCounter++;
                j--;
            }
            swap(arr, j + 1, i);
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
    const resultArr = [];
    const t = parseInt(readLine(), 10);
    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);
        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
        const result = countInversions(arr);
        resultArr.push(result);
    }
    return resultArr;
}

module.exports = {
    main: main
}

