import React, { useEffect } from 'react'
import './Navbar.css'
import logo from '../../image/Chatify_Logo.png'
import { Loader, LogOut, Settings, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, handleLogout } from '../../Features/authSlice'
import toast from 'react-hot-toast'

const Navbar = () => {

  const dispatch = useDispatch();

  const authUser = useSelector(state => state.auth.authUser);
  const isLogout = useSelector(state => state.auth.isLogout);

  const navigate = useNavigate();

  const handleLogoutButton = async () => {
    // dispatch(handleLogout())
    // .then((res) => {
    //   if(res.payload?.success === false || res.payload?.success === 'false'){
    //     toast.error(`${res.payload?.message}`);
    //     return;
    //   }
    //   toast.success(`${res.payload?.message}`);
    //   navigate('/login', { replace: true });
    // })
    // .catch((err) => {
    //   console.log(err);
    //   toast.error('Something went wrong, please try again.');
    // })
    try {
      const res = await dispatch(handleLogout());
      if(res.payload?.success === false || res.payload.success === 'false'){
        toast.error(`${res.payload?.message}`)
        return;
      }
      // await dispatch(checkAuth());
      console.log('inside navbar', authUser);
      toast.success(`${res.payload?.message}`);
      navigate('/login', { replace: true });
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try again.');
    }
  }

  useEffect(() => {
      if (authUser === null) {
        navigate('/login', { replace: true });
      }
    }, [authUser === null]);

  if(isLogout){
    return(
      <div className='h-screen flex justify-center items-center'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <>
      <nav className='nav bg-base-200'>
        <Link to='/'>
          <div className="logo">
            <img src={logo} alt="logo" loading='lazy'/>
            <h1>Chatify</h1>
          </div>
        </Link>
        {
          authUser && 
          <div className="icons">
            <button className="setting-icon">
              <Settings />
              <p>Settings</p>
            </button>
            <button className="profile-icon">
              <User />
              <p>Profile</p>
            </button>
            <button className="logout-icon" onClick={handleLogoutButton}>
              <LogOut />
              <p>Logout</p>
            </button>
          </div>
        }
      </nav>
    </>
  )
}

export default Navbar
