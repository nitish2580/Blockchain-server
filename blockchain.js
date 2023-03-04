const Block = require("./block");
const cryptoHash = require("./crypto_hash");
class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }
  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.log("hello world")
      console.log("This coming chain is not longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.log("this incoming chain is not valid");
      return;
    }
    this.chain = chain;
  }
  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      console.log("hello world");
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
      const realLastHash = chain[i - 1].hash;
      const lastDifficulty=chain[i-1].difficulty;
      if (prevHash !== realLastHash) {
        console.log("hello")
        return false;
      }
      const validateHash = cryptoHash(
        timestamp,
        prevHash,
        data,
        nonce,
        difficulty
      );
      if (hash !== validateHash) return false;
      if(Math.abs(lastDifficulty-difficulty>1))return false;
    }
    return true;
  }
  static customDifficulties(block){
    
  }
}
// const blockChain = new Blockchain();
// blockChain.addBlock({ data: "block1" });
// blockChain.addBlock({ data: "block2" });
// const result = Blockchain.isValidChain(blockChain.chain);
// // console.log(result);
// console.log(blockChain.chain);
module.exports = Blockchain;
