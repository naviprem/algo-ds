
/*
{
    "type": "node",
    "request": "launch",
    "name": "permute",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["permute"]
}
*/

const rPermute = (a, ai, n, nums) => {
    if(ai === n) {
        return [a];
    } else {
        const perms = [];
        for(let i = ai; i < n; i++) {
            a[ai] = nums[i];
            perms.push(...rPermute(a.slice(0), ai+1, n, nums));
        }
        return perms
    }
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    return rPermute([], 0, nums.length, nums);
};

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine().split(' ');
    let result = permute(s);
    return result;
}

module.exports = {
    main: main
}

