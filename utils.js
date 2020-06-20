const request=require('request')
const geocode=(address,callback)=>{
    geourl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidG9tZXJ0dXNoYXIiLCJhIjoiY2tiM2ZueG9yMDFkMzJxcGQweG1jd3l4eCJ9.v4FlvjErqltntSSrADVmWA'
    request({url: geourl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect!',undefined)
        }else if(response.body.features.length===0){
            callback('Please provide the relevent url!',undefined)
        }else{
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}
const weathercode=(name,callback)=>{
    url='http://api.openweathermap.org/data/2.5/weather?q='+ name +'&appid=5b3aff165207c164a0e9c2450c8297d0&units=metric'
    request({url:url,json:true},(error, response)=>{
        if(error){
            callback('Check your connection!')
        }else if(response.body.message){
            callback('Type the correct Loaction!!')
        }else{
            callback(undefined,{
                temperture: response.body.main.temp,
                humidity: response.body.main.humidity,
                weather:response.body.weather[0].main
            })
        }
    })
}
module.exports={
    geocode,
    weathercode
}