
/*
{
    "type": "node",
    "request": "launch",
    "name": "ms-count-inversions",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["ms-count-inversions"]
}
*/

const merge = (arr, l, m, r) => {
    let inversionCounter = 0;
    let i = l;
    const tempArr1 = arr.slice(l, m+1);
    const tempArr2 = arr.slice(m + 1, r + 1);
    while(tempArr1.length > 0 && tempArr2.length > 0) {
        if(tempArr1[0] <= tempArr2[0]) {
            arr[i++] = tempArr1.shift()
        } else {
            inversionCounter += tempArr1.length;
            arr[i++] = tempArr2.shift();
        }
    }
    while(tempArr1.length > 0) {
        arr[i++] = tempArr1.shift()
    }

    while(tempArr2.length > 0) {
        arr[i++] = tempArr2.shift();
    }
    return inversionCounter;
}

const mergeSort = (arr, l, r) => {
    let inversionCounter = 0;
    if(l < r) {
        const mid = Math.floor((l + r)/2);
        inversionCounter += mergeSort(arr, l, mid);
        inversionCounter += mergeSort(arr, mid + 1, r);
        inversionCounter += merge(arr, l, mid, r);
    }
    return inversionCounter;
}

const msCountInversions = (arr) => {
    return mergeSort(arr, 0, arr.length)
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++].trim();
}

const main = (data) => {
    inputString = data;
    const resultArr = [];
    const t = parseInt(readLine(), 10);
    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);
        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
        const result = msCountInversions(arr);
        resultArr.push(result);
    }
    return resultArr;
}

module.exports = {
    main: main
}

