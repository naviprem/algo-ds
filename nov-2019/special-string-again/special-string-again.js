function main(data) {
    inputString = data;
    const n = parseInt(readLine(), 10);
    const s = readLine();
    return [substrCount(n, s)];
}

let inputString = '';
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

// function isSpecial(subString) {
//     const subStringLen = subString.length;
//     const midIndex = subStringLen % 2 === 1 ? Math.floor(subStringLen / 2) : -1;
//     const firstChar = subString.charAt(0);
//     return subString.split('').find((c, charIndex) => {
//         if(charIndex === midIndex) return false;
//         else return c !== firstChar;
//     }) === undefined ? true : false;
// }

// function substrCount(n, s) {
//     const len = s.length;
//     let substringsCount = len;
//     for (let j = 2; j <= n; j++) {
//         for (let i = 0; i <= n - j; i++) {
//             substringsCount += isSpecial(s.substring(i, i + j)) ? 1 : 0;
//         }
//     }
//     return substringsCount;
// }

function substrCount(n, s) {
    const arr = s.split('');
    let subStringCounter = n;
    for (let i = 0; i < n; i++) {
        // If this char is in the middle of a palindrom of type xx.xx
        let offset = 1;
        while (i-offset >= 0 
            && i+offset < n 
            && arr[i-offset] === arr[i+offset] 
            && arr[i-offset] === arr[i-1]
            && arr[i+offset] === arr[i-1]) {
                subStringCounter++;
                offset++;
        }
        // If this char is the first char of a repeated sequence of characters
        let repeat = 0
        while (i+1 < n
            && arr[i] === arr[i+1]) {
                repeat++;
                i++;
        }
        subStringCounter += (repeat * (repeat + 1)) / 2;
    }
    return subStringCounter;
}

module.exports = {
    main: main
}