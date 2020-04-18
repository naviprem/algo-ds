'use strict';

const fs = require('fs');

const myArgs = process.argv;
const fileName = myArgs[2] || 'sort-01';
const solution = require(`./${fileName}/${fileName}`);



function readFileUtil() {
    return new Promise((resolve, reject) => {
        fs.readFile(`./${fileName}/${fileName}.txt`, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function writeFileUtil(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./${fileName}/${fileName}-act.txt`, data, (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
}

async function main() {
    try {
        const filedata = await readFileUtil();
        const result = solution.main(filedata.split('\n'));
        await writeFileUtil(result.join(`\n`));
    } catch (e) {
        console.error(e);
    }
}

main();