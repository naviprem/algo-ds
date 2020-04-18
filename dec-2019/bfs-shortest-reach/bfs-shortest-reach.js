
/*
{
    "type": "node",
    "request": "launch",
    "name": "bfs-shortest-reach",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["bfs-shortest-reach"]
}
*/

const constructGraph = (edges) => {
    const graph = [];
    edges.forEach(e => {
        if(graph[e[0]] === undefined) {
            graph[e[0]] = [];
        }
        if(graph[e[1]] === undefined) {
            graph[e[1]] = [];
        }
        graph[e[0]].push(e[1]);
        graph[e[1]].push(e[0]);
    });
    return graph;
}

const bfs = (n, m, edges, s) => {
    const graph = constructGraph(edges);
    const shortestPaths = Array(n + 1).fill(-1);
    let bfsCurrQ = [s];
    let bfsNextQ = [];
    let currLevel = 1;
    const visited = Array(n + 1).fill(false);
    visited[s] = true;

    while(bfsCurrQ.length > 0 || bfsNextQ.length > 0) {
        if(bfsCurrQ.length < 1) {
            bfsCurrQ = bfsNextQ;
            currLevel++;
            bfsNextQ = [];
        }
        const currNode = bfsCurrQ.pop();
        graph[currNode].forEach(n => {
            if(!visited[n]) {
                visited[n] = true;
                bfsNextQ.push(n);
                shortestPaths[n] = currLevel * 6;
            }
        });
    }
    shortestPaths.splice(s, 1);
    return shortestPaths.slice(1);
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const q = parseInt(readLine(), 10);
    const result = [];

    for (let qItr = 0; qItr < q; qItr++) {
        const nm = readLine().split(' ');

        const n = parseInt(nm[0], 10);

        const m = parseInt(nm[1], 10);

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const s = parseInt(readLine(), 10);

        result.push(bfs(n, m, edges, s));
    }
    return result;
}

module.exports = {
    main: main
}

