import React, { useEffect, useState } from 'react'
import { AuthAnimation } from '../../components'
import { Eye, EyeOff, Lock, Mail, MessageSquare } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, handleLogin } from '../../Features/authSlice'

const Login = () => {

  const dispatch = useDispatch();

  const isLogin = useSelector(state => state.auth.isLogin);
  const authUser = useSelector(state => state.auth.authUser);

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const validateForm = () => {
    if(!formData.email.trim())
      toast.error('Email is required');
    else if(!formData.password.trim())
      toast.error('Password is required');
    else if(formData.password.length < 6)
      toast.error("Password must be at least 6 characters");
    else
      return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkValidate = validateForm();
    if(checkValidate){
      dispatch(handleLogin(formData))
      .then((res) => {
        console.log(res);
        
        if(res.payload?.success === true || res.payload?.success === 'true'){
          dispatch(checkAuth());
          navigate('/');
          toast.success(`${res.payload?.message}`)
          return;
        }
        
        toast.error(`${res.payload}`);
      })
      // try {
      //   const res = await dispatch(handleLogin(formData));
      //   console.log(res);
        
      //   if(res.payload?.success === false || res.payload.success === 'false'){
      //     toast.error(`${res.payload}`)
      //     console.log(res.payload);
          
      //     return;
      //   }
      //   // dispatch(checkAuth());
      //   console.log('inside login', authUser);
        
      //   toast.success(`${res.payload?.message}`);
      //   navigate('/', { replace: true });
      // } catch (error) {
      //   console.log(error);
      //   toast.error('Something went wrong, please try again.');
      // }
    }
    setFormData({
      email: '',
      password: ''
    })
  }

  useEffect(() => {
    if (authUser) {
      navigate('/', { replace: true });
    }
  }, [authUser, navigate]);

  return (
    <>
      <div className="auth-container">
        <div className="auth-container-left-side">
          <div className="auth-card">
            <MessageSquare size={40}/>
            <h1>Sign up</h1>
            <p>Get started with your free account</p>
          </div>
          <form className="input-container" onSubmit={handleSubmit}>
            <div className="email">
              <label>Email</label>
              <div
                style={{
                  border: "2px solid var(--fallback-bc, #4C8BF5)"
                }}
              >
                <label><Mail /></label>
                <input 
                  type="email" 
                  placeholder='user@email.com' 
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="password">
              <label>Password</label>
              <div
                style={{
                  border: "2px solid var(--fallback-bc, #4C8BF5)"
                }}
              >
                <label><Lock /></label>
                <input 
                  type={isVisible ? 'text' : 'password'} 
                  placeholder='*****'
                  name='password'
                  value={formData.password}
                  onChange={handleChange} 
                />
                <button type='button'>
                {
                  isVisible ? <EyeOff onClick={() => setIsVisible((prev) => !prev)}/> : <Eye onClick={() => setIsVisible((prev) => !prev)}/>
                }
                </button>
              </div>
            </div>
            <div className="submit-btn">
              <button className='btn btn-primary' type='submit'>
                {
                  isLogin ? 'Loading...' : 'Sign in'
                }
              </button>
            </div>
          </form>
          <div className='bottom-text'>
            <p>Don't have an account? <label><Link to='/signup'>Create account</Link></label></p>
          </div>
        </div>
        <div className="auth-container-right-side">
          <AuthAnimation 
            title='Join our community' 
            subtitle='Connect with friends, share moments and stay in touch with your loved ones.'
          />
        </div>
      </div>
    </>
  )
}

export default Login
