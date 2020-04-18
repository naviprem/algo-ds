/**
 * 
 * destroyer([1, 2, 3, 2, 3, 1], 2, 3) - 
 * Should return [1, 1] as we remove all the 2's and 3's from the provided array.
 */

// function destroyer() {
//     let arr = arguments['0'];
//     Object.values(arguments)
//     .slice(1)
//     .forEach(e => {
//         arr = arr.filter(x => x !== e);
//     });
//     return arr;
// }

function destroyer(arr) {
    return arr.filter(a => !Object.values(arguments).slice(1).find(x => x === a));
}
console.log(destroyer([4,5,6,7,2,3,6,4,5,7,8], 5, 6));