const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a1bc05e88ca46c46297ef57f04fd4a76&query="
    + latitude + "," + longitude +  "&units=f"

    request({url, json: true }, (error, { body }) => {
        if(error) {
            callback({
                error: 'Unable to find location'
            }, undefined)
        }
        else if(body.error) {
            callback({
                error: 'Location doesn\'t exist.'
            }, undefined)
        }
        else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_desc: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast


