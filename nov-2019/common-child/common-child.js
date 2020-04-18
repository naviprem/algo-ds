

// const childLenMap = new Map();

// function commonChild(s1, s2, p1, p2, n) {
//     let childLen = 0;
//     if(p1 < n && p2 < n) {
//         const key = `${p1}:${p2}:${s1}:${s2}`;
//         if(childLenMap.has(key)) {
//             childLen = childLenMap.get(key);
//         } else {
//             while(p1 < n && p2 < n && s1.charAt(p1) === s2.charAt(p2)) {
//                 childLen++;
//                 p1++;
//                 p2++;
//             }
//             const branch1ChildLen = commonChild(s1, s2, p1 + 1, p2, n);
//             const branch2ChildLen = commonChild(s1, s2, p1, p2 + 1, n);
//             childLen += branch1ChildLen > branch2ChildLen ? branch1ChildLen : branch2ChildLen;
//             childLenMap.set(key, childLen);
//         }
//     } 
//     return childLen;
// }

function commonChild(s1, s2, p1, p2, n) {
    // Prep DP arrays
    const str1 = ' '.concat(s1);
    const str2 = ' '.concat(s2);

    // Create a nXn 2d array for DP, initialized with 0s on the first row and column
    const dpArr = Array.from(str1).map(e => Array.from(str1).fill(0));
    
    // 
    for(let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if(str1.charAt(i) === str2.charAt(j)) {
                dpArr[i][j] = dpArr[i-1][j-1] + 1
            } else {
                dpArr[i][j] = dpArr[i-1][j] > dpArr[i][j-1] ? dpArr[i-1][j] : dpArr[i][j-1];
            }
        }
    }

    return dpArr[n][n];

}


let inputString = '';
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

function main(data) {
    inputString = data;
    const s1 = readLine();
    const s2 = readLine();
    return [commonChild(s1, s2, 0, 0, s1.length)];
}

module.exports = {
    main: main
}

