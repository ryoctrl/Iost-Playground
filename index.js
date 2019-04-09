if(process.argv.length < 5) {
    const message = `
USAGE: node index.js $account $privateKey $methodName $methodargs1 $methodargs2
ex: node index.js admin xxxxxxxxxxxxx purchase someitem
`;
    console.log(message);
    return;
}

require('dotenv').config();
const iost = require('./iost-helper');

const CONTRACT_ADDR = process.env.CONTRACT_ADDR;

if(!process.env.IOST_HOST || !CONTRACT_ADDR) {
    const message = `IOST_HOST or CONTRACT_ADDR environment variable has not been set.
        current variables are below.
        IOST_HOST: ${IOST_HOST}
        CONTRACT_ADDR: ${CONTRACT_ADDR}
        please add these variables to '.env' file.
    `;
    throw new Error(message);
    return;
}

const args = process.argv.slice(2);
const account = args.shift();
const privKey = args.shift();
const action = args.shift();

console.log(`invoke by: ${account}`);
console.log('private key not print for security');
console.log(`invoke method: ${action}`);
console.log(`passes args with: ${args}`);


iost.request(CONTRACT_ADDR, account, privKey, action, args);
