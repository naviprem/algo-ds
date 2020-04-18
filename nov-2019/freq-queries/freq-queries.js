let inputString = '';
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

function main(data) {
    inputString = data;

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().split(' ');
    }

    return freqQuery(queries);
}

function increment(map, key) {
    let newVal = 1;
    if(map.has(key)) {
        newVal = map.get(key) + 1;
    } 
    map.set(key, newVal);
    return newVal;
}

function decrement(map, key) {
    let oldVal = 0;
    if(map.has(key)) {
        oldVal = map.get(key);
        const newVal = oldVal - 1;
        if (newVal > 0) {
            map.set(key, newVal)
        } else { 
            map.delete(key)
        }
    }
    return oldVal;
}

function freqQuery(queries) {
    const result = [];
    const f1Map = new Map();
    const f2Map = new Map();
    queries.forEach(query => {
        switch (query[0]) {
            case '1':
            const newVal = increment(f1Map, query[1]);
            increment(f2Map, newVal);
            if(newVal > 1) {
                decrement(f2Map, newVal - 1);
            }
            break;

            case '2':
            const oldVal = decrement(f1Map, query[1]);
            if(oldVal > 0) {
                decrement(f2Map, oldVal);
            }
            if(oldVal > 1) {
                increment(f2Map, oldVal - 1);
            }
            break;

            case '3':
            result.push(f2Map.has(parseInt(query[1])) ? 1 : 0);
            break;
        }
    });
    return result;
}

module.exports = {
    main: main
}