const express = require('express')
const invalidToken = require('../models/tokenSchema')
const AsyncHandler = require('express-async-handler')

const invalidateToken = AsyncHandler(async (req, res, next) => {
    const accessToken = req.body.token
    await invalidToken.create({
        invalid_tokens:accessToken
    }).then(res.status(200).json({'Success':"success"}))
})

module.exports = invalidateToken