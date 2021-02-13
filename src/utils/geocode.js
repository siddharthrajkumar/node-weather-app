const request = require('request')

const geocode = (address, callback) => {
    // Geocoding
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2lkZGhhcnRocmFqa3VtYXIiLCJhIjoiY2trdmZqd3NpMXZ6NzJ3bnl1eWVhcjc2MCJ9.DsbQ-A_JGuIsRczcW_2Wgw&limit=1`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the geocoding service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try a different one', undefined)
        }else {
            const { features } = body
            const { place_name, center } = features[0]
            // center[0] - Longitude, center[1] - Latitude
            callback(undefined, { 
                longitude: center[0],
                latitude: center[1], 
                location: place_name 
            })
        }
    })
}

module.exports = geocode