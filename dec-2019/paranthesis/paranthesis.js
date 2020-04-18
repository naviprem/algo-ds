
/*
{
    "type": "node",
    "request": "launch",
    "name": "paranthesis",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["paranthesis"]
}
*/

const rGenerateParanthesis = (a, ai, n, m, completePStr) => {
    if(n === 0 && m === 0) {
        completePStr(a.join(''));
        console.log(a);
    } else {
        if(n > 0) {
            a[ai] = '(';
            rGenerateParanthesis(a, ai + 1, n - 1, m + 1, completePStr)
        }
        if(m > 0) {
            a[ai] = ')';
            rGenerateParanthesis(a, ai + 1, n, m - 1, completePStr)
        }
    }
}

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const output = [];
    let currentIndex = 0;
    rGenerateParanthesis(
        [], 0, n, 0, 
        (pStr) => {
            output[currentIndex++] = pStr;
        }
    );
    
    return output;
};

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine();
    let result = generateParenthesis(s);
    return [result];
}

module.exports = {
    main: main
}

