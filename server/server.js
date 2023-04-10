const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")
const dotenv = require("dotenv").config()
const serverless = require('serverless-http');

connectDb()
const app = express()

app.use(express.json())
app.use('/api/user',require("./routes/userRoutes"))
app.use(errorHandler)

const port = process.env.PORT
const cloudENV = proces.env.CLOUD_ENV

if(cloudENV!="serverless"){

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
}

module.exports.handler = serverless(app);