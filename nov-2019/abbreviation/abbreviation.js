
function isUpperCase(c) {
    return c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90;
}

function abbreviation(a, b) {
    const aLen = a.length;
    const bLen = b.length;
    const aStr = ' '.concat(a);
    const bStr = ' '.concat(b);

    dpArr = Array.from(aStr).map(c => Array.from(bStr).fill(false));
    dpArr[0][0] = true;
    for (let col = 1; col <= aLen; col++) {
        dpArr[col][0] = !isUpperCase(aStr.charAt(col));
    }

    for(let col = 1; col <= aLen; col++) {
        for(let row = 1; row <= bLen; row++) {
            if(aStr.charAt(col) === bStr.charAt(row)) {
                dpArr[col][row] = dpArr[col-1][row-1];
            } else if(isUpperCase(aStr.charAt(col))) {
                dpArr[col][row] = false;
            } else if(aStr.charAt(col).toUpperCase() === bStr.charAt(row)) {
                dpArr[col][row] = dpArr[col-1][row-1] || dpArr[col-1][row];
            } else {
                dpArr[col][row] = dpArr[col-1][row];
            }
        }
    }

    return dpArr[aLen][bLen] ? 'YES' : 'NO';
}

let inputString = '';
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

function main(data) {
    inputString = data;
    const q = parseInt(readLine(), 10);
    const result = [];
    for (let qItr = 0; qItr < q; qItr++) {
        const a = readLine();
        const b = readLine();
        
        result.push(abbreviation(a, b))
    }
    return result;
}

module.exports = {
    main: main
}