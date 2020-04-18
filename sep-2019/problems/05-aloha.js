// const assert = require('assert'); // Uncomment this line to run test assertions.


/**
 * This problem can be represented as a Disconnected DAG (Directed Acyclic Graph)
 */

 /**
  * DAGNode represents a single node in the DAG 
  */

 


 class DAGNode {
     constructor(sy) {
         this.sy = sy;
         this.isInstalled = false;
         this.explicitlyInstalled = false;
         this.adjEdges = [];
     }
 }

 /**
  * Edge represents a directed edge between 2 DAGNodes 
  */

 class Edge {
     constructor(from, to) {
        this.from = from;
        this.to = to;
     }
 }

 /**
  * Network class represents the entire component network
  * Adjcency List is one of the common data structure used to represent graphs
  * Here, i am using a symbol table and an adjecency List to represent the network of components
  */

 class Network {
    constructor() {
        // Symbol Table
        this.syTbl = new Map();
        // Adjcensy List
        this.vList = [];
    }

    addEdge(from, to) {

        const edge = new Edge(from, to);

        let fromNode;
        let toNode;

        if(!this.syTbl.has(from)) {
            fromNode = this.addNode(from);
        } else {
            fromNode = this.vList[this.syTbl.get(from)];
        }

        if(!this.syTbl.has(to)) {
            toNode = this.addNode(to);
        } else {
            toNode = this.vList[this.syTbl.get(to)];
        }

        fromNode.adjEdges.push(edge);
        toNode.adjEdges.push(edge);

    }

    addNode(sy) {
        const node = new DAGNode(sy);
        let i = this.vList.push(node);
        this.syTbl.set(sy, --i);
        return node;
    }

    installNode(node, isExplicit) {
        // using dfs (Depth First Search) to install dependent nodes

        const visitedArray = [];
        this.dfs(this, node, visitedArray, (visitingVertex) => {
            console.log(`Installing ${visitingVertex}`);
            // console.log(this.syTbl.get(visitingVertex));
            // console.log(this.vList[1]);
            this.vList[this.syTbl.get(visitingVertex)].isInstalled = true;
        });
        this.vList[this.syTbl.get(node)].isExplicit = true;
    }

    dfs(g, visitingVertex, visitedArray, operation) {

        if(visitedArray[g.syTbl.get(visitingVertex)] !== true) {
            operation(visitingVertex);
            visitedArray[g.syTbl.get(visitingVertex)] = true;
            g.getAdj(visitingVertex).forEach(adjV => {
                this.dfs(g, adjV.to, visitedArray, operation);
            });
        }
    }

    getAdj(v) {
        return this.vList[this.syTbl.get(v)].adjEdges;
    }


    uninstallNode(node) {

        // using dfs (Depth First Search) to remove dependent nodes

        const visitedArray = [];
        this.dfs(this, node, visitedArray, (visitingVertex) => {

            console.log(`Removing ${visitingVertex}`);
            this.vList[this.syTbl.get(visitingVertex)].isInstalled = false;
        });
        this.vList[this.syTbl.get(node)].isExplicit = true;

    }

    listInstalled() {

        // Simply traverse the adjcency list and print nodes that are marked as installed

        this.vList.forEach(n => {
            if(n.isInstalled === true) {
                console.log(n.sy);
            }
        });

    }

 }

 /**
  * Command class represents a command and encapsulates utilities to decode and tokenize commands
  */

  class Command {
      constructor(cmd) {
        this.cmdStr = cmd;
        this.cmdType = '';
        this.items = [];
        const cmdTokens = cmd.split(' ');
        if(cmdTokens[0] === 'DEPEND') {
            this.cmdType = 'DEPEND';
            this.items = cmdTokens.slice(1);
        } else if(cmdTokens[0] === 'INSTALL') {
            this.cmdType = 'INSTALL';
            this.items = cmdTokens.slice(1);
        } else if(cmdTokens[0] === 'REMOVE') {
            this.cmdType = 'REMOVE';
            this.items = cmdTokens.slice(1);
        } else if(cmdTokens[0] === 'LIST') {
            this.cmdType = 'LIST';
        } else if(cmdTokens[0] === 'END') {
            this.cmdType = 'END';
        }
      }

      processCommand() {
        // output.push(this.cmdStr);
        console.log(this.cmdStr); //ECHO command
        switch (this.cmdType) {
            case 'DEPEND':
                this.processDepend();
                break;
            case 'INSTALL':
                    this.processInstall();
                break;
            case 'REMOVE':
                    this.processRemove();
                break;
            case 'LIST':
                    this.processList();
                break;
            case 'END':
                    this.processEnd();
                break;
        }
      }

      processDepend() {
        
        const fromItem = this.items[0];
        this.items.slice(1).forEach(i => {
            nw.addEdge(fromItem, i);
        });



      }

      processInstall() {
        nw.installNode(this.items[0]);
      }

      processRemove() {
        nw.uninstallNode(this.items[0]);
      }

      processList() {
        nw.listInstalled();
      }

      processEnd() {
        return;
      }

  }


