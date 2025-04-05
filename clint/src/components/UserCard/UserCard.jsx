import React from 'react'
import profileImage from '../../image/blank-profile-picture.png'
import './UserCard.css'
const UserCard = ({user}) => {
  return (
    <>
      <div className="user-card hover:bg-base-100">
        <div className="user-card-image">
            <img 
                src={user.profileImage || profileImage} 
                alt="profile" 
                loading='lazy'
            />
        </div>
        <div className="user-card-details">
            <h2>{user.fullName}</h2>
            <p>Online</p>
        </div>
      </div>
    </>
  )
}

export default UserCard
