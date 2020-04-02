`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'
import validator from '../validator'
import validation from 'express-validation'

router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/profile/:userId', userController.getUserProfile)
router.put('/update', userController.updateUserProfile)

module.exports = router