/**
 * processData is the main method that processess each command and stores the output in an array to return at the end
 * @param {*} input array of commands
 */

// const output = [];
const nw = new Network();
function processData(input) {

    input.split('\n').slice(1).forEach(c => {
        const cmd = new Command(c);
        cmd.processCommand();
        
    });



    // console.log(output.join('\n'));
    // return output.join('\n'); // Uncomment this line to run test assertions.
} 




processData(
`5
DEPEND A B C
INSTALL B
INSTALL A
LIST
END`);







// // Test Cases - simple assertions

// let actualResult = processData(
// `5
// DEPEND A B C
// INSTALL B
// INSTALL A
// LIST
// END`
// );

// let expectedResult = `DEPEND A B C
// INSTALL B
// Installing B
// INSTALL A
// Installing C
// Installing A
// LIST
// B
// C
// A
// END
// `
// assert.strictEqual(expectedResult, actualResult);



// 5
// DEPEND A B C
// INSTALL B
// INSTALL A
// LIST
// END

// DEPEND A B C
// INSTALL B
// Installing B
// INSTALL A
// Installing C
// Installing A
// LIST
// B
// C
// A
// END

// 22
// DEPEND TELNET TCPIP NETCARD
// DEPEND TCPIP NETCARD
// DEPEND NETCARD TCPIP
// DEPEND DNS TCPIP NETCARD
// DEPEND BROWSER TCPIP HTML
// INSTALL NETCARD
// INSTALL TELNET
// INSTALL foo
// REMOVE NETCARD
// INSTALL BROWSER
// INSTALL DNS
// LIST
// REMOVE TELNET
// REMOVE NETCARD
// REMOVE DNS
// REMOVE NETCARD
// INSTALL NETCARD
// REMOVE TCPIP
// REMOVE BROWSER
// REMOVE TCPIP
// LIST
// END


// DEPEND TELNET TCPIP NETCARD
// DEPEND TCPIP NETCARD
// DEPEND NETCARD TCPIP
// TCPIP depends on NETCARD, ignoring command
// DEPEND DNS TCPIP NETCARD
// DEPEND BROWSER TCPIP HTML
// INSTALL NETCARD
// Installing NETCARD
// INSTALL TELNET
// Installing TCPIP
// Installing TELNET
// INSTALL foo
// Installing foo
// REMOVE NETCARD
// NETCARD is still needed
// INSTALL BROWSER
// Installing HTML
// Installing BROWSER
// INSTALL DNS
// Installing DNS
// LIST
// NETCARD
// TCPIP
// TELNET
// foo
// HTML
// BROWSER
// DNS
// REMOVE TELNET
// Removing TELNET
// REMOVE NETCARD
// NETCARD is still needed
// REMOVE DNS
// Removing DNS
// REMOVE NETCARD
// NETCARD is still needed
// INSTALL NETCARD
// NETCARD is already installed
// REMOVE TCPIP
// TCPIP is still needed
// REMOVE BROWSER
// Removing BROWSER
// Removing TCPIP
// Removing HTML
// REMOVE TCPIP
// TCPIP is not installed
// LIST
// NETCARD
// foo
// END
