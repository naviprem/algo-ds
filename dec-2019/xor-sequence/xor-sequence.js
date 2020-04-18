
/*
{
    "type": "node",
    "request": "launch",
    "name": "xor-sequence",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["xor-sequence"]
}
*/

// const xorSequence = (l, r) => {
//     let series1 = 0;
//     let series2 = 0;
//     for (let i = 1; i < 100; i++) {
//         series1 ^= i;
//         series2 ^= series1;
//         console.log(i, '\t', i.toString(2), '\t', series1, '\t', series1.toString(2), '\t', series2, '\t', series2.toString(2) );
//     }
//     return l;
// }

const xorSum = (i) => {
    let sum = 0;
        switch(i % 8) {
            case 0:
            case 1: 
                sum = i;
                break;
            case 2:
            case 3:
                sum = 2;
                break;
            case 4:
            case 5:
                sum = i + 2;
                break;
        }
    return sum;
}

function xorSequence(l, r) {
    return xorSum(r) ^ xorSum(l-1);
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const q = parseInt(readLine(), 10);
    const result = [];
    for (let qItr = 0; qItr < q; qItr++) {
        const lr = readLine().split(' ');

        const l = parseInt(lr[0], 10);

        const r = parseInt(lr[1], 10);

        result.push(xorSequence(l, r));
    }
    return result;
}

module.exports = {
    main: main
}

