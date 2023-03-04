const INITIAL_DIFFICULTY=4;
const MINE_RATE=1000;
const GENESIS_DATA={
    timestamp:1,
    prevHash:"0000",
    hash:"0xdfeaade",
    difficulty:INITIAL_DIFFICULTY,
    nonce:0,
    data:[],
}
module.exports={GENESIS_DATA,MINE_RATE}
