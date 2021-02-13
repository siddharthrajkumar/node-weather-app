const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8adcad9cb5ada9fe06080277831f94f2&query=${latitude},${longitude}&units=m`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location for provided co-ordinates!', undefined)
        }else {
            const { temperature, feelslike, weather_descriptions } = body.current
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees outside. It feels like ${feelslike} degrees.`)
        }
    })
}

module.exports = forecast