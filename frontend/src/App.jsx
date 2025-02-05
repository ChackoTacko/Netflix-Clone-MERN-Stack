import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import WatchPage from './pages/WatchPage'
import HistoryPage from './pages/SearchHistoryPage'
import NotFoundPage from './pages/NotFoundPage'
import Footer from './components/Footer'
import { useAuthStore } from './store/authUser';
import { Loader } from 'lucide-react';
import SearchPage from './pages/SearchPage';

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <div className='app relative flex flex-col justify-between'>
      <div className="bg-black absolute top-0 left-0 -z-[1000] w-full h-full"></div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to='/login' />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to='/login' />} />
        <Route path='/history' element={user ? <HistoryPage /> : <Navigate to='/login' />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
      <Toaster />
    </div>
  )
}

export default App