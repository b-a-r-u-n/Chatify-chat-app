import React from 'react'
import  './Profile.css';
import {Camera, Save, User, UserPen} from 'lucide-react';
import profileImage from '../../image/blank-profile-picture.png'

const Profile = () => {
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
              <img src={profileImage} alt="" loading='lazy'/>
              <button className='bg-base-300'>
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
                value='john'
              />
              <button>
                <UserPen />
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
                disabled='true'
                value='abc@gmail.com'
              />
            </div>
          </div>
          <button className='btn btn-primary'>
            Update
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
              <p>01-01-2000</p>
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
