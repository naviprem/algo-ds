
/*
{
    "type": "node",
    "request": "launch",
    "name": "kundu-tree",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["kundu-tree"]
}
*/

const CounterMap = class {
    constructor() {
        this.map = new Map();
    }

    increment(k) {
        if(this.map.has(k)) {
            this.map.set(k, this.map.get(k) + 1);
        } else {
            this.map.set(k, 1);
        }
    }

    decrement(k) {
        if(this.map.has(k)) {
            if(this.map.get(k) <= 1) {
                this.map.delete(k);
            } else {
                this.map.set(k, this.map.get(k) - 1);
            }
        }
    }
}

const UF = class {
    constructor(len, counters) {
        this.parents = Array(len + 1).fill(null).map((e, i) => i);
        this.sizes = Array(len + 1).fill(1);
        this.counters = counters;
    }

    find(a) {
        while(a !== this.parents[a]) {
            a = this.parents[a];
        }
        return a;
    }

    union(a, b) {
        const rootOfA = this.find(a);
        const rootOfB = this.find(b);
        if(rootOfA !== rootOfB) {
            const sizeOfA = this.sizes[rootOfA];
            const sizeOfB = this.sizes[rootOfB];

            this.counters.decrement(sizeOfA);
            this.counters.decrement(sizeOfB);

            if(sizeOfA < sizeOfB) {
                this.parents[rootOfA] = rootOfB;
                this.sizes[rootOfB] += this.sizes[rootOfA];
                this.counters.increment(this.sizes[rootOfB]);
            } else {
                this.parents[rootOfB] = rootOfA;
                this.sizes[rootOfA] += this.sizes[rootOfB];
                this.counters.increment(this.sizes[rootOfA]);
            }
        }
    }
}

const nC2 = (n) => {
    return (n * (n - 1)) / 2;
}

const nC3 = (n) => {
    return (n * (n - 1) * (n - 2)) / 6;
}

const kunduTree = (tree) => {
    const len = tree.length + 1;
    const counters = new CounterMap();
    const uf = new UF(len, counters);

    tree.forEach(edge => {
        if(edge[2] === 'b') {
            uf.union(edge[0], edge[1]);
        }
    });

    const sizesCounts = Array.from(counters.map.entries());
    let result = nC3(len);
    sizesCounts.forEach(sizeCount => {
        const [size, count] = sizeCount;
        result -= nC3(size) * count;
        result -= nC2(size) * (len - size) * count;
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
    const n = parseInt(readLine());

    let tree = Array(n - 1);

    for (let treeRowItr = 0; treeRowItr < n - 1; treeRowItr++) {
        tree[treeRowItr] = readLine().split(' ');
        tree[treeRowItr][0] = parseInt(tree[treeRowItr][0]);
        tree[treeRowItr][1] = parseInt(tree[treeRowItr][1]);
    }
    let result = kunduTree(tree);
    console.log(result);
    return [result];
}

module.exports = {
    main: main
}

