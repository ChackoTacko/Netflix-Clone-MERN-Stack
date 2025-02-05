import express from 'express';
import { login, logout, signup, authCheck } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.middleware.js';

const router = express.Router();

router.post('/login', login);

router.post('/logout', logout);

router.post('/signup', signup);

router.get("/authCheck", protectedRoute, authCheck)

export default router;