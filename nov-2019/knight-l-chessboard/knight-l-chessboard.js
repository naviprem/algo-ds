
/*
{
    "type": "node",
    "request": "launch",
    "name": "knight-l-chessboard",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["knight-l-chessboard"]
}
*/

const nextPositions = (currX, currY, a, b) => {
    return [
        [currX + a, currY + b],
        [currX + a, currY - b],
        [currX - a, currY + b],
        [currX - a, currY - b],
        [currX + b, currY + a],
        [currX + b, currY - a],
        [currX - b, currY + a],
        [currX - b, currY - a]
    ]
}

const knightlOnAChessboard = (n) => {

    n = parseInt(n);

    // Initialize a 2D array to store movecounts for all knights
    const moveCountsArray = Array(n-1).fill(0).map(x => Array(n-1).fill(0).map(y => 0));

    // Initialize a map to store the move-count by position (because k(1,2) == k(2,1))
    const moveCountsMap = new Map();

    // Iterate each knight type on a nested loop
    for(let i = 1;  i < n; i++) {
        for (let j = 1;  j < n; j++) {
            // If knight type is available on the map 
            // Store knight position to output array and continue
            let key = i < j ? `${i}:${j}` : `${j}:${i}`;
            if(moveCountsMap.has(key)) {
                moveCountsArray[i-1][j-1] = moveCountsMap.get(key);
            }

            // Perform BFS for each position
            // Initialize a BFS queue
            // Initialize a cLevel variable
            let bfsQ = [];
            let bfsNextQ = [];
            let currLevel = 1;
            const visited = Array(n).fill(0).map(x => Array(n).fill(0).map(y => false));;

            // Insert the starting position into the queue
            bfsQ.push([0,0]);

            // while queue is not empty
            while(bfsQ.length > 0 || bfsNextQ.length > 0) {
                if(bfsQ.length < 1) {
                    bfsQ = bfsNextQ;
                    bfsNextQ = [];
                    currLevel++
                }
                // Dequeue the first element on the queue 
                const [currX, currY] = bfsQ.shift();

                // visit all of its 8 possible moves unless they are not visited already, or they are off the board
                const np = nextPositions(currX, currY, i, j);
                for(let position = 0; position < np.length; position++) {
                    const [nextX, nextY] = np[position];
                    if(nextX >= 0 && nextX < n && nextY >= 0 && nextY < n && visited[nextX][nextY] === false) {
                        if(nextX === n-1 && nextY === n-1) {
                            moveCountsArray[i-1][j-1] = currLevel;
                            const key = i < j ? `${i}:${j}` : `${j}:${i}`;
                            moveCountsMap.set(key, currLevel);
                            break;
                        } else {
                            visited[nextX][nextY] = true;
                            bfsNextQ.push([nextX, nextY]);
                        }
                    }
                }
                if(moveCountsArray[i-1][j-1] != 0) {
                    break;
                }
            }
            if(moveCountsArray[i-1][j-1] === 0) {
                moveCountsArray[i-1][j-1] = -1;
                moveCountsMap.set(key, -1);
            }
        }
    }
    return moveCountsArray.map(r => r.join(' ')).join('\n');    

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine();
    let result = knightlOnAChessboard(s);
    return [result];
}

module.exports = {
    main: main
}

