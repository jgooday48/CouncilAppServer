// imports
const express = require('express')
const cors = require('cors')
const logger = require('morgan')


// const councilRoutes = require('./routes/')


const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(logger('dev'))


// app.use('/council', councilRoutes)

app.get('/', (req, res) => {
    res.send({
        title: "Council website",
        description: "Api for council website",
        endpoints: [
            "GET    /             200",
             
        ]
    })
});



module.exports = app
