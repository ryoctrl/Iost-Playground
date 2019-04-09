# IOST PlayGround

this repository is IOST playground by Node.js.

## USAGE

index.js is cli test tool that sends request to IOST chain.

```
$ node index.js $account $privateKey $methodName $methodargs1 $methodargs2

```

iost-helper.js provides function to sign transactions and send requests to the IOST chain.

```
const iost = require('./iost-helper');
iost.request(CONTRACT_ADDR, ACCOUNT, PRIVATE_KEY, METHOD_NAME, ArgsArray);
```








