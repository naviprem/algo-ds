
/*
{
    "type": "node",
    "request": "launch",
    "name": "no-prefix-set",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["no-prefix-set"]
}
*/

const TrieNode = class {
    constructor() {
        this.isLeafNode = false;
        this.children = [];
    }
}

const Trie = class {
    constructor() {
        this.root = new TrieNode();
    }

    add(str) {
        let root = this.root;
        let newNodeFlag = false;
        for(let i = 0; i < str.length; i++) {
            const chIndex = str.charCodeAt(i) - 97;
            if(root.isLeafNode) {
                return false;
            } else if(root.children[chIndex] === undefined) {
                newNodeFlag = true;
                root.children[chIndex] = new TrieNode();
            }
            root = root.children[chIndex];
        }
        if(!newNodeFlag) {
            return false;
        }
        root.isLeafNode = true;
        return true;
    }
}

const noPrefix = (queries) => {
    const trie = new Trie();
    for(let i = 0; i < queries.length; i++) {
        if(!trie.add(queries[i])) {
            console.log('BAD SET');
            console.log(queries[i]);
            return;
        }
    }
    console.log('GOOD SET');
}


let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const queriesRows = parseInt(readLine(), 10);

    let queries = Array(queriesRows);

    for (let queriesRowItr = 0; queriesRowItr < queriesRows; queriesRowItr++) {
        queries[queriesRowItr] = readLine();
    }

    let result = noPrefix(queries);
    return [result];
}

module.exports = {
    main: main
}

