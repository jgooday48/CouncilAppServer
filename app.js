// imports
const express = require('express')
const cors = require('cors')
const logger = require('morgan')


const postRouter = require('./routers/share')
const userRouter = require('./routers/user')
const tokenRouter = require('./routers/token')
const postRouter = require("./routers/post")
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(logger('dev'))


app.use('/posts', postRouter)
app.use("/tokens",tokenRouter)
app.use("/users", userRouter)
app.use("/posts",postRouter)

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
