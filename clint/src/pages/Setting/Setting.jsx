import React from 'react'
import { THEMES } from '../../Constants'
import { nanoid } from '@reduxjs/toolkit'
import './Setting.css'
import { useDispatch } from 'react-redux'
import { changeTheme } from '../../Features/themeSlice'
import { Send } from 'lucide-react'

const Setting = () => {

  const dispatch = useDispatch();

  const previewMessage = [
    {id: 1, content: "Hey! How's it going?", isSent: false},
    {id: 2, content: "Not bad, thanks!", isSent: true},
  ]

  return (
    <>
      <div className="setting-container">
       <div className="setting-sub-container">
        <div className="setting-header">
            <h2>Theme</h2>
            <p>
              Choose a theme for your chat interface
            </p>
            <div className="themes">
              {
                THEMES.map((THEME) => {
                  return (
                    <div key={nanoid()}>
                      <button
                        className="border-4 border-natural bg-base-200"
                        data-theme={THEME}
                        onClick={() => dispatch(changeTheme(THEME))}
                      >
                        <div className='bg-primary w-7 h-7'></div>
                        <div className='bg-secondary w-7 h-7'></div>
                        <div className='bg-accent w-7 h-7'></div>
                        <div className='bg-neutral w-7 h-7'></div>
                      </button>
                      <p>{THEME}</p>
                    </div>
                  )
                })
              }
            </div>
        </div>
        <div className="setting-bottom">
          <h2>Preview</h2>
          <div className="preview-container bg-base-200">
              <div className="preview-sub-container bg-base-100">
                <div className="preview-header">
                  <div className="preview-image bg-primary">
                    <p className='text-primary-content'>J</p>
                  </div>
                  <div className="preview-details">
                    <p>John Doe</p>
                    <label>Online</label>
                  </div>
                </div>
                <div className="preview-message-container">
                {
                  previewMessage.map((message) => {
                    return (
                        <div 
                          key={message.id}
                          className={`preview-message ${message.isSent ? 'preview-message-right bg-primary text-primary-content' : 'preview-message-left bg-base-200'}`}
                        >
                          <p>{message.content}</p>
                          <label className={`${message.isSent? 'text-primary-content/70' : 'text-base-content/70'}`}>12.00 PM</label>
                        </div>
                    )
                  })
                }
                </div>
                <div className="preview-send">
                  <input disabled={true} type="text" placeholder="Type a message..." />
                  <button><Send /></button>
                </div>
              </div>
          </div>
        </div>
       </div>
      </div>
    </>
  )
}

export default Setting
