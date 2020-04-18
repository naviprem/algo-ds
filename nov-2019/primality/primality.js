
/*
{
    "type": "node",
    "request": "launch",
    "name": "primality",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["primality"]
}
*/

function primality(n) {
    if([1, 2].includes(n)) {
        return 'Prime';
    } else if(n % 2 === 0) {
        return 'Not prime'
    } else {
        let maxFactor = Math.ceil(n / 3);
        for(let i = 3; i <= maxFactor; i += 2) {
            if(n % i === 0) {
                return 'Not prime'
            } else {
                maxFactor = Math.ceil(n/i);
            }
        }
    }
    return 'Prime';
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const p = parseInt(readLine(), 10);

    const result = [];
    for (let pItr = 0; pItr < p; pItr++) {
        const n = parseInt(readLine(), 10);

        result.push(primality(n));
    }
    return result;
}

module.exports = {
    main: main
}

