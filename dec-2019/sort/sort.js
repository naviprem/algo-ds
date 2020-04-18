
/*
{
    "type": "node",
    "request": "launch",
    "name": "sort",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["sort"]
}
*/

const quickSort = (array) => {
    rQuickSort(array, 0, array.length - 1);
    return array;
}

const rQuickSort = (array, lo, hi) => {
    const partitionIndex = partition(array, lo, hi);
    if(lo < partitionIndex - 1) {
        rQuickSort(array, lo, partitionIndex - 1);
    }
    if(hi > partitionIndex + 1) {
        rQuickSort(array, partitionIndex + 1, hi);
    }
}

const partition = (array, lo, hi) => {
    const partitionKey = array[lo];
    let i = lo;
    let j = hi + 1;
    while(true) {
        while(array[++i] < partitionKey) 
            if(i == hi)
                break;
        while(array[--j] > partitionKey)
            if(j == lo)
                break;
        if(i >= j) 
            break;
        swap(array, i, j);
    }
    swap(array, lo, j);
    return j;
}

const insertionSort = (array) => {
    const len = array.length;
    if(len <= 1) {
        return array;
    }
    for(let i = 1; i < len; i++) {
        const insertionIndex = binarySearch(array, -1, i, array[i]);
        if(i !== insertionIndex) {
            insert(array, insertionIndex, i);
        }
    }
    return array;
}

const insert = (array, to, from) => {
    const temp = array[from];
    for(let i = from; i >= to; i--) {
        array[i] = array[i - 1];
    }
    array[to] = temp;
}

const binarySearch = (array, lo, hi, key) => {
    let mid = Math.floor((lo + hi) / 2);
    while(mid > lo && mid < hi) {
        if(array[mid] === key) {
            return mid;
        }
        if(array[mid] > key) {
            hi = mid;
        } else {
            lo = mid;
        }
        mid = Math.floor((lo + hi) / 2);
    }
    return hi;
}

const selectionSort = (array) => {
    const len = array.length;
    let minIndex = 0;
    for(let i = 0; i < len; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if(array[minIndex] > array[j]) {
                minIndex = j;
            }
        }
        swap(array, minIndex, i);
    }
    return array;
}

const swap = (array, a, b) => {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine().split(',').map(e => parseInt(e));
    // let result = selectionSort(s);
    // let result = insertionSort(s);
    let result = quickSort(s);
    return [result];
}

module.exports = {
    main: main
}

