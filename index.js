const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  const fullDate = (time) => {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time);
    return datetime;
  };
  passTimes.forEach(pass => console.log(`Next pass at ${fullDate(pass.risetime)} for ${pass.duration} seconds!`));
});



