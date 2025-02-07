import { LogOut, Menu, Search } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';
import { useMediaStore } from '../store/media';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const { setMediaType } = useMediaStore();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <header className=' max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            <Link to='/' className='flex items-center'>
                <img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
            </Link>

            <div className="hidden sm:flex gap-2 items-center">
                <Link to="/" className='hover:underline' onClick={() => setMediaType('movies')}>Movies</Link>
                <Link to="/" className='hover:underline' onClick={() => setMediaType('tv')}>TV Shows</Link>
                <Link to="/history" className='hover:underline'>Search History</Link>
            </div>

            <div className='flex gap-2 items-center z-50'>
                <Link to="/search" >
                    <Search className='size-6 cursor-pointer' />
                </Link>
                <img src={user.profilePicture} alt="Avatar" className='cursor-pointer h-8 rounded' />
                <LogOut className='size-6 cursor-pointer' onClick={logout} />

                <div className="sm:hidden">
                    <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800 text-white">
                    <Link
                        to="/"
                        className='block hover:underline p-2'
                        onClick={() => { 
                            setMediaType('movies');
                            setIsMobileMenuOpen(false);
                        }}
                    >Movies</Link>
                    <Link
                        to="/"
                        className='block hover:underline p-2'
                        onClick={() => { 
                            setMediaType('tv');
                            setIsMobileMenuOpen(false);
                        }}
                    >TV Shows</Link>
                    <Link to="/history" className='block hover:underline p-2' onClick={() => setIsMobileMenuOpen(false)}>Search History</Link>
                </div>
            )}
        </header>
    )
}

export default Navbar