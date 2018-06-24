// generates a dummy set of data for the ATLAS communities panel
const fs = require('fs');

const COMMUNITY_COUNT = 5000; // the total number of dummy communities to create
const OUTPUT_FILENAME = 'data';

// possible characters for community names
const CHARS = 'AÁBCDEÉFGHIÍJKLMNÑOÓPQRSTUÚÜVWXYZaábcdeéfghiíjklmnñoópqrstuúüvwxyz ';

/**
 * generates a pseudo random integer between the given min and max value
 * options {Object}
 *   options.min {Number} - The minimum random value, DEFAULT = 0
 *   options.max {Number} - The maximum random value
 */
const randomInteger = ({ min = 0, max } = {}) => (Math.floor(Math.random() * (max - min)) + min);

// the output data
let out = {
  name: 'Alta Verapaz',
  communities: [],
};

// generate the community data
for (let i = 0; i < COMMUNITY_COUNT; i++) {
  let name = '';
  // create a random name of variable length
  const nameLength = randomInteger({ min: 4, max: 22 });
  for (let j = 0; j < nameLength; j++) {
    name += CHARS.charAt(randomInteger({ max: CHARS.length }));
  }

  // create a random number of cases at each community
  // bound the value to 1 order of magnitude of the total number of communities
  // not sure why to bound with this, it just sounded good
  let cases = randomInteger({ max: COMMUNITY_COUNT * 10 });
  
  // write the community data to the output data structure
  out.communities.push({ name, cases });
}

// write the output to the file system
fs.writeFile(`${OUTPUT_FILENAME}.json`, JSON.stringify(out, null, 2), (err) => {
  if (err) throw err;
  console.log(`${OUTPUT_FILENAME}.json has been saved!`)
});
