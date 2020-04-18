
/*
{
    "type": "node",
    "request": "launch",
    "name": "minimum-time-required",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["minimum-time-required"]
}
*/

const productionOnDay = (machines, days) => {

    // Initialize counter to store production
    let productionCounter = 0;

    // Iterate through all machines
    for(let i = 0; i < machines.length; i++) {

        // divide days by machine days and store the whole number quotient to counter
        productionCounter += Math.floor(days / machines[i]);
    }

    // return counter
    return productionCounter;
}

function minTime(machines, goal) {

    // Find the min-day machine
    const minDaysMachine = machines.reduce((acc, curr) => acc < curr ? acc : curr);

    // Find number of days it would take to produce only with the min-day machine
    const maxDays = minDaysMachine * goal;

    // Use binary search to find the day on which the required production will be met
    // Initialize index variable for search
    let lo = 0;
    let hi = maxDays + 1;
    let mid = Math.floor((lo + hi) / 2);
    let productionOnMid;
    let matchFoundFlag = false;

    // while mid is greater than lo and smaller than hi
    while(mid > lo && mid < hi) {

        // Compute production on mid
        productionOnMid = productionOnDay(machines, mid);
        
        // check if goal will be achieved on mid
        if(productionOnMid === goal) {
            matchFoundFlag = true;
            // break
            break;

        } else {

            // if production on mid is more than goal
            if(productionOnMid > goal) {
                // assign mid to hi
                hi = mid;
            } else {
                // asign mid to lo
                lo = mid;
            }
        }

        // Recalculate mid
        mid = Math.floor((lo + hi) / 2);
    }

    console.log(mid, lo, hi);

    // if production on mid day is greater than or equal to goal
    if(matchFoundFlag) {

        while(productionOnDay(machines, mid - 1) === goal) mid--;
        // return mid
        return mid;
    } else {

        // else return mid + 1 
        return hi;
    }
       
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;

    const nGoal = readLine().split(' ');

    const n = parseInt(nGoal[0], 10);

    const goal = parseInt(nGoal[1], 10);

    const machines = readLine().split(' ').map(machinesTemp => parseInt(machinesTemp, 10));

    const result = minTime(machines, goal);
    return [result];
}

module.exports = {
    main: main
}

