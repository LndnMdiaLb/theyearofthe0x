const fs = require("fs");
const path = require("path");

const Twit = require("./src/twit-credentials");
const twitterInterface = require("./src/search-interface")(Twit);
const BigNumber = require('bignumber.js');

const {
  searchTweets,
} = twitterInterface ;

const searchTerm = 'theyearofthe0x'

const manifestFile = path.join(process.cwd(),'/json', `manifest.json`);
const manifest = JSON.parse(fs.readFileSync(manifestFile));
const searchDataFile = path.join(process.cwd(), '/json', /*`/${searchTerm}`,*/ `${Date.now()}.json`);

// const searchObj = { 
//   q: `#${searchTerm}`, 
//   since_id:manifest.lastId
// };

async function search(){

  const searchObj = { 
    q: `#${searchTerm}`, 
    since_id:manifest.lastId
  };
  
  const data = await searchTweets(searchObj);
  
  const lastIdBn = data.reduce((lastId_bn, { id_str: id })=> {
    const id_bn = new BigNumber(id);   
    return lastId_bn.isGreaterThan(id_bn)? lastId_bn : id_bn ; 
  }, new BigNumber(manifest.lastId));
  
  manifest.searches++;
  manifest.lastId = lastIdBn.plus(1);
  manifest.tweets += data.length;
  
  fs.writeFileSync(manifestFile, JSON.stringify(manifest));  
  fs.writeFileSync(searchDataFile, JSON.stringify(data));
   
}

search();
