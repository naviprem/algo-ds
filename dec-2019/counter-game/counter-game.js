
/*
{
    "type": "node",
    "request": "launch",
    "name": "counter-game",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["counter-game"]
}
*/

function counterGame(n) {

    //Edge case
    if(n <= 0) return 0;

    // Get the binary string of n
    const binaryN = n.toString(2);
    const len = binaryN.length

    // count trailing zeros
    let trailingZeroCount = 0;
    let i = len -1;
    while(i >= 0 && binaryN[i] === '0') {
        trailingZeroCount++
        i--
    }

    // count the 1s
    const onesCount = binaryN.split('').reduce((acc, curr) => curr === '1' ? acc + parseInt(curr) : acc, 0);

    // compute total of trailing zeros and 1s minus 1
    // if total is odd return louise else richard

    // console.log(onesCount, trailingZeroCount);
    return (onesCount + trailingZeroCount - 1) % 2 === 0 ? 'Richard' : 'Louise';

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const t = parseInt(readLine(), 10);
    const result = [];
    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);
        result.push(counterGame(n));
    }
    return result;
}

module.exports = {
    main: main
}

