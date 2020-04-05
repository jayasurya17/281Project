<<<<<<< HEAD
import express from 'express';
import userController from '../controller/users';

('use strict');
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/profile/:userId', userController.getUserProfile);
router.put('/update', userController.updateUserProfile);

router.post('/emulators/createtest', userController.createTest);
router.post('/emulators/fileUpload', userController.fileUpload);

router.get('/project/all', userController.allProjects);
router.get('/project/accepted/:userId', userController.acceptedProjects);
router.get('/project/details/:userId/:projectId', userController.projectsDetails);
router.post('/project/join', userController.joinProject);

router.get('/announcements/all/:userId', userController.allAnnouncements);

module.exports = router;
=======
`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'

router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/profile/:userId', userController.getUserProfile)
router.put('/update', userController.updateUserProfile)


router.get('/project/all', userController.allProjects)
router.get('/project/accepted/:userId', userController.acceptedProjects)
router.get('/project/details/:userId/:projectId', userController.projectsDetails)
router.post('/project/join', userController.joinProject)


router.get('/announcements/all/:userId', userController.allAnnouncements)

module.exports = router
>>>>>>> 02ef4d3a0db46ae415ae108f2325e78f95b63d72
