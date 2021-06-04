// index2.js
const { nextISSTimesForMyLocation } = require('./iss_promised');

// see index.js for printPassTimes 
// copy it from there, or better yet, moduralize and require it in both files

// Call
const fullDate = (time) => {
  const datetime = new Date(0);
  datetime.setUTCSeconds(time);
  return datetime;
};
const printPassTimes = (passTimes) => passTimes.forEach(pass => console.log(`Next pass at ${fullDate(pass.risetime)} for ${pass.duration} seconds!`));
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });