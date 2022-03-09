const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()


app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const universitiesRoutes = require('./routes/universitiesRoutes')

app.use('/universities', universitiesRoutes)


app.get('/', (req, res) => {
    res.json({message: "Oi Express!"})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hqxdk.mongodb.net/universitiesData?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectamos ao Mongodb porta 3000')
    app.listen(3000)
})
.catch((err) => console.log(err))


