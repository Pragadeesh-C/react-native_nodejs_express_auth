const express = require('express')
const {registerUser, loginUser} = require('../controllers/userController')
const validateToken = require('../middleware/validateToken')
const invalidateToken = require('../middleware/invalidateToken')

const router = express.Router()


router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/validate",validateToken)
router.post('/invalidateToken',invalidateToken)

module.exports = router