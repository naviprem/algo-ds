let inputString = '';
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

function main (data) {
    inputString = data;
    const n = parseInt(readLine(), 10);
    let indexes = Array(n);

    for (let indexesRowItr = 0; indexesRowItr < n; indexesRowItr++) {
        indexes[indexesRowItr] = readLine().split(' ').map(indexesTemp => parseInt(indexesTemp, 10));
    }

    const queriesCount = parseInt(readLine(), 10);
    let queries = [];

    for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    return swapNodes(indexes, queries);
}

class BinaryTreeNode {
    constructor() {
        this.leftNode;
        this.rightNode;
        this.data;
    }
    toString() {
        return `${this.leftNode}, ${this.rightNode}, ${this.data}`;
    }
    swapNodes() {
        let temp = this.leftNode;
        this.leftNode = this.rightNode;
        this.rightNode = temp;
    }
}

class BinaryTree {
    constructor() {
        this.root;
    }
    newNode(indexes, index) {
        if(index >= 0) {
            const node = new BinaryTreeNode();
            node.data = index + 1;
            node.leftNode = this.newNode(indexes, indexes[index][0] - 1);
            node.rightNode = this.newNode(indexes, indexes[index][1] - 1);
            return node;
        }
    }

    inOrderTraversal(node, processNodeData) {
        if(node !== undefined) {
            this.inOrderTraversal(node.leftNode, processNodeData);
            processNodeData(node.data);
            this.inOrderTraversal(node.rightNode, processNodeData);
        }
    }

    levelOrderTraversal(processNodeData) {
        let currLevel = 1;
        let currLevelStack = [];
        let nextLevelStack = [];
        currLevelStack.push(this.root);
        while(currLevelStack.length > 0 || nextLevelStack.length > 0) {
            if(currLevelStack.length === 0) {
                currLevelStack = nextLevelStack;
                nextLevelStack = [];
                currLevel++;
            } else {
                const node = currLevelStack.pop();
                if(node.leftNode !== undefined) nextLevelStack.push(node.leftNode);
                if(node.rightNode !== undefined) nextLevelStack.push(node.rightNode);
                processNodeData(currLevel, node.data);
            }
        }
    }

    swapAtMultiplesOf(k, processNodeData) {
        let currLevel = 1;
        let currLevelStack = [];
        let nextLevelStack = [];
        currLevelStack.push(this.root);
        while(currLevelStack.length > 0 || nextLevelStack.length > 0) {
            if(currLevelStack.length === 0) {
                currLevelStack = nextLevelStack;
                nextLevelStack = [];
                currLevel++;
            } else {
                const node = currLevelStack.pop();
                if(currLevel % k === 0) {
                    node.swapNodes();
                }
                if(node.leftNode !== undefined) nextLevelStack.push(node.leftNode);
                if(node.rightNode !== undefined) nextLevelStack.push(node.rightNode);
                processNodeData(currLevel, node.data);
            }
        }
    }
}

function swapNodes(indexes, queries) {
    const bt = new BinaryTree();
    bt.root = bt.newNode(indexes, 0);

    return queries.map(query => {
        bt.swapAtMultiplesOf(query, (level, data) => {});
        let inOrderTraversalArray = [];
        bt.inOrderTraversal(bt.root, data => {
            inOrderTraversalArray.push(data) 
        });
        return inOrderTraversalArray;
    });
}

module.exports = {
    main: main
}