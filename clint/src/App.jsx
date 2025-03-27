import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { checkAuth } from './Features/authSlice.js';
import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import Setting from './pages/Setting/Setting.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Hero from './pages/Hero/Hero.jsx';
import { Loader } from 'lucide-react';
import {Toaster} from 'react-hot-toast'


function App() {

  const dispatch = useDispatch();

  const authUser = useSelector(state => state.auth.authUser);
  const isCheckingAuth = useSelector(state => state.auth.isCheckingAuth);

  useEffect(() => {
    dispatch(checkAuth());
  },[dispatch])

  if(isCheckingAuth && !authUser){
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Hero/>,
      children: [
        {
          path: '',
          element: authUser ? <Home /> : <Navigate to='/login' />
        },
        {
          path: 'signup',
          element: authUser ? <Home /> : <Signup />
        },
        {
          path: 'login',
          element: authUser ? <Home /> : <Login />
        },
        {
          path: 'setting',
          element: authUser ? <Setting /> : <Navigate to='/login' />
        },
        {
          path: 'profile',
          // element: authUser ? <Profile /> : <Navigate to='/login' />
          element: <Profile />
        }
      ]
    }
  ])


  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
