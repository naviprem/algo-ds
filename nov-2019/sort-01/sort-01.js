let inputString = '';
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

function main (data) {
    inputString = data;
    const n = parseInt(readLine(), 10);
    let unsorted = [];
    for (let i = 0; i < n; i++) {
        const unsortedItem = readLine();
        unsorted.push(unsortedItem);
    }
    return solution(unsorted);
}

function solution(unsorted) {
    return unsorted
    .sort((a, b) => {
        if(a.length != b.length) return a.length - b.length;
        else if(a.length < 100) return parseFloat(a) - parseFloat(b);
        else {
            const aDigits = a.split('');
            const bDigits = b.split('');
            return aDigits.reduce((acc, curr, i, arr) => {
                const diff = parseInt(curr) - parseInt(bDigits[i]);
                if(diff != 0) {
                    arr.splice(1)
                    return diff;
                }
                return acc;
            }, 0);
        }
    });
}

module.exports = {
    main: main
}

