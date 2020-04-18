
/*
{
    "type": "node",
    "request": "launch",
    "name": "backtrack-for-substrings",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["backtrack-for-substrings"]
}
*/

// Prints all subsequences
const backtrackSubsequence = (s, substr, lo, hi) => {
    if(lo <= hi) {
        console.log(substr.join(''));
        for(let i = lo; i < hi; i++) {
            substr.push(s[i])
            backtrackSubsequence(s, substr, i + 1, hi);
            substr.pop();
        }
    } 
}

// Only recursive
// const recursiveSubsequence = (s, substr, i, n) => {
//     if(i === n) {
//         console.log(substr.join(''));
//         return;
//     }
//     const len = substr.length;
//     recursiveSubsequence(s, substr, i + 1, n);
//     substr.splice(len)
//     substr.push(s[i]);
//     recursiveSubsequence(s, substr, i + 1, n);
// }

// Non recursive function to print all subsequence
// const nonRecursiveSubsequence = (s) => {
//     const output = [];

//     for(let i = s.length - 1; i >= 0; i--) {
//         const outputLen = output.length;
//         output.push(s[i]);
//         console.log(s[i]);
//         for(let j = 0; j < outputLen; j++) {
//             output.push(s[i] + output[j]);
//             console.log(s[i] + output[j]);
//         }
//     }
// }

// Print all permutations
const backtrackPermutations = (s, substr, options, lo, hi) => {
    if(options.length === 0) {
        console.log(substr.join(''));
    }
    if(lo <= hi) {
        for(let i = 0; i < options.length; i++) {
            substr.push(options.splice(i, 1));
            backtrackPermutations(s, substr, options, i + 1, hi);
            options.splice(i, 0, substr.pop());
        }
    }  
}


const substrings = (s) => {
    const results = [];
    backtrackSubsequence(s, [], 0, s.length);
    // recursiveSubsequence(s, [], 0, s.length)
    // nonRecursiveSubsequence(s);
    // backtrackPermutations(s, [], s.split(''), 0, s.length);

    return results;
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine();
    let result = substrings(s);
    return [result];
}

module.exports = {
    main: main
}

