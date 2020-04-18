
/*
{
    "type": "node",
    "request": "launch",
    "name": "crossword-puzzle",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["crossword-puzzle"]
}
*/

class Slot {
    constructor(startX, startY, endX, endY, rowCol, size) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.rowCol = rowCol;
        this.size = size;
    }
}

const rCrossword = (crossword, slots, slotsTaken, hints, i, len) => {

    if (i >= len) {
        return crossword.map(r => r.join(''));
    }
    else {
        const word = hints[i]
        const size = word.length;
        
        // Get available slots of required size
        const matchingSlots = slots.filter(s => s.size === size);

        // While matching slots are not empty
        while(matchingSlots.length > 0) {

            // Pop a slot
            const currentSlot = matchingSlots.pop();

            // Fit the word on the crossword
            let isFitting = true;
            
            word.split('').forEach((c, index) => {
                if(currentSlot.rowCol === 'R') {
                    if (!['-', c].includes(crossword[currentSlot.startX][currentSlot.startY + index])) {
                        isFitting = false;
                    }
                } else {
                    if (!['-', c].includes(crossword[currentSlot.startX + index][currentSlot.startY])) {
                        isFitting = false;
                    }
                }
            })
            
            // If the word fits
            if(isFitting) {

                // Mark the slot as taken
                slotsTaken[i] = true;

                // Enter the word on the puzzle
                const tempCrossword = crossword.map(e => Array.from(e));
                word.split('').forEach((c, index) => {
                    if(currentSlot.rowCol === 'R') {
                        tempCrossword[currentSlot.startX][currentSlot.startY + index] = c;
                    } else {
                        tempCrossword[currentSlot.startX + index][currentSlot.startY] = c;
                    }
                })

                // call recursive function for the next word.
                let puzzleFitted = rCrossword(tempCrossword, slots, slotsTaken.slice(), hints, i + 1, len);
                
                // If the function returns true
                if(puzzleFitted !== undefined) {

                    // return true
                    return puzzleFitted;
                }
            }
        }          
    }
}

function crosswordPuzzle(crossword, hints) {
    
    // Iterate each row of crossword to find row wise slots
    let startX, startY;
    let tracking = false;
    const slots = [];

    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            if(crossword[i][j] == '-') {
                if(!tracking) {
                    tracking = true;
                    startX = i;
                    startY = j;
                }
            } else {
                if(tracking) {
                    tracking = false;
                    const size = j-startY;
                    if(size > 1) {
                        const slot = new Slot(startX, startY, i, j-1, 'R', size);
                        slots.push(slot);
                    }
                }
            }
        }
        if(tracking) {
            tracking = false;
            const size = 10-startY;
            if(size > 1) {
                const slot = new Slot(startX, startY, i, 9, 'R', size);
                slots.push(slot);
            }
        }
    }

    // Iterate each column of crossword to find column wise slots
    for(let j = 0; j < 10; j++) {
        for(let i = 0; i < 10; i++) {
            if(crossword[i][j] == '-') {
                if(!tracking) {
                    tracking = true;
                    startX = i;
                    startY = j;
                }
            } else {
                if(tracking) {
                    tracking = false;
                    const size = i-startX;
                    if(size > 1) {
                        const slot = new Slot(startX, startY, i-1, j, 'C', size);
                        slots.push(slot);
                    }
                }
            }
        }
        if(tracking) {
            tracking = false;
            const size = 10-startX;
            if(size > 1) {
                const slot = new Slot(startX, startY, 9, j, 'C', size);
                slots.push(slot);
            }
        }
    }

    // Call recursive cross word function
    const words = hints.split(';');
    return rCrossword(crossword.map(r => Array.from(r)), slots, Array(slots.length).fill(false), words, 0, words.length);

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    let crossword = [];

    for (let i = 0; i < 10; i++) {
        const crosswordItem = readLine();
        crossword.push(crosswordItem);
    }

    const words = readLine();

    const result = crosswordPuzzle(crossword, words);
    return result;
}

module.exports = {
    main: main
}

