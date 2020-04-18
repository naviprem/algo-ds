
/*
{
    "type": "node",
    "request": "launch",
    "name": "increasing-triplet",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["increasing-triplet"]
}
*/

var increasingTriplet = function(nums) {
    return rIncreasingTriplet(nums, [], 0, nums.length);
};

const rIncreasingTriplet = (nums, subSequence, start, len) => {
    if(subSequence.length === 3) {
        return true;
    } 
    for(let i = start; i < len; i++) {
        if(subSequence.length === 0 
           || subSequence[subSequence.length - 1] < nums[i]) {
            subSequence.push(nums[i]);
            const output = rIncreasingTriplet(nums, subSequence, i + 1, len);
            if(output) {
                return true;
            }
            subSequence.pop();
        }
    }
    return false;
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine().split(' ');
    let result = increasingTriplet(s);
    return [result];
}

module.exports = {
    main: main
}

