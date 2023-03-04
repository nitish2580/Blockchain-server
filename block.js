const { GENESIS_DATA,MINE_RATE } = require("./config")
const cryptoHash = require("./crypto_hash")
const hexToBinary=require('hex-to-binary')
class Block {
  constructor({ timestamp, data, prevHash, hash, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  static genesis() {
    return new this(GENESIS_DATA);
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const {difficulty}=originalBlock;
    const difference= timestamp-originalBlock.timestamp;
    if(difference<1) return 1;
    if(difference>MINE_RATE) return difficulty-1;
    return difficulty+1;
  }

  static mineBlock({ prevBlock, data }) {
    const prevHash = prevBlock.hash;
    let hash, timestamp;
    let nonce = 0;
    let { difficulty } = prevBlock;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty=Block.adjustDifficulty({
        originalBlock:prevBlock,
        timestamp,
      })
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
    } while (hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty));
    return new this({
      timestamp,
      prevHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }
}
// block1 = new Block({
//   timestamp: "01/20/2020",
//   data: "Hello world",
//   prevHash: "0xba22",
//   hash: "jladad",
// });
// const result = Block.mineBlock({
//   prevBlock: block1,
//   data: "block2",
// });
// console.log(result);
// const genesisBlock=Block.genesis();
// console.log(genesisBlock)
// const result=mineBlock({prevBlock:block1,data:"Block2"});
module.exports = Block;
