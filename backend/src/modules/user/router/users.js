`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'

router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/profile/:userId', userController.getUserProfile)
router.put('/update', userController.updateUserProfile)


router.get('/project/all', userController.allProjects)

module.exports = router
