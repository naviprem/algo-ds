function main (data) {
    inputString = data;
    const nr = readLine().replace(/\s+$/g, '').split(' ');
    const n = parseInt(nr[0], 10);
    const r = parseInt(nr[1], 10);
    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    return countTriplets(arr, r);
}

let inputString = '';
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

// function factorial (n) {
//     if(n == 1) {
//         return 1;
//     } else {
//         return n * factorial(n - 1);
//     }
// }

function countTriplets(arr, r) {
    const elementCountMap = new Map();
    arr.forEach((element, i) => {
        if(!elementCountMap.has(element)) {
            elementCountMap.set(element, []);
        }
        elementCountMap.get(element).push(i);
    });
    let result = 0;
    if (r === 1) {
        Array.from(elementCountMap.keys()).forEach((element, i) => {
            const n = elementCountMap.get(element).length;
            if(n > 3) {
                result += (n * (n-1) * (n-2))/6;
            }
        });
    } else {
        arr.forEach((element, t1Index) => {
            const t2 = element * r;
            const t3 = element * r * r;
    
            if(elementCountMap.has(t2) && elementCountMap.has(t3)) {
                elementCountMap.get(t2).filter(j => j > t1Index).forEach(t2Index => {
                    result += elementCountMap.get(t3).filter(j => j > t2Index).length;
                })
            }
        });
    }
    return [result];
    

}

module.exports = {
    main: main
}

