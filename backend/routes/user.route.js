import express from 'express'
import { login, logout, signup, updateUser, getAllUser, getCurrentUser } from '../controllers/user.controller.js'
import { authenticate, authorizedRoles } from '../middlewares/auth.js'
const router = express.Router()

router.post('/update-user', authenticate, updateUser)
router.get('/users', authenticate, authorizedRoles(["lab_assistant", "admin"]), getAllUser);
router.get('/current-user', authenticate, getCurrentUser)

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)


export default router