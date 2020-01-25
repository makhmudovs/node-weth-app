const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoibWFraG11ZG92cyIsImEiOiJjazVtM2V5Z3IwdmtxM2tuNTRqNGR6MW52In0.dJPC1HoZt0NOY8a8ZdtwyQ&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        long: body.features[0].center[1],
        lat: body.features[0].center[0]
      });
    }
  });
};

module.exports = geocode;
