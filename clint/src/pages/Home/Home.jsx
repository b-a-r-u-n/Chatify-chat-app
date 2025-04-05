import React from 'react'
import {MessageSquare, Users} from 'lucide-react'
import { UserCard } from '../../components'
import './Home.css'

const Home = () => {
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
              Array.from(Array(10), () => {
                return (
                  <UserCard />
                )
              })
            }
            </div>
          </div>
          <div className="rightside">
            <div className="right-side-container">
              <div className="right-side-logo animate-bounce">
                <MessageSquare size={40} />
              </div>
              <h1>Welcome to Chatify</h1>
              <p>Select a conversation from the sidebar to start chatting</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
