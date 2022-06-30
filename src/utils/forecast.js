const request = require ('request');

const geoweather = (latitude,longitude,callback)=>{
const url =  'http://api.weatherstack.com/current?access_key=db5e7431f8c549610424abefb0eab568&query=' + latitude + ','+ longitude  
request ({url, json:true}, (error, {body}) =>{
      if (error){
        callback('Weather info not found',undefined)
          }
    else if (body.error){
        callback('Waether service not found', undefined )
    
    }
    else {
        callback (undefined,
            'the timezone id : ' + body.location.timezone_id +
             "\n"+ ' the latitude: '+  body.location.lat+
             "\n"+ ' the longitude '  + body.location.lon +
             "\n"+ ' the temperature ' + body.current.temperature)

        }  
    
    }) 
}

module.exports= geoweather