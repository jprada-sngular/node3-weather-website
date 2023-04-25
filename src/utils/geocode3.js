// Usando destructuring y property shorthand

const request = require ('postman-request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoianVhbnByYWRhc25ndWxhciIsImEiOiJjbGdxYmc5bTAwY2swM2ltc3MyeGJvNGpzIn0.cIcxFsJ_VaUSmTfry7UFaQ&limit=1`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
            return
        }
    
        if (body.features.length === 0) {
            callback('Unable to find location coordinates', undefined)
            return
        }

        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

module.exports = geocode