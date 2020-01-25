const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/0b12d8346e17f93fbf5d4cf9983add70/${long},${lat}?limit=1&units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          body.currently.temperature +
          ' degress out. There is a ' +
          body.currently.precipProbability +
          '% chance of rain.'
      );
    }
  });
};

module.exports = forecast;
