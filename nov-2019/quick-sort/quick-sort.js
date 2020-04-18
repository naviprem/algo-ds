
/*
{
    "type": "node",
    "request": "launch",
    "name": "quick-sort",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["quick-sort"]
}
*/

const swap = (arr, i, j) => {
    if(i !== j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

const partition = (arr, l, r) => {
    let len = arr.length;
    let pi = l;
    let i = l + 1;
    let j = r;

    while (true) {
        while (i <= j && arr[i] <= arr[pi]) i++;
        while (i <= j && arr[j] >= arr[pi]) j--;
        if (i < j) {
            swap (arr, i, j);
        } else {
            break;
        }
    }
    swap(arr, j, pi);
    return j;

}

const quickSort = (arr, l, r) => {
    if(l < r) {
        const pi = partition(arr, l, r);
        quickSort(arr, l, pi - 1);
        quickSort(arr, pi + 1, r);
    }
    return arr;
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
    let result = quickSort(arr, 0, n - 1);
    return [result];
}

module.exports = {
    main: main
}

