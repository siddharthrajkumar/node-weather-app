const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8adcad9cb5ada9fe06080277831f94f2&query=${latitude},${longitude}&units=m`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location for provided co-ordinates!', undefined)
        }else {
            const { temperature, feelslike, weather_descriptions, humidity, precip, uv_index, cloudcover} = body.current
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. There is a ${precip}% chance of rain. 
                     The humidity is at ${humidity}%. UV index is ${uv_index} and the cloud cover is ${cloudcover}.`)
        }
    })
}

module.exports = forecast