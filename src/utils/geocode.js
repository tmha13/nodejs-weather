const request = require('postman-request')

const geocode = (address, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    + encodeURIComponent(address) 
    + ".json?access_token=pk.eyJ1IjoidG1oYTEzIiwiYSI6ImNrdm5jdThlaWR4YTIycG1hd2k1Mmp2d3EifQ.mcOoCoNUrBkt8xddz713ww"

    request({url, json: true }, (error, { body }) => {
        if(error) {
            callback({
                error: 'Unable to connect to location service'
            }, undefined)
        }
        else if(body.features.length === 0) {
            callback({
                error: 'Unable to find location. Try another search'
            }, undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode