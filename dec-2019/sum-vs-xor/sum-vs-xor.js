
/*
{
    "type": "node",
    "request": "launch",
    "name": "sum-vs-xor",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["sum-vs-xor"]
}
*/

const sumXor = (n) => {
    
    return Math.pow(2, n.toString(2).split('').reduce((acc, curr) => curr === '0' ? acc + 1 : acc, 0));

    // for(let j = 0; j < n; j++) {
    //     let ctr = 0;
    //     for(let i = 0; i <= j; i++) {
    //         // console.log(
    //         //     n.toString().padStart(2, 0), 
    //         //     n.toString(2).padStart(7, 0), 
    //         //     i.toString().padStart(2, 0), 
    //         //     i.toString(2).padStart(7, 0), 
    //         //     (i+n).toString().padStart(2, 0), 
    //         //     (i+n).toString(2).padStart(7, 0), 
    //         //     (i^n).toString().padStart(2, 0),
    //         //     (i^n).toString(2).padStart(7, 0)
    //         //     );
    //         if((i+j) === (i^j)) {
    //             ctr++;
    //         }
    //     }
    //     console.log(j, j.toString(2).padStart(8, 0), ctr);
    // }
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const n = parseInt(readLine().trim(), 10);
    const result = sumXor(n);
    return [result];
}

module.exports = {
    main: main
}

