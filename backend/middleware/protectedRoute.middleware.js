import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js';
import { StatusCodes } from 'http-status-codes';

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-netflix'];
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Unauthorized - No Token Provided' });
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if (!decoded) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Unauthorized - Invalid Token' });
        }

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'Unauthorized - User Not Found' });
        }

        req.user = user;

        next()
    } catch (error) {
        console.log('Error in protectedRoute middleware:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
}