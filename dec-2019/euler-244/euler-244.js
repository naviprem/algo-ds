
/*
{
    "type": "node",
    "request": "launch",
    "name": "euler-244",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["euler-244"]
}
*/

const PuzzleState = class {
    constructor(arr) {
        [this.x, this.y] = this.findWhiteCell(arr); 
        this.array = arr;
        this.len = arr.length;

    }

    findWhiteCell() {
        for(let i = 0; i < this.len; i++) {
            for(let j = 0; j < this.len; j++) {
                if(this.array[i][j] == 'W') {
                    return [i, j];
                }
            }
        }
    }

    isEqual(a) {
        return this.array.toString() === a.array.toString();
    }

    nextSteps() {
        const nextSteps = [];
        let nextX, nextY;
        if(this.x < n - 1) {
            const nextX = this.x + 1;
            const nextY = this.y;
            const nextStep = new PuzzleState(this.array);
            nextStep.array[this.x][this.y] = nextStep.array[nextX][nextY];
            nextStep.array[nextX][nextY] = 'W';
            nextStep.x = nextX;
            nextStep.y = nextY
            nextSteps.push(nextStep);
        } 
        if(this.whiteCell[0] > 0) {
            nextSteps.push([this.whiteCell[0] - 1, this.whiteCell[1]]);
        }
        if(this.whiteCell[1] < n - 1) {
            nextSteps.push([this.whiteCell[0], this.whiteCell[1] + 1]);
        }
        if(this.whiteCell[1] > 0) {
            nextSteps.push([this.whiteCell[0], this.whiteCell[1] - 1]);
        }
        return nextSteps;
    }
}





const processData = (input) => {
    let currLine = 0;
    const n = parseInt(input[currLine++]);
    const s = new PuzzleState();
    const e = new PuzzleState();
    for(; currLine <= n; currLine++) {
        s.array.push(input[currLine].split(''));
        e.array.push(input[currLine + n].split(''));
    }

    const bfsQ = [];
    const bfsNextQ = [];
    let currLevel = 1;

    bfsQ.push(s);

    while(bfsQ.length > 0 || bfsNextQ.length > 0) {
        if(bfsQ.length < 1) {
            bfsQ = bfsNextQ;
            bfsNextQ = [];
            currLevel++;
        }
        const c = bfsQ.pop();
        const nextSteps = c.nextSteps();
    }
    
}


const main = (data) => {
    let result = processData(data);
    return [result];
}

module.exports = {
    main: main
}

