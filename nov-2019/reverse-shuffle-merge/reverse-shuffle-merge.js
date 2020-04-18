function reverseShuffleMerge(s) {
    const charCountMap = new Map();
    const deleteCountMap = new Map();
    s.split('').forEach(ch => {
        if(charCountMap.has(ch)) {
            charCountMap.set(ch, charCountMap.get(ch) + 1);
        } else {
            charCountMap.set(ch, 1);
        }
    });

    Array.from(charCountMap.keys()).forEach(key => {
        const count = charCountMap.get(key) / 2;
        charCountMap.set(key, count);
        deleteCountMap.set(key, count);
    });

    const sortedChars = Array.from(charCountMap.keys()).sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0);
    })

    const lsArr = [];
    let tempArr = [];
    for(let i = s.length - 1; i >= 0 && lsArr.length * 2 <= s.length; i--) {
        const char = s.charAt(i);
        if(char === sortedChars[0]) {
            lsArr.push(char);
            charCountMap.set(char, charCountMap.get(char) - 1);
            while(charCountMap.get(sortedChars[0]) === 0) {
                sortedChars.shift();
            }
            tempArr = [];
        } else {
            if(deleteCountMap.get(char) > 0) {
                deleteCountMap.set(char, deleteCountMap.get(char) - 1);
                if(charCountMap.get(char) > 0) {
                    tempArr.push(char);
                }
            } else {
                while(tempArr.length > 0) {
                    const ch = tempArr.reduce((acc, curr) => {return acc < curr ? acc : curr});
                    if(ch < char) {
                        lsArr.push(ch);
                        charCountMap.set(ch, charCountMap.get(ch) - 1);
                        deleteCountMap.set(ch, deleteCountMap.get(ch) + 1);
                        tempArr.splice(0, tempArr.indexOf(ch) + 1);
                    } else {
                        tempArr = [];
                    }
                }
                lsArr.push(char);
                charCountMap.set(char, charCountMap.get(char) - 1);
            }
        }
    }
    return lsArr.join('');
}

let inputString = '';
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

function main(data) {
    inputString = data;
    const s = readLine();
    let result = reverseShuffleMerge(s);
    return [result];
}

module.exports = {
    main: main
}