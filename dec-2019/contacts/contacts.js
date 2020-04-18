
/*
{
    "type": "node",
    "request": "launch",
    "name": "contacts",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["contacts"]
}
*/

const TrieNode = class {
    constructor() {
        this.count = 0;
        this.children = [];
    }
}

const Trie = class {
    constructor() {
        this.root = new TrieNode();
    }

    add(str) {
        let root = this.root;
        for(let i = 0; i < str.length; i++) {
            const chIndex = str.charCodeAt(i) - 97;
            if(root.children[chIndex] === undefined) {
                root.children[chIndex] = new TrieNode();
            }
            root.children[chIndex].count++;
            root = root.children[chIndex];
        }
    }

    find(str) {
        let root = this.root;
        for(let i = 0; i < str.length; i++) {
            const chIndex = str.charCodeAt(i) - 97;
            root = root.children[chIndex];
            if(root === undefined) {
                return 0;
            }
        }
        return root.count;
    }
}

const contacts = (queries) => {
    const result = [];
    const trie = new Trie();

    queries.forEach(query => {
        if(query[0] === 'add') {
            trie.add(query[1]);
        } else {
            result.push(trie.find(query[1]));
        }
    });
    return result;
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
        queries[queriesRowItr] = readLine().split(' ');
    }

    let result = contacts(queries);
    return [result];
}

module.exports = {
    main: main
}

