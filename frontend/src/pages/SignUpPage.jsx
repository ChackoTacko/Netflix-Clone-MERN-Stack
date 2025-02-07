// Desc: Sign up page for new users to create an account

// Package Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

// Auth Store
import { useAuthStore } from '../store/authUser';

const SignUpPage = () => {
    const { searchParams } = new URL(window.location);
    const emailValue = searchParams.get('email');
    const [email, setEmail] = useState(emailValue || '');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const { signup } = useAuthStore();


    const handleSubmit = (e) => {
        e.preventDefault();
        signup({ email, password, username });
    };

    return (
        <div className='h-screen w-full hero-bg'>
            <Header />

            <div className="flex justify-center items-center mt-20 mx-3">
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                    <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>
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
                            <label htmlFor="username" className='text-sm font-medium text-gray-300'>Username</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                                placeholder='John Doe'
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
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

                        <button className="w-full py-2  bg-netflix-red text-white font-semibold rounded-md hover:bg-red-700">Sign Up</button>
                    </form>
                    <div className="text-center text-gray-400">
                        Already a member?{" "}
                        <Link to={"/login"} className="text-red-500 hover:underline">Sign In</Link>
                    </div>
                </div>
            </div>

            <Footer className="absolute bottom-0 w-full"/>
        </div>
    );
};

export default SignUpPage;