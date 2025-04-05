import React from 'react'
import profileImage from '../../image/blank-profile-picture.png'
import './UserCard.css'

const UserCard = () => {
  return (
    <>
      <div className="user-card hover:bg-base-100">
        <div className="user-card-image">
            <img 
                src={profileImage} 
                alt="profile" 
                loading='lazy'
            />
        </div>
        <div className="user-card-details">
            <h2>John Doe</h2>
            <p>Online</p>
        </div>
      </div>
    </>
  )
}

export default UserCard
