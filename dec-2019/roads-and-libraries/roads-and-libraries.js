
/*
{
    "type": "node",
    "request": "launch",
    "name": "roads-and-libraries",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["roads-and-libraries"]
}
*/

const constructGraph = (graph, edges) => {
    edges.forEach((e) => {
        if(!graph.has(e[0])) {
            graph.set(e[0], []);
        }
        if(!graph.has(e[1])) {
            graph.set(e[1], []);
        }
        graph.get(e[0]).push(e[1]);
        graph.get(e[1]).push(e[0]);
    });
}

const dfs = (graph, node, roadCount, visited) => {
    const adjN = graph.get(node);
    adjN.forEach(child => {
        if(!visited[child]) {
            visited[child] = true;
            roadCount[0]++;
            dfs(graph, child, roadCount, visited);
        }
    })
}

const findRoadCount = (graph) => {
    const visited = [];
    Array.from(graph.keys()).forEach(k => {
        visited[k] = false;
    });
    let roadCount = [0];
    let ccCount = 0;
    Array.from(graph.keys()).forEach(k => {
        if(!visited[k]) {
            visited[k] = true;
            ccCount++;
            dfs(graph, k, roadCount, visited);
        }
    });
    return [roadCount[0], ccCount];
}

const roadsAndLibraries = (n, costL, costR, cities) => {
    const graph = new Map();
    constructGraph(graph, cities);
    if(costL <= costR) {
        return n * costL;
    }
    const [roadCount, ccCount] = findRoadCount(graph);
    return roadCount * costR + ccCount * costL + (n - graph.size) * costL;
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
        const nmC_libC_road = readLine().split(' ');

        const n = parseInt(nmC_libC_road[0], 10);

        const m = parseInt(nmC_libC_road[1], 10);

        const c_lib = parseInt(nmC_libC_road[2], 10);

        const c_road = parseInt(nmC_libC_road[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine().split(' ').map(citiesTemp => parseInt(citiesTemp, 10));
        }

        result.push(roadsAndLibraries(n, c_lib, c_road, cities));
    }
    return result;
}

module.exports = {
    main: main
}

