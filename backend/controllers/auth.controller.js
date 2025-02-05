import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "All fields are required" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Email, Password, and Username validation
        if (!emailRegex.test(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Invalid email address" });
        }

        if (password.length < 6) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        const existingUserByEmail = await User.findOne({ email });

        if (existingUserByEmail) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Email already exists" });
        }

        const existingUserByUsername = await User.findOne({ username });

        if (existingUserByUsername) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate a random profile picture
        const stockProfilePictures = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const profilePicture = stockProfilePictures[Math.floor(Math.random() * stockProfilePictures.length)];

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            profilePicture,
        });

        if (newUser) {
            // Generate a JWT token and set it as a cookie
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(StatusCodes.CREATED).json({ success: true, message: "User created successfully", user: { ...newUser._doc, password: '' } });
        }


    } catch (error) {
        console.log('Error in signup controller:', error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
};

export async function logout(req, res) {
    try {
        res.clearCookie('jwt-netflix');
        res.status(StatusCodes.OK).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error in logout controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
};

export async function login(req, res) {
    try {
        const { email, password} = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "All fields are required" });
        }

        // Email and Password validation
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(StatusCodes.OK).json({ success: true, message: "Logged in successfully", user: { ...user._doc, password: '' } });
        
    } catch (error) {
        console.log('Error in login controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
};

export async function authCheck(req, res) {
    try {
        res.status(StatusCodes.OK).json({ success: true, user: req.user });
    } catch (error) {
        console.log('Error in authCheck controller:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal Server Error' });
    }
};