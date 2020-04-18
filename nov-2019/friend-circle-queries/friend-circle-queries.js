
/*
{
    "type": "node",
    "request": "launch",
    "name": "friend-circle-queries",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["friend-circle-queries"]
}
*/

class WUF {
    constructor() {
        this.maxSize = 1
        this.parent = []
        this.size = []
    }

    union(a, b) {

        if(this.parent[a] === undefined) {
            this.parent[a] = a;
            this.size[a] = 1;
        }
        if(this.parent[b] === undefined) {
            this.parent[b] = b;
            this.size[b] = 1;
        }

        const rootA = this.find(a);
        const rootB = this.find(b);

        if(rootA !== rootB) {
            if(this.size[rootA] < this.size[rootB]) {
                this.parent[rootA] = rootB
                this.size[rootB] += this.size[rootA]; 
                if(this.maxSize < this.size[rootB]) {
                    this.maxSize = this.size[rootB];
                }
            } else {
                this.parent[rootB] = rootA
                this.size[rootA] += this.size[rootB]; 
                if(this.maxSize < this.size[rootA]) {
                    this.maxSize = this.size[rootA];
                }
            }
        }
    }

    find(a) {
        while(a !== this.parent[a]) {
            a = this.parent[a];
        }
        return a;
    }
}

const maxCircle = (queries) => {
    const unionFind = new WUF();
    return queries.map(q => {
        unionFind.union(q[0], q[1]);
        return unionFind.maxSize;
    });
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const q = parseInt(readLine(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = maxCircle(queries);
    return ans;
}

module.exports = {
    main: main
}

