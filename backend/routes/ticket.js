import express from 'express'
import { getTicket, getTickets, createTicket } from '../controllers/ticketController.js'
import { authenticate } from '../middlewares/auth.js'
const router = express.Router()

router.get('/', authenticate, getTickets)
router.get('/:id', authenticate, getTicket)
router.post('/', authenticate, createTicket)


export default router