const AsyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const invalidTokens = require('../models/tokenSchema')

const validateToken = AsyncHandler(async (req, res, next) => {
    let authHeader = req.headers.authorization || req.headers.Authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        let token = authHeader.split(" ")[1]
        const invalidTokensObj = await invalidTokens.find()
        const invalidTokensList = invalidTokensObj.map(tokens => tokens.invalid_tokens)
        if(invalidTokensList.includes(token)){
            res.status(401)
            throw new Error("Invalid Token")
        }
        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error("User not authorized")
            }
            req.user = decoded.user
            res.json(req.user)
            next()
        })
        if (!token) {
            res.status(401)
            throw new Error("User is not authorized or token is missing. Login again")
        }
    }
})

module.exports = validateToken