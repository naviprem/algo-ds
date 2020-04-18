

let inputString = '';
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

function main(data) {
    inputString = data
    const q = parseInt(readLine(), 10);
    const result = [];
    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();
        result.push(sherlockAndAnagrams(s));
    }
    return result;
}

function sherlockAndAnagrams(s) {
    const n = s.length;
    const arr = s.split('')
    const anagramCountMap = new Map();
    let pairsCount = 0;
    for (let j = 1; j < n; j++) {
        for (let i = 0; i <= n-j; i++) {
            const key = arr.slice(i, i + j).sort().join('');
            anagramCountMap.has(key) ? anagramCountMap.set(key, anagramCountMap.get(key) + 1) : anagramCountMap.set(key, 1);
        }
    }
    Array.from(anagramCountMap.values()).forEach(count => {
        if(count === 2) pairsCount += 1;
        else if (count > 2) pairsCount += (count * (count - 1)) / 2;
    })
    return pairsCount;
}

module.exports = {
    main: main
}