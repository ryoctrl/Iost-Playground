const IOST = require('iost');
const bs58 = require('bs58');
const IOST_HOST = process.env.IOST_HOST;

const request = async function(address, accountId, key, action, rpcArgs) {
    if(!accountId || !key || !action || !rpcArgs) {
        return false;
    }

    const iost = new IOST.IOST({
        gasRatio: 1,
        gasLimit: 2000000,
        delay: 0,
        expiration: 90,
    });

    const rpc = new IOST.RPC(new IOST.HTTPProvider(IOST_HOST));
    iost.setRPC(rpc);

    const account = new IOST.Account(accountId);
    const kp = new IOST.KeyPair(bs58.decode(key));
    account.addKeyPair(kp, 'owner');
    account.addKeyPair(kp, 'active');

    iost.setAccount(account);

    const tx = iost.callABI(address, action, rpcArgs);
    account.signTx(tx);

    return new Promise((resolve, reject) => {
        const success = function(res) {
            console.log('success');
            console.log(res);
            resolve(res);
        };

        const failed = function(res) {
            console.log('failed');
            console.log(res);
            reject(res);
        }

        const pending = function(res) {
            console.log('pending');
            console.log(res);
        }
        
        iost.signAndSend(tx)
            .on('pending', pending)
            .on('success', success)
            .on('failed', failed);
    });
}

module.exports = {
    request
}

