function main(data) {
    return processData(data.join('\n'));
}

const levelMap = new Map();
const qValMap = new Map();
const ancestorsMap = new Map();

function processData(data) {  
    let inputStrings = data.split('\n');
    const [n] = inputStrings[0].split(' ');
    const tree = new Tree();
    let [a, b] = inputStrings[1].split(' ');
    if(a > b) {
        const temp = a;
        a = b;
        b = temp;
    }
    tree.root = new TreeNode(a);
    levelMap.set(a, 0);
    ancestorsMap.set(a, [a]);
    tree.root.children.push(new TreeNode(b));
    levelMap.set(b, 1);
    ancestorsMap.set(b, [a, b]);

    inputStrings.slice(2, n).forEach(edge => {
        // console.log(edge);
        const edges = edge.split(' ');
        tree.addEdge(edges[0], edges[1]);
    });
    // tree.levelOrderTraversal();

    const qVals = [];
    inputStrings.slice(n).forEach((set, index) => {
        if(index % 2 === 1) {
            qVals.push(processSet(set.split(' ')));
        }
    })
    return qVals;
}

class TreeNode {
    constructor(data) {
        this.data = data;
        this.children = [];
    }
}

class Tree {
    constructor() {
        this.root;
    }
    addEdge(a, b) {
        if(parseInt(a) < parseInt(b)) {
            const node = getNode(this.root, a);
            node.children.push(new TreeNode(b));
            levelMap.set(b, levelMap.get(a) + 1);
            ancestorsMap.set(b, ancestorsMap.get(a).concat(b));
        } else {
            const node = getNode(this.root, b);
            node.children.push(new TreeNode(a));
            levelMap.set(a, levelMap.get(b) + 1);
            ancestorsMap.set(a, ancestorsMap.get(b).concat(a));
        }
        
        // console.log(`edge added ${a}, ${b}`);
    }
    levelOrderTraversal() {
        let currLevelStack = [this.root];
        let nextLevelStack = [];
        let currLevel = 0;
        while(currLevelStack.length > 0 || nextLevelStack.length > 0) {
            if(currLevelStack.length < 1) {
                currLevelStack = nextLevelStack;
                nextLevelStack = [];
                currLevel++;
            } else {
                const node = currLevelStack.pop();
                console.log(`Level-${currLevel}: ${node.data}`);
                nextLevelStack = nextLevelStack.concat(node.children);
            }
        }  
    }

}

// function getNode(root, a) {
//     const result = findNode(root, a)
//     if(result !== undefined) return result[0];
// }

function getNode(root, a) {
    if(root === undefined) return;
    let currLevelStack = [root];
    let nextLevelStack = [];
    while(currLevelStack.length > 0 || nextLevelStack.length > 0) {
        if(currLevelStack.length < 1) {
            currLevelStack = nextLevelStack;
            nextLevelStack = [];
        } else {
            const node = currLevelStack.pop();
            if(node.data === a) {
                return node;
            } else {
                nextLevelStack = nextLevelStack.concat(node.children);
            }
        }
    }
}

function hello() {
    return "hello";
}

function processSet(set) {
    // console.log(`processing set ${set}`);
    let qVal = 0;
    const setLength = set.length;
    for(let i = 0; i < setLength; i++) {
        for (let j = i + 1; j < setLength; j++) {
            const a = set[i];
            const b = set[j];
            const key = a < b ? `${a}:${b}` : `${b}:${a}`
            if(qValMap.has(key)) {
                qVal += qValMap.get(key);
            } else {
                const val = a * b * (levelMap.get(a) + levelMap.get(b) - (2 * levelMap.get(leastCommonAncestor(a, b))));
                qVal += val
                qValMap.set(key, val); 
            }
            qVal %= 1000000007
        }
    }
    return qVal;
}

function leastCommonAncestor(a, b) {
    let lca;
    const aAncestors = ancestorsMap.get(a);
    const bAncestors = ancestorsMap.get(b);
    let i = 0;
    while(i < aAncestors.length && i < bAncestors.length) {
        if(aAncestors[i] === bAncestors[i]) {
            lca = aAncestors[i];
            i++;
        } else {
            break;
        }
    }
    return lca;
}

module.exports = {
    main: main,
    hello: hello
}

