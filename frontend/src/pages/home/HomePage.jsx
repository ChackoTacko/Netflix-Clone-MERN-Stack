// Desc: Home page for the Netflix Clone

// Package Imports
import React from 'react';

//  Custom Components
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';

// Custom State Store
import { useAuthStore } from '../../store/authUser';

const HomePage = () => {
    const { user } = useAuthStore();
  return (
    <div className='h-screen'>
        {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage