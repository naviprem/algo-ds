
/*
{
    "type": "node",
    "request": "launch",
    "name": "castle-grid",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["castle-grid"]
}
*/

function visit(grid, visited, nextLevelQueue, visitingX, visitingY, goalX, goalY) {
                
    // Check if the cell is the goal cell, return current level
    if(visitingX === goalX && visitingY === goalY) {
        return [true];
    }

    // If the cell is a blocked cell, break from loop
    else if(grid[visitingX][visitingY] === 'X') {
        return [false, true];
    }

    // If the cell is not visited, 
    else if(!visited[visitingX][visitingY]) {

        // Mark as visited
        visited[visitingX][visitingY] = true

        // Push the cell into next level queue
        nextLevelQueue.push([visitingX, visitingY])
    } 
    return [false, false];
}

function minimumMoves(grid, startX, startY, goalX, goalY) {

    const gridLen = grid.length;

    // Initialize 2D array to store visited boolean
    const visited = Array.from(grid).map(e => Array.from(grid).fill(false));

    // Initialize Queues to store vertices on current and next levels
    // Push the start cell into the Queue
    let currentLevelQueue = [[startX, startY]];
    let nextLevelQueue = [];

    // Mark start cell as visited
    visited[startX][startY] = true;

    // Initialize a variable to store levels
    let currentLevel = 0;

    // While current or next level queues are not empty, 
    while(currentLevelQueue.length > 0 || nextLevelQueue.length > 0) {

        // If current level queue is empty
        if(currentLevelQueue.length < 1) {

            //Assign next level queue to current level
            currentLevelQueue = nextLevelQueue;

            // Inrement level variable
            currentLevel++;

            // Reset next level queue
            nextLevelQueue = [];

        } else {

            // Dequeue current level queue
            const [currentX, currentY] = currentLevelQueue.shift();

            // Iterate through all the cells on the dequeued cell's row
            for (let i = currentY+1; i < gridLen; i++) {
                const [goalReached, isBlocked] = visit(grid, visited, nextLevelQueue, currentX, i, goalX, goalY)
                if (goalReached) return currentLevel + 1;
                else if(isBlocked) break;
            }

            for (let i = currentX+1; i < gridLen; i++) {
                const [goalReached, isBlocked] = visit(grid, visited, nextLevelQueue, i, currentY, goalX, goalY)
                if (goalReached) return currentLevel + 1;
                else if(isBlocked) break;  
            }

            for (let i = currentY-1; i >= 0; i--) {
                const [goalReached, isBlocked] = visit(grid, visited, nextLevelQueue, currentX, i, goalX, goalY)
                if (goalReached) return currentLevel + 1;
                else if(isBlocked) break;
            }

            for (let i = currentX-1; i >= 0; i--) {
                const [goalReached, isBlocked] = visit(grid, visited, nextLevelQueue, i, currentY, goalX, goalY)
                if (goalReached) return currentLevel + 1;
                else if(isBlocked) break;  
            }

        }
    }
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const n = parseInt(readLine(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const startXStartY = readLine().split(' ');

    const startX = parseInt(startXStartY[0], 10);

    const startY = parseInt(startXStartY[1], 10);

    const goalX = parseInt(startXStartY[2], 10);

    const goalY = parseInt(startXStartY[3], 10);

    const result = minimumMoves(grid, startX, startY, goalX, goalY);

    return [result];
}

module.exports = {
    main: main
}

