
/*
{
    "type": "node",
    "request": "launch",
    "name": "trees-01",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["trees-01"]
}
*/

const Node = class {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

const Tree = class {
    constructor() {
        this.root = null;
    }

    rInsert(root, n) {
        if(root === null) {
            root = new Node(n);
        } else if(root.data > n) {
            root.left = this.rInsert(root.left, n);
        } else if (root.data < n) {
            root.right = this.rInsert(root.right, n);
        } else {
            root.data = n;
        }
        return root;
    }

    insert(n) {
            this.root = this.rInsert(this.root, n);
    }

    inorder(root) {
        if(root === null) {
            return;
        } else {
            this.inorder(root.left);
            console.log(root.data);
            this.inorder(root.right);
        }
    }
}

const trees = (arr, child1, child2) => {
    const tree = new Tree();
    arr.forEach(node => {
        tree.insert(node);
    });
    tree.inorder(tree.root);
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine();
    let result = trees([4, 2, 3, 1, 7, 6], 1, 7);
    return [result];
}

module.exports = {
    main: main
}



