import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, MessageSquare, User} from 'lucide-react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthAnimation } from '../../components'
import toast from 'react-hot-toast'
import { handleSignup } from '../../Features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignup = useSelector(state => state.auth.isSignup);

  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const validateForm = () => {
    if(!formData.fullName)
      toast.error("Full Name is required")
    else if(!formData.email)
      toast.error("Email is required")
    else if(!formData.password)
      toast.error("Password is required")
    else if(formData.password.length < 6)
      toast.error("Password must be at least 6 characters")
    else
      return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkValidate = validateForm();
    if(checkValidate){
      // dispatch(handleSignup(formData))
      // .then((res) => {
      //   if(res.payload?.success === false || res.payload.success === 'false'){
      //     toast.error(`${res.payload?.message}`)
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
        const res = await dispatch(handleSignup(formData));
        if(res.payload?.success === true || res.payload.success === 'true'){
          toast.success(`${res.payload?.message}`);
          navigate('/login', { replace: true });
          return;
        }
        toast.error(`${res.payload}`);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong, please try again.');
      }
    }
    setFormData({
      fullName: '',
      email: '',
      password: '' 
    })
  }

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
            <div className="full-name">
              <label>Full Name</label>
              <div
                style={{
                  border: "2px solid var(--fallback-bc, #4C8BF5)"
                }}
              >
                <label><User /></label>
                <input 
                  type="text" 
                  name='fullName' 
                  placeholder="John Doe" 
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
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
                  name='email' 
                  placeholder='user@email.com' 
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
                  name='password' 
                  placeholder='*****' 
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
              <button 
                className='btn btn-primary' 
                type='submit' 
              >
                {
                  isSignup ? 'Loading...' : 'Create Account'
                }
              </button>
            </div>
          </form>
          <div className='bottom-text'>
            <p>Already have an account? <label><Link to='/login'>Sign in</Link></label></p>
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

export default Signup
