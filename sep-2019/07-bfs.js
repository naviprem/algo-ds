
import {UG} from './05-ug';

export function breathFirstSearch(ug) {
    const bfsQueue = [];
    const visited = [];
    const edgeFrom = [];
    
    function bfs(v) {
        bfsQueue.push(v);
        console.log(`Visiting ${v}`);
        visited[ug.syTbl.get(v)] = true;

        while(bfsQueue.length > 0) {
            const [curr] = bfsQueue.splice(0, 1);
            ug.getAdj(curr).forEach(adjV => {
                if(visited[ug.syTbl.get(adjV)] !== true) {
                    bfsQueue.push(adjV);
                    edgeFrom[ug.syTbl.get(adjV)] = v;
                    console.log(`Visiting ${adjV}`);
                    visited[ug.syTbl.get(adjV)] = true;
                }
            });
        }
    }
    
    ug.getVertices().forEach(v => {
        if(visited[ug.syTbl.get(v)] !== true) {
            bfs(v);
        }
    });
}




