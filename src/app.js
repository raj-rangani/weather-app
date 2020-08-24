const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utilities/geocode')
const forecast = require('../src/utilities/forecast')

const app = express()

// configure paths for express
const dirPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// render static pages to browser using express
app.use(express.static(dirPath))

// setup view engine
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

app.get('' , (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Raj patel'
    })
})

app.get('/about' , (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Raj patel'
    })
})

app.get('/help' , (req, res) => {
    res.render('help' , {
        title: 'Help',
        name: 'Raj patel'
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.address){
        return res.send({
            Error: 'Address is not available' 
        })
    }

    geocode(req.query.address , (error , {latitude, longitude, location} = {}) => {
        if(error)
            return res.send({
                error
            })

        forecast(latitude, longitude, (error , { cloudCover, description, feelsLikeTemperature, humidity, temperature, time, wind, visibility} = {}) => {
            if(error)
                return res.send({
                    error
                })

            res.send({
                location,
                cloudCover,
                description,
                feelsLikeTemperature,
                humidity,
                temperature,
                time,
                wind,
                visibility,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*' , (req, res) => {
    res.render('error' , {
        error: 'Help Article Not Found'
    })
})

app.get('*' , (req, res) => {
    res.render('error' , {
        error: 'Page Not Found'
    })
})

app.listen(3000 , () => {
    console.log('server is up and running')
})