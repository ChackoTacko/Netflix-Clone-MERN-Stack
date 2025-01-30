import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <Link to={"/"}>
                <img src="/netflix-logo.png" alt="logo" className='w-52' />
            </Link>
        </header>
    )
}

export default Header