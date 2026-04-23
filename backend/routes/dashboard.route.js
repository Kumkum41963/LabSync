import express from 'express'
import { authenticate } from '../middlewares/auth.js';
import { getDashboard } from '../controllers/dashboard.controller.js';
const router = express.Router();

// Define the GET route for the dashboard home
router.get('/', authenticate, getDashboard);

export default router;