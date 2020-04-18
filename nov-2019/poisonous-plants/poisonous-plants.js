
/*
{
    "type": "node",
    "request": "launch",
    "name": "poisonous-plants",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["poisonous-plants"]
}
*/

// Doublely linked list
// 1. Can dequeue from prev
// 2. Keeps track of its next most node
class Node {
    constructor(data, prev, next) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class DLL {
    constructor(arr) {
        this.size;
        this.first;
        this.last;

        if(arr !== undefined) {
            arr.forEach(data => {
                this.push(data);
            });
        }
    }

    push(data) {
        const node = new Node(data);
        if(this.first === undefined) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            node.prev = this.last;
            this.last = node;
        }
    }

    shift() {
        if(this.first === undefined) return undefined;
        const data = this.first.data;
        if(this.first === this.last) {
            this.first = undefined;
            this.last = undefined;
        } else {
            this.first = this.first.next;
            this.first.prev = undefined;
        }
        return data;
    }
}

const mergeLists = (masterList, x, y) => {

    if(masterList.last === y) {
        masterList.last = x;
        x.next = undefined;
    } else {
        x.next = y.next;
        y.next.prev = x;
    }


    const xList = x.data;
    const yList = y.data;

    if(xList.first !== undefined && yList.first !== undefined) {
        xList.last.next = yList.first;
        yList.first.prev = xList.last;
        xList.last = yList.last;
    } else if(xList.first === undefined) {
        xList.data = yList.data;
    }
}

const poisonousPlants = (arr) => {

    const len = arr.length;
    
    // Initialize a new master list to hold sub lists
    const masterList = new DLL();

    // Initialize previous plant to first plant on the list
    let prevPlant = arr[0];
    let temp = [prevPlant];

    // Iterate arr starting from second plant, 
    for(let i = 1; i < len; i++) {

        // If current plant is smaller than previous element
        if(arr[i] <= prevPlant) {
            
            //push plants to a temp array
            temp.push(arr[i]);

        } else {

            // create a linked list out of the element stored so far in the temp array
            const subList = new DLL(temp);
    
            // push the newly created linked list to the master list
            masterList.push(subList);
            
            // Initialize a new temp array with current plant
            temp = [arr[i]]
        }

        // Update previous plant to current plant
        prevPlant = arr[i]
    }

    // create a linked list out of the element stored so far in the temp array
    const subList = new DLL(temp);

    // push the newly created linked list to the master list
    masterList.push(subList);
        




    // Initilize a days counter
    let daysCount = 0;

    // while master list has more than 1 lists
    while(!(masterList.first === masterList.last)) {

        // Increment day counter
        daysCount++;

        // Initialize previous List with the first list on master list
        let prevListNode = masterList.first;
        let prevList = masterList.first.data;
        let currentListNode = masterList.first.next;

        // Iterate from second list // while next not undefined
        while(currentListNode !== undefined) {
            
            // shift a plant from the list
            const currentList = currentListNode.data;
            currentList.shift();


            
            // if list is empty or first plant on current list has less pesticide than last plant on previous list
            if(currentList.first === undefined || currentList.first.data <= prevList.last.data) {

                // merge the current list to previous
                mergeLists(masterList, prevListNode, currentListNode);
            }  else {
                prevListNode = currentListNode;
                prevList = currentList;
            }

            currentListNode = currentListNode.next;
        }
    }

    // return day counter
    return daysCount;

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const n = parseInt(readLine(), 10);
    const p = readLine().split(' ').map(pTemp => parseInt(pTemp, 10));
    let result = poisonousPlants(p);
    return [result];
}

module.exports = {
    main: main
}

