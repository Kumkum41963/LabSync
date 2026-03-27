import express from 'express'
import { login, logout, signup, updateRoles, updateSkills, getAllUsers, getCurrentUser, getUserById } from '../controllers/user.controller.js'
import { authenticate, authorizedRoles } from '../middlewares/auth.js'
const router = express.Router()

router.put('/:id/update-role', authenticate, authorizedRoles(["lab_assistant", "admin"]), updateRoles)
router.put('/:id/update-skills', authenticate, authorizedRoles(["lab_assistant", "admin", "moderator"]), updateSkills)
router.get('/users', authenticate, authorizedRoles(["lab_assistant", "admin"]), getAllUsers);
router.get('/current-user', authenticate, getCurrentUser)
router.get('/:id/user', getUserById)

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)


export default router