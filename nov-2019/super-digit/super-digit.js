
/*
{
    "type": "node",
    "request": "launch",
    "name": "super-digit",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["super-digit"]
}
*/

const rSuperDigit = (n) => {
    
    // if n is single digit, just return
    if(n.length === 1) {
        return n;
    } else {

        // Spilt and iterate through the digits and find sum of digits
        const sum = n.split('').reduce((acc, curr) => {
            return acc += parseInt(curr);
        }, 0)

        // return the super digit of sum
        return rSuperDigit(sum.toString());
    }   
}

const superDigit = (n) => {
    n = n.toString();
    const len = n.length;
    if(len === 1) {
        return n;
    } else if(len < 9) {
        return rSuperDigit(n);
    } else {
        let sum = 0;
        while(n.length > 0) {
            const subString = n.slice(0, 9);
            n = n.replace(subString, '');
            sum += parseInt(subString);
        }
        return rSuperDigit(sum.toString());
    }
}

// Complete the digitSum function below.
function digitSum(n, k) {

    // Find super digit of N
    const superDigitN = superDigit(n);

    const productK = parseInt(superDigitN) * k;

    if(productK > 9) {
        return superDigit(productK.toString());
    } else {
        return productK;
    }


}


let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const nk = readLine().split(' ');

    const n = nk[0];

    const k = parseInt(nk[1], 10);

    const result = digitSum(n, k);
    return [result];
}

module.exports = {
    main: main
}

