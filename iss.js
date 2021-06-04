const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  const URL_IP = 'https://api.ipify.org?format=json';
  request(URL_IP, (error, response, bodyIp) => {
    error = error || ((response.statusCode !== 200) && Error(`Status Code ${response.statusCode} when fetching IP. Response: ${bodyIp}`));
    if (error) callback(error, null);
    const URL_GEO = 'https://freegeoip.app/json/';
    request(`${URL_GEO}${JSON.parse(bodyIp)['ip']}`, (error, response, bodyGeo) => {
      error = error || ((response.statusCode !== 200) && Error(`Status Code ${response.statusCode} when getting geolocation. Response: ${bodyGeo}`));
      if (error) callback(error, null);
      const { latitude, longitude } = JSON.parse(bodyGeo);
      const URL_ISS = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
      request(URL_ISS, (error, response, bodyIss) => {
        if (error) callback(error, null);
        if (response.statusCode !== 200) {
          callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${bodyIss}`), null);
        }
        const passes = JSON.parse(bodyIss).response;
        callback(null, passes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };