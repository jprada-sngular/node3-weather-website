// Usando destructuring y property shorthand

const request = require ('postman-request')

const weather = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ef08351d916db84463a9e898cf0616e8&query=${lat},${lon}&units=m`

    request({url, json: true}, (error, {body}) => {        
        if (error) {
            callback('Unable to connect to weather server', undefined)
            return
        }
    
        if (body.error) {
            callback('Unable to find location', undefined)
            return
        }
    
        //const iconHtml = `<img src="${body.current.weather_icons[0]}" alt="${body.current.weather_descriptions[0]}">`
        const msg = `
            ${body.current.weather_descriptions[0]}.
            It is currently ${body.current.temperature} degrees out.
            It feels like ${body.current.feelslike} degrees out.
            Precipitation chance: ${body.current.precip}.
            Observation time was ${body.current.observation_time}
        `

        callback(undefined, msg.trim())
    })
}

module.exports = weather