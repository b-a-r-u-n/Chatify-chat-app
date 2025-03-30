import React, { useEffect, useRef, useState } from 'react'
import  './Profile.css';
import {Camera, Loader, Save, User, UserPen} from 'lucide-react';
import image from '../../image/blank-profile-picture.png';
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast';
import { checkAuth, handleProfileUpdate } from '../../Features/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const dispatch = useDispatch();

  const authUser = useSelector(state => state.auth.authUser);
  const isUpdateProfile = useSelector(state => state.auth.isUpdateProfile);

  const imageRef = useRef();

  // const navigate = useNavigate();

  const [fullName, setFullName] = useState(authUser?.fullName);
  const [profileImage, setProfileImage] = useState(authUser?.profileImage);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if(profileImagePreview || fullName.trim() !== authUser.fullName.trim()){
      setButtonDisabled(false);
    }
  }, [profileImage, profileImagePreview, fullName])

  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]){
      setProfileImage(e.target.files[0]);
      setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  const handleUpdateButton = async () => {
    if(!fullName.trim()){
      toast.error('Please enter your full name.')
      return;
    }
    const formData = new FormData();
    
    if(profileImage)
      formData.append('profileImage', profileImage);
    if(fullName.trim())
      formData.append('fullName', fullName);    

    try {
      const res = await dispatch(handleProfileUpdate(formData));
      
      if(res.payload?.success === true || res.payload.success === 'true'){
        dispatch(checkAuth());
        toast.success(`${res.payload?.message}`);
        setIsNameEditable(false);
        setButtonDisabled(true);
        setProfileImagePreview(null);
        setButtonDisabled(true);
        return;
      }
      toast.error(`${res.payload?.message || 'hello'}`);
      setIsNameEditable(false);
      setButtonDisabled(true);
      setProfileImagePreview(null);
      setButtonDisabled(true);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try again.');
    }
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-sub-container bg-base-300">
          <div className="profile-heading">
            <h2>Profile</h2>
            <p>Your profile information</p>
          </div>
          <div className="profile-info">
            <div className="profile-image">
              <img src={profileImagePreview || authUser.profileImage || image} alt="" loading='lazy'/>
              <input 
                type="file" 
                name="profileImage" 
                accept="image/*"
                onChange={onImageChange}
                ref={imageRef}
                style={{display: 'none'}}
              />
              <button 
                className='bg-base-300'
                onClick={() => imageRef.current.click()}
              >
                <Camera />
              </button>
            </div>
            <p>Click the camera icon to update photo</p>
          </div>
          <div className="profile-name">
            <label>
              <User />
              <p>Full Name</p>
            </label>
            <div
              style={{
                border: "2px solid var(--fallback-bc, #4C8BF5)"
              }}
            >
              <input 
                type="text" 
                name="" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isNameEditable}
              />
              <button
                onClick={() => setIsNameEditable(prev => !prev)}
              >
                {
                  isNameEditable ? <Save /> : <UserPen />
                }
              </button>
            </div>
          </div>
          <div className="profile-email">
            <label>
              <User />
              <p>Email</p>
            </label>
            <div
              style={{
                border: "2px solid var(--fallback-bc, #4C8BF5)"
              }}
            >
              <input 
                type="text" 
                name="" 
                disabled={true}
                value={authUser.email}
              />
            </div>
          </div>
          <button 
            className={`btn btn-primary ${buttonDisabled && 'disabled'}`}
            disabled={buttonDisabled}
            onClick={handleUpdateButton}
          >
            {
              isUpdateProfile ? 
              <>
                Updating <Loader className='animate-spin'/>
              </>
              : 
              'Update' 
            }
          </button>
          <div className="account-info">
            <h2>
              Account Information
            </h2>
            <div
              style={{
                borderBottom: "2px solid var(--fallback-bc, #4C8BF5)"
              }}
            >
              <p>Member Since</p>
              <p>{new Date(authUser.createdAt).toLocaleDateString('en-CA')}</p>
            </div>
            <div>
              <p>Account Status</p>
              <p>Active</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
