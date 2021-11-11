const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Config express
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Argument: page section (default, /help, /about)
// Function: actions to take upon visiting each section
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Trinh Ha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Trinh Ha' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Trinh Ha',
        help_msg: 'Welcome to weather app. How can we help?'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provive an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) return res.send(error)
    
        forecast(latitude, longitude, (error, {weather_desc, temperature, feelslike}) => {
            if(error) return res.send(error)

            res.send({
                forecast: weather_desc + '. It is currently ' + temperature + ' degrees out. Feels like ' + feelslike,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Trinh Ha',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Trinh Ha',
        errorMessage: 'Page does not exist'
    })
})

// Start the server up
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})