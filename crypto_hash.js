const crypto=require('crypto')
// const hexToBinary=require("hex-to-binary");

const cryptohash=(...inputs)=>{
    const hash=crypto.createHash('sha256');
    hash.update(inputs.join(''))
    return (hash.digest('hex'));

}

const result=cryptohash("hello","world");
module.exports=cryptohash;