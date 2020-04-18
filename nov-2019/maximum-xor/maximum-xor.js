
/*
{
    "type": "node",
    "request": "launch",
    "name": "maximum-xor",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["maximum-xor"]
}
*/

class Node {
    constructor() {
        this.left;
        this.right;
        this.value;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    put(root, str, i, len) {

        // If the string index is not greater than string length
        if(i < len) {

            // If currBit is zero
            if(str[i] === '0') {
                if(root.left === undefined) {
                    root.left = new Node();
                }
                this.put(root.left, str, i + 1, len);
            // Else
            } else {
                if(root.right === undefined) {
                    root.right = new Node();
                }
                this.put(root.right, str, i + 1, len);
            }

        // Else, we have reached the leaf node. assign the integer string as value on this node
        } else {
            root.value = str;
        }
    }

    searchBestMatch(root, str, i, len) {
                // If the string index is not greater than string length
                if(i < len) {

                    // If currBit is zero
                    if(str[i] === '0') {
                        if(root.left === undefined) {
                            // We do not have a number with the desired bit
                            return this.searchBestMatch(root.right, str, i + 1, len);
                        } else {
                            return this.searchBestMatch(root.left, str, i + 1, len);
                        }

                    // Else
                    } else {
                        if(root.right === undefined) {
                            // We do not have a number with the desired bit
                            return this.searchBestMatch(root.left, str, i + 1, len);
                        } else {
                            return this.searchBestMatch(root.right, str, i + 1, len);
                        }
                    }
        
                // Else, we have reached the leaf node. return the value on this node
                } else {
                    return root.value;
                }
    }
}

function maxXor(arr, queries) {

    const bitLen = 32;

    // Initialize trie
    const trie = new Trie();
    
    // Insert all integers in arr into the trie
    arr.forEach(n => {

        // Convert n to base 2 and pad zeros to fill 32 bits
        const binaryN = n.toString(2).padStart(bitLen, 0);

        // Insert to trie
        trie.put(trie.root, binaryN, 0, bitLen);
    });

    // Find and store best matches for all queries
    // Return best matches
    return queries.map(q => {

        /*
        Bitwise NOT will give me the best XOR companion for the given query
        */

        // Convert Bitwise NOT of q to base 2 and pad zeros to fill 32 bits
        const binaryQ = q.toString(2).padStart(bitLen, 0).split('')
        .map(c => c === '0' ? '1' : '0').join('');

        const bestMatch = trie.searchBestMatch(trie.root, binaryQ, 0, bitLen);

        return parseInt(bestMatch, 2) ^ q;
    });
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const m = parseInt(readLine(), 10);

    let queries = [];

    for (let i = 0; i < m; i++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    const result = maxXor(arr, queries);
    return result;
}

module.exports = {
    main: main
}

