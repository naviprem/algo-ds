
/*
{
    "type": "node",
    "request": "launch",
    "name": "facebook-stickers",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["facebook-stickers"]
}
*/

const stickerCount = (word) => {
    
    // Initialize the map
    const len = word.length;
    const charCountMap = new Map();
    const refMap = new Map();

    'facebook'.split('').forEach(c => {
        refMap.set(c, true);
    });
    
    // Iterate the word
    for(let i = 0; i < len; i++ ) {
      
      const currentChar = word[i];
      if(!refMap.has(currentChar)){
        return -1;
      }
      // increment the counter on the map
      if(charCountMap.has(currentChar)) {
        charCountMap.set(currentChar, charCountMap.get(currentChar) + 1);
      } else {
        charCountMap.set(currentChar, 1);
      }
      
    }
    
    // get map values
    // find the largest value
    let maxEntry = 0;
    let entryOfO = 0;
    
    Array.from(charCountMap.entries()).forEach(entry => {
      
      // Handle edge case

      
      
      if(entry[0] === 'o') {
        entryOfO = entry[1];
      } else if(maxEntry < entry[1]) {
        maxEntry = entry[1];
      }
    });
    
    // Compute the number of stickers
    return Math.max(Math.ceil(entryOfO / 2), maxEntry);
    
  }

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine();
    let result = stickerCount('beaksmp');
    console.log(result);
    return [result];
}

module.exports = {
    main: main
}


// Welcome to Facebook!

// This is just a simple shared plaintext pad, with no execution capabilities.

// When you know what language you would like to use for your interview,
// simply choose it from the dropdown in the top bar.

// Enjoy your interview!
  
  
// "facebook"
// "beak" => 1
// "coffeekebab" => 3
  
  /*
  
  charCountMap{
    c = 1,
    o = 1,
    f = 2,
    e = 3,
    k = 1
    b = 2,
    a = 1
  
  }
  
  maxEntry = 3
  entryOfO = 1
  
  
  
  
  */
  
  
  
  
//   const stickerCount = (word) => {
    
//     // Initialize the map
//     const len = word.length;
//     const charCountMap = new Map();
    
//     // Iterate the word
//     for(let i = 0; i < len; i++ ) {
      
//       const currentChar = word[i];
      
//       // increment the counter on the map
//       if(charCountMap.has(currentChar)) {
//         charCountMap.set(currentChar, charCountMap.get(currentChar) + 1);
//       } else {
//         charCountMap.set(currentChar, 1);
//       }
      
//     }
    
//     // get map values
//     // find the largest value
//     let maxEntry = 0;
//     let entryOfO = 0;
    
//     Array.from(charCountMap.entries()).forEach(entry => {
      
//       // Handle edge case
//       if(!refMap.has(entry[0])){
//         return -1;
//       }
      
      
//       if(entry[0] === 'o') {
//         entryOfO = entry[1];
//       } else if(maxEntry < entry[1]) {
//         maxEntry = entry[1];
//       }
//     });
    
//     // Compute the number of stickers
//     return Math.max(Math.ceil(entryOfO / 2), maxEntry);
    
//   }

