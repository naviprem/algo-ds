
/*
{
    "type": "node",
    "request": "launch",
    "name": "largest-rectangle",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["largest-rectangle"]
}
*/

function largestRectangle(h) {

    const len = h.length;

    // Initialize largest Area with 0
    let largestArea = 0;

    // Initialize stack
    const stack = [];

    // Iterate through the heights Array
    for(let i = 0; i < len; i++) {

        // Find left wall of current building
        let leftWall = i;
        while (h[leftWall - 1] >= h[i] && leftWall > 0) leftWall--;

        // If current building is taller than building on top of stack, 
        if(stack.length === 0 || stack[stack.length - 1][1] <= h[i]) {
            
            // Push current building to stack
            stack.push([i, h[i], leftWall]);

        // If current building is shorter than current Peak,
        } else {

            // While the top of stack is taller than the current building
            while (stack.length > 0 && stack[stack.length - 1][1] > h[i]) {

                // pop the stack
                const poppedBuilding = stack.pop();

                // Compute area = current building index - popped building left wall * popped building height
                const currentArea = (i - poppedBuilding[2]) * poppedBuilding[1];

                // Update largest Area
                largestArea = currentArea > largestArea ? currentArea : largestArea;

            }
            
            // Push current building to stack
            stack.push([i, h[i], leftWall]);
        }
    }

    // While stach has buildings
    while(stack.length > 0) {

        // Pop the stack
        const poppedBuilding = stack.pop();

        // Compute area = current building index - popped building left wall * popped building height
        const currentArea = (len - poppedBuilding[2]) * poppedBuilding[1];

        // Update largest Area
        largestArea = currentArea > largestArea ? currentArea : largestArea;
    }

    // Return largest area
    return largestArea;
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;

    const n = parseInt(readLine(), 10);

    const h = readLine().split(' ').map(hTemp => parseInt(hTemp, 10));

    let result = largestRectangle(h);
    return [result];
}

module.exports = {
    main: main
}

