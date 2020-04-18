function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
} 

function heapPermutation(arr, ptr) {
    if(ptr === 1) 
        console.log(arr);
    for(let i = 0; i < ptr; i++) {
        heapPermutation(arr, ptr - 1);
        if(ptr % 2 === 1) {
            swap(arr, 0, ptr - 1);
        } else {
            swap(arr, ptr - 1, i);
        }
    }
}

heapPermutation([1, 2, 3, 4, 5], 5);