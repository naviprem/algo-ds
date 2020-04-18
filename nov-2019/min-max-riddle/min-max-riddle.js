
/*
{
    "type": "node",
    "request": "launch",
    "name": "min-max-riddle",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["min-max-riddle"]
}
*/

const minMaxRiddle = (arr) => {

    const len = arr.length;

    // Initialize a stack
    const stack = [];

    // Initialize map to record min-max numbers and window sizes
    const minMaxMap = new Map();

    // Iterate the array
    for (let i = 0; i < len; i++) {

        // Find starting point of the current number's min window
        let startIndex = i;
        while (startIndex > 0 && arr[startIndex - 1] >= arr[i]) {
            startIndex--
        }

        // If the number bigger than top of stack, 
        if(stack.length === 0 || stack[stack.length - 1][1] <= arr[i]) {

            // Push to stack
            stack.push([i, arr[i], startIndex]);

        } else {

            // While top of stack is bigger than the current number
            while(stack.length > 0 && stack[stack.length - 1][1] > arr[i]) {

                // Pop the stack
                const poppedNumber = stack.pop();

                // Calculate the popped number's min window
                const windowSize = i - poppedNumber[2];

                // Update min window map
                let minMaxNumber = 0;
                if(minMaxMap.has(windowSize)) {
                    minMaxNumber = minMaxMap.get(windowSize);
                }
                minMaxMap.set(windowSize, poppedNumber[1] > minMaxNumber ? poppedNumber[1] : minMaxNumber);
            }

            // Push to stack
            stack.push([i, arr[i], startIndex]);

        }     
    }

    // While stack is not empty
    while(stack.length > 0) {

        // Pop the stack
        const poppedNumber = stack.pop();

        // Calculate the popped number's largest min window
        const windowSize = len - poppedNumber[2];

        // Update min window map
        let minMaxNumber = 0;
        if(minMaxMap.has(windowSize)) {
            minMaxNumber = minMaxMap.get(windowSize);
        }
        minMaxMap.set(windowSize, poppedNumber[1] > minMaxNumber ? poppedNumber[1] : minMaxNumber);
    }

    
    const minMaxArray = [minMaxMap.get(len)];
    let j = 1;

    for(let i = len - 1; i > 0; i--, j++) {
        if(minMaxMap.has(i) && minMaxMap.get(i) > minMaxArray[j-1]) {
            minMaxArray.push(minMaxMap.get(i));
        } else {
            minMaxArray.push(minMaxArray[j-1])
        }
    }

    // Get min-max numbers, reverse and return
    return minMaxArray.reverse()
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const n = parseInt(readLine(), 10);
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    let result = minMaxRiddle(arr);
    return result;
}

module.exports = {
    main: main
}

