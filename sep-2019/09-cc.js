
import {dfs} from './06-dfs';

export class CC { 
    constructor(g) {
        this.componentIdArray = [];
        this.g = g;
        this.componentsCount = 0;

        const visitedArray = [];
        g.getVertices().forEach(v => {
            if(visitedArray[g.syTbl.get(v)] !== true) {
                this.componentsCount++;
                dfs(g, v, visitedArray, null, (visitingVertex, visitedFrom) => {
                    this.componentIdArray[g.syTbl.get(visitingVertex)] = this.componentsCount;
                    console.log(`Visiting ${visitingVertex}, connected components id = ${this.componentIdArray}, vertices = ${g.getVertices()}`);
                });
            }
        });
    }

    isConnected(a, b) {
        return this.componentIdArray[this.g.syTbl.get(a)] === this.componentIdArray[this.g.syTbl.get(b)];
    }

    getComponentsCount() {
        return this.componentsCount;
    }

    getComponentId(v) {
        return this.componentIdArray[this.g.syTbl.get(v)]
    }
}






