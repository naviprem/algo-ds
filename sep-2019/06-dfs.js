
/**
 * 
 * @param {*} g - Graph represented as adjacency list
 * @param {*} visitingVertex - Visiting vertex
 * @param {*} visitedArray - An array containing true or false indicating whether the corresponding vertex is visited or not
 * @param {*} visitingFrom - The vertex from which the current vertex is being visited.
 * @param {*} operation - Operation to be performed upon visiting
 */

export function dfs(g, visitingVertex, visitedArray, visitingFrom, operation) {
    if(visitedArray[g.syTbl.get(visitingVertex)] !== true) {
        operation(visitingVertex, visitingFrom);
        visitedArray[g.syTbl.get(visitingVertex)] = true;
        g.getAdj(visitingVertex).forEach(adjV => {
            dfs(g, adjV, visitedArray, visitingVertex, operation);
        });
    }
}
    







