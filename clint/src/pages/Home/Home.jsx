import React, { useEffect } from 'react'
import {MessageSquare, Users} from 'lucide-react'
import { ChatBox, HomeSkeleton, UserCard } from '../../components'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, selectUser } from '../../Features/messageSlice'

const Home = () => {

  const dispatch = useDispatch();

  const users = useSelector(state => state.message.users);
  const isUserLoading = useSelector(state => state.message.isUserLoading);
  const selectedUser = useSelector(state => state.message.selectedUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [])

  if(isUserLoading){
    return <HomeSkeleton />
  }

  const handleClick = (user) => {
    dispatch(selectUser(user));
  }

  return (
    <>
      <div className="home">
        <div className="home-container bg-base-300">
          <div className="leftside">
            <div className="left-heading">
              <div className="left-heading-top">
                <Users />
                <h1>Contacts</h1>
              </div>
              <div className="left-heading-bottom">
                <input 
                  type="checkbox" 
                  name="" 
                  id="box" 
                />
                <label htmlFor="box">
                  <span>Show online only </span>
                  <span>(0 online)</span>
                </label>
              </div>
            </div>
            <div className="left-body">
            {
              users.map((user) => {
                return (
                  <button 
                    key={user._id} 
                    onClick={() => handleClick(user)}
                    className={`${selectedUser?._id === user._id && 'bg-base-100'}`}
                  >
                    <UserCard user={user}/>
                  </button>
                )
              })
            }
            </div>
          </div>
          <div className="rightside">
            {
              selectedUser ?
              (
                <ChatBox />
              )
              :
              (
                <div className="right-side-container">
                  <div className="right-side-logo animate-bounce">
                    <MessageSquare size={40} />
                  </div>
                  <h1>Welcome to Chatify</h1>
                  <p>Select a conversation from the sidebar to start chatting</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
