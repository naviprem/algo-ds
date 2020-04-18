
/*
{
    "type": "node",
    "request": "launch",
    "name": "coin-change",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["coin-change"]
}
*/

const Tenderer = class {
    constructor(coins) {
        this.map = new Map();
        this.coins = coins.sort((a, b) => b - a);
        console.log(`this.coins = ${this.coins}`);
        this.coinsLen = coins.length;
    }

    ways(n, d) {
        // denomination === undefined ? 0: denomination;
        if(n < 0) {
            return 0;
        } else if (n === 0) {
            return 1;
        } else {
            const key = `${n}#${d}`;
            if(this.map.has(key)) {
                return this.map.get(key);
            } else {
                let w = 0;
                // for(let i = d; i < this.coins.length; i++) {
                this.coins.slice(d).forEach((coin, index) => {
                    w += this.ways(n - coin, index + d);
                });
                    
                // }
                console.log(`n, d, w = ${n}, ${d}, ${w}`);
                this.map.set(key, w);
                return w;
            }
        }
    }
}

function getWays(n, c) {
    const tenderer = new Tenderer(c);
    return tenderer.ways(n, 0);
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const c = readLine().replace(/\s+$/g, '').split(' ').map(cTemp => parseInt(cTemp, 10));

    // Print the number of ways of making change for 'n' units using coins having the values given by 'c'

    const ways = getWays(n, c);
    return [ways];
}

module.exports = {
    main: main
}

