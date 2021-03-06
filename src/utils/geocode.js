const request = require('request')


const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamliYW5qeW90aW5heWFrIiwiYSI6ImNsNDJkeDc1eTAzbGMzYmxsOTJoYm91eWgifQ.q6LdzEByUs2cs7iBMQcpGA&limit=1";
    request({ url, json: true }, (error, {body}) => {
        if (error) {
          callback("unable to find the service", undefined);
        } else if (body.features.length === 0) {
          callback("unable to find location. Try another search", undefined);
        } else {
          callback(undefined, {
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name 
          })
        }
      }) 
  }
  
  module.exports= geocode