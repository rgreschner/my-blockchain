# My Blockchain - Sample blockchain using LotionJS

This is an example of writing a simple Tendermint consensus powered blockchain using the [LotionJS](https://lotionjs.com/) Framework in TypeScript/ES5.

Done as part of an assignment for School of AI's Decentralized Apps Course by [@llSourcell]( https://github.com/llSourcell) / Siraj Raval.

## Getting Started

Instructions for getting started with this repository's two subprojects, test client & actual blockchain, are detailed here.

### Prerequisites

To build and run these project the following prerequisites must be met:

* Node.js in at least v8.10.0
* Operating System capable of running all imported NPM modules, only tested on Ubuntu Linux so far
* TypeScript compiler in v3.1.6 (`npm i -g typescript@3.1.6`)

### Build Instructions

The build instructions for both projects are the same.

After navigating to the corresponding project directory in `packages`, install NPM dependencies and execute `npm run build` on the command-line in this directory to build the subproject.
The compiled JavaScript files are contained in the subfolder `./dist`.

E.g. to build the blockchain sample use

```
> cd packages/my-blockchain
> npm i
> npm run build
> ls ./dist
```

### Sample Blockchain

The project for the actual sample blockchain resides in `packages/my-blockchain`.

After building it as detailed above, execute `npm start` in the blockchain project directory to start the blockchain process.
This will output some startup information like used ports and most importantly the GCI (Global Chain Identifier) which you will need for testing the blockchain.

<p align="center"><img src="/doc/img/terminal-blockchain.gif?raw=true"/></p>

### Test Client

The project for a test client implementation using the sample blockchain resides in `packages/test-client`.

After building it as detailed above, execute `npm start <GCI>` in the blockchain project directory to start the blockchain process.
The GCI must be the Global Chain Identifier printed by the my-blockchain proces on startup.

Once started the test client will perform a simple blockchain transaction every 5 seconds which will increment a nonce counter and update a block timestamp.

<p align="center"><img src="/doc/img/terminal-test-client.gif?raw=true"/></p>

## License

This project is licensed under the terms of the **MIT** license, see `LICENSE` to check out the full license.