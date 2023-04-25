const path = require('path') // Se usa para manipular directorios

const express = require('express')
const hbs = require('hbs') // Para usar Partials

const geocode = require('./utils/geocode3')
const weather = require('./utils/weather3')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Define routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help',
        title: 'Help',
        name: 'Andrew in help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // Se define el default {} por si ocurre un error
        if (error) {
            return res.send({ error })
        }
    
        weather(latitude, longitude, (error, dataWeather) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                address: req.query.address,
                forecast: dataWeather,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help not found',
        name: 'Andrew',
        errorText: 'Help article not found'
    })
})

app.get('*', (req, res) => { // Avoid 404
    res.render('404', {
        title: 'Not found',
        name: 'Andrew',
        errorText: 'Page not found'
    })
})

// Start the server on detected port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})