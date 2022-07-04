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
            'The timezone id  is : ' + body.location.timezone_id +
             "\n"+ '.  The latitude is : '+  body.location.lat+
             "\n"+ '.  The longitude is '  + body.location.lon +
             "\n"+ '.  The temperature is ' + body.current.temperature +
             '\n' + 'and the the local time is '+ body.location.localtime)

        }  
    
    }) 
}

module.exports= geoweather