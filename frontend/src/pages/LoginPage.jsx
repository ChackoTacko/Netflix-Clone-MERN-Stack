// Desc: Login page for users to login to their account

// Package Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import Header from '../components/Header';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO
        // axios.post('/api/auth/login', { email, password })
    };

    return (
        <div className='h-screen w-full hero-bg'>
            <Header />

            <div className="flex justify-center items-center mt-20 mx-3">
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    <h1 className='text-center text-white text-2xl font-bold mb-4'>Log In</h1>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className='text-sm font-medium text-gray-300'>Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder='example@email.com'
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className='text-sm font-medium text-gray-300'>Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder='********'
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>

                        <button className="w-full py-2  bg-netflix-red text-white font-semibold rounded-md hover:bg-red-700">Log In</button>
                    </form>
                    <div className="text-center text-gray-400">
                        Don't have an account?{" "}
                        <Link to={"/signup"} className="text-red-500 hover:underline">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;