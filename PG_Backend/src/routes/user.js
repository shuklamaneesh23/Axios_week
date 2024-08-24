import express from 'express';
import { createUser, getUsernameByEmail } from '../controllers/userController.js'; // Ensure named exports are used

const router = express.Router();

// Route to create a new user
router.post('/users', createUser);

// Route to get username by email
router.get('/users/:email', getUsernameByEmail);

export default router;
