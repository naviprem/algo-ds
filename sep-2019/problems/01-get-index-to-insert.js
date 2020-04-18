/*
Return the lowest index at which a value (second argument) should be inserted into an array (first argument) once it has been sorted. The returned value should be a number.

For example, getIndexToIns([1, 2, 3, 4], 1.5) should return 1 because it is greater than 1 (which has index 0), but less than 2 (which has index 1).

Likewise, getIndexToIns([20, 3, 5], 19) should return 2 because once the array has been sorted it will look like [3, 5, 20] and 19 is less than 20 (index 2) and greater than 5 (index 1).

*/

// function getIndexToIns(arr, v) {
//     arr.push(v);
//     arr.sort((a, b) => a - b);
//     return arr.indexOf(v);
// }

// function getIndexToIns(arr, v) {
//     return [...arr, v]
//     .sort((a, b) => a - b)
//     .reduce((acc, c, i) => (c === v && acc === -1 ? i : acc), -1);
// }

function getIndexToIns(arr, v) {
    return arr.reduce((acc, c, i) => (c < v ? ++acc : acc), 0);
}

console.log(getIndexToIns([4, 5, 6, 1, 2, 7, 15], 14));