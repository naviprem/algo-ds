
/*
{
    "type": "node",
    "request": "launch",
    "name": "between-2-sets",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["between-2-sets"]
}
*/

const lcm = (arr) => {
    let divisor = 2;
    let factors = [];
    while (arr.length > 0) {
        const factor = arr.find(e => e % divisor === 0);
        if(factor !== undefined) {
            arr = arr.map(e => {
                if(e % divisor === 0) {
                    return e / divisor;
                } else {
                    return e;
                }
            }).filter(e => e > 1);
            factors.push(divisor);
        } else {
            divisor++;
        }
    }
    return factors.reduce((acc, curr) => acc * curr, 1);
}

const getTotalX = (a, b) => {
    const lenA = a.length;
    const lenB = b.length;

    const lcmA = lcm(a);
    const minB = b.reduce((acc, curr) => acc < curr ? acc : curr);

    if (lcmA > minB) return 0;

    let countX = 0;
    let currX = lcmA;
    while(currX <= minB) {
        const notAFactor = b.find(e => e%currX > 0);
        if(notAFactor === undefined) countX++;
        currX *= 2;
    }

    return countX;

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total = getTotalX(arr, brr);
    return [total];
}

module.exports = {
    main: main
}

