const request = require('request')

const forecast = (latitude , longitude , callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ee5dd393196fd87cfa826fba4f20dc90&query=' + latitude + ',' + longitude

    request({ url, json: true } , (error , { body } = {}) => {

        if(error){
            callback('Unable to connect to the weather forecast' , undefined)
        }
        else if(body.error){
            callback('Invalid latitude or longitude' , undefined)
        }
        else{
            const weatherData = {
                time: body.current.observation_time,
                humidity: body.current.humidity,
                wind: body.current.wind_dir + ' ' + body.current.wind_speed + "KM/h",
                cloudCover: body.current.cloudcover,
                temperature: body.current.temperature,
                description: body.current.weather_descriptions,
                feelsLikeTemperature: body.current.feelslike,
                visibility: body.current.visibility
            }
            callback(undefined , weatherData)      
        }

    })

}

module.exports = forecast