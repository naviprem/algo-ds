
/*
{
    "type": "node",
    "request": "launch",
    "name": "test-pad",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["test-pad"]
}
*/

const testPad = () => {

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine();
    let result = testPad(s);
    return [result];
}

module.exports = {
    main: main
}

