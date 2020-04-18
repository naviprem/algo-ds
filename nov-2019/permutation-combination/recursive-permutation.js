function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * 
 * @param {*} arr - Array of elements to permute
 * @param {*} ptr - Pointer starts with zero
 * @param {*} n - length of array
 * @param {*} r - length of result array
 */
function rPermutation(arr, ptr, n, r) {
    if(ptr === r) console.log(`ptr=${ptr}, arr=${arr.slice(0, ptr)}`);
    for (let i = ptr; i < n; i++) {
        swap (arr, i, ptr);
        rPermutation(arr, ptr + 1, n, r);
        swap(arr, i, ptr)
    }  
}

rPermutation([1, 2, 3, 4], 0, 4, 3)