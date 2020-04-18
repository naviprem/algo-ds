
/*
{
    "type": "node",
    "request": "launch",
    "name": "construct-the-array",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["construct-the-array"]
}
*/

const rCountArray = (dp, n, k, x) => {
    if(x === 1) {
        const key = `${n}-1`;
        if(dp.has(key)) {
            return dp.get(key);
        } else {
            let count = (k - 1) * rCountArray(dp, n - 1, k, '*');
            count %= 1000000009
            // console.log(key, count);
            dp.set(key, count);
            return count;
        } 
    } else {
        const key = `${n}-*`;
        if(dp.has(key)) {
            return dp.get(key);
        } else {
            let count = ((k - 2) * rCountArray(dp, n - 1, k, '*')) + rCountArray(dp, n - 1, k, 1);
            count %= 1000000009
            // console.log(key, count);
            dp.set(key, count);
            return count;
        }
    }
}

const countArray = (n, k, x) => {
    const dp = new Map();
    dp.set(`${3}-1`, k - 1);
    dp.set(`${3}-*`, k - 2);
    let temp = 5000;
    while (temp < n) {
        rCountArray(dp, temp, k, x);
        temp += 5000;
    }
    return rCountArray(dp, n, k, x);
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const nkx = readLine().split(' ');

    const n = parseInt(nkx[0], 10);

    const k = parseInt(nkx[1], 10);

    const x = parseInt(nkx[2], 10);

    let answer = countArray(n, k, x);
    // const n = 8;
    // let answer = 0;
    // for(let k = 2; k <= 15; k++) {
    //     const exp2 = Array(n-2).fill(k-1).reduce((acc, curr) => acc * curr, 1);
    //     const exp3 = Array(n-3).fill(k-1).reduce((acc, curr) => acc * curr, 1) * (k-2);
    //     // const exp3 = Array(n-3).fill(k-1).reduce((acc, curr) => acc * curr, 1) * (k-2) + (k-1);
    //     const r1 = countArray(n, k, 1);
    //     console.log(`${n-2},\t${k},\t${r1},\t${countArray(n, k, 2)},\t [${exp3}, ${r1 - exp3}]`);
    // }

    return [answer];
}

module.exports = {
    main: main
}

