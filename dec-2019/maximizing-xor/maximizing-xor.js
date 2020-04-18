
/*
{
    "type": "node",
    "request": "launch",
    "name": "maximizing-xor",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["maximizing-xor"]
}
*/

const maximizingXor = (l, r) => {

    // Convert l and r to binary string representation padded 32

    const binaryL = l.toString(2).padStart(32, 0);
    const binaryR = r.toString(2).padStart(32, 0);

    // iterate each character on the 2 strings until they are same
    let i = 0;
    while(i < 32) {

        // break when the characters differ
        if(binaryL[i] !== binaryR[i]) {
            break;
        }
        i++;
    }   

    // compute max xor based on the index and return
    return parseInt(Array(32 - i).fill(1).join(''), 2);
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const l = parseInt(readLine(), 10);
    const r = parseInt(readLine(), 10);
    let result = maximizingXor(l, r);
    return [result];
}

module.exports = {
    main: main
}

