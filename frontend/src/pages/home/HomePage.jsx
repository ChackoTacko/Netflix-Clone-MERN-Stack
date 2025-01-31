import React from 'react';
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';

const HomePage = () => {
    const user = false;
  return (
    <div className='bg-black h-screen'>
        {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage