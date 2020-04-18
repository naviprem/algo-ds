
/*
{
    "type": "node",
    "request": "launch",
    "name": "even-tree",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["even-tree"]
}
*/

const constructGraph = (nodeCount, edgeCount, from, to) => {
    const graph = Array(nodeCount + 1).fill(null).map(e => []);
    for(let i = 0; i < edgeCount; i++) {
        graph[to[i]].push(from[i]);
    }
    return graph;
}

const postOrder = (graph, node, incrementer) => {
    const children = graph[node];
    const childrenCount = children.length;
    let decendentsCount = 0;

    for(let i=0; i < childrenCount; i++) {
        decendentsCount += postOrder(graph, children[i], incrementer);
    }

    if(decendentsCount % 2 === 1) {
        incrementer();
        return 0;
    } else {
        return decendentsCount + 1;
    }
}
function evenForest(t_nodes, t_edges, t_from, t_to) {
    const graph = constructGraph(t_nodes, t_edges, t_from, t_to);
    let delCount = 0;
    postOrder(graph, 1, () => {
        delCount++;
    });
    return delCount - 1;

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const tNodesEdges = readLine().split(' ');

    const tNodes = parseInt(tNodesEdges[0], 10);
    const tEdges = parseInt(tNodesEdges[1], 10);

    let tFrom = [];
    let tTo = [];

    for (let i = 0; i < tEdges; i++) {
        const tFromTo = readLine().split(' ');

        tFrom.push(parseInt(tFromTo[0], 10));
        tTo.push(parseInt(tFromTo[1], 10));
    }

    const res = evenForest(tNodes, tEdges, tFrom, tTo);
    return [res];
}

module.exports = {
    main: main
}

