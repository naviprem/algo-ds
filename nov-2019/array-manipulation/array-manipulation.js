
/*
{
    "type": "node",
    "request": "launch",
    "name": "array-manipulation",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["array-manipulation"]
}
*/

const arrayManipulation = (n, queries) => {
    const arr = Array(n + 1).fill(0);
    queries.forEach(q => {
        const [a, b, k] = q;
        arr[a] += k;
        arr[b + 1] -= k; 
    });

    let temp = 0;
    return arr.reduce((acc, curr) => {
        temp += curr;
        return temp > acc ? temp : acc;
    }, 0);
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    let result = arrayManipulation(n, queries);
    return [result];
}

module.exports = {
    main: main
}

