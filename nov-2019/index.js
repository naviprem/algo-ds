#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const jsCode = (filename, functionName) => {
    
    return `
/*
{
    "type": "node",
    "request": "launch",
    "name": "${filename}",
    "program": "\${workspaceFolder}/dec-2019/runner.js",
    "cwd": "\${workspaceFolder}/dec-2019",
    "args": ["${filename}"]
}
*/

const ${functionName} = () => {

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine();
    let result = ${functionName}(s);
    return [result];
}

module.exports = {
    main: main
}
`
}

const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("ALGO DS", {
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};


const askQuestions = () => {
    const questions = [
        {
            name: "FILENAME",
            type: "input",
            message: "Enter file name:"
        },
        {
            type: "input",
            name: "FUNCTIONNAME",
            message: "Enter function name:"
        }
    ];
    return inquirer.prompt(questions);
};

const createFile = (filename, functionName) => {
    const folderPath = `${process.cwd()}/${filename}`
    const jsFilePath = `${process.cwd()}/${filename}/${filename}.js`
    const inputFilePath = `${process.cwd()}/${filename}/${filename}.txt`
    const outputFilePath = `${process.cwd()}/${filename}/${filename}-expt.txt`
    shell.mkdir('-p', folderPath);
    shell.cd(folderPath)
    shell.touch(jsFilePath, inputFilePath, outputFilePath);
    shell.echo(jsCode(filename, functionName)).to(jsFilePath);
    return folderPath;
};

const success = (filepath) => {
    console.log(
        chalk.white.bgGreen.bold(`Done! Folder created at ${filepath}`)
    );
};

const run = async () => {
    // show script introduction
    init();

    // ask questions
    const answers = await askQuestions();
    const { FILENAME, FUNCTIONNAME } = answers;

    // create the file
    const filePath = createFile(FILENAME, FUNCTIONNAME);

    // show success message
    success(filePath);
};

run();