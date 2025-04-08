import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import profileImage from "../../image/blank-profile-picture.png";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, sendMessage } from "../../Features/messageSlice";
import {format} from 'timeago.js'
import InputEmoji from "react-input-emoji";
import { File, SendHorizontal, X } from "lucide-react";

const ChatBox = () => {

  const dispatch = useDispatch();

  const selectedUser = useSelector(state => state?.message?.selectedUser);
  const isMessageLoading = useSelector(state => state?.message?.isMessageLoading);
  const messages = useSelector(state => state?.message?.messages);
  const authUser = useSelector(state => state?.auth.authUser);

  const imageRef = useRef();

  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleClick = async () => {
    const formData = new FormData();
    if(image)
      formData.append('image', image);
    if(message)
      formData.append('message', message);
    console.log(formData);
    
    const res = dispatch(sendMessage({userId: selectedUser?._id, formData}));
    console.log(res);
    
    setMessage('');
    setImage('');
    setPreviewImage('');
    dispatch(getMessages(selectedUser._id));
  }

  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]){
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  useEffect(() => {
    dispatch(getMessages(selectedUser?._id));
  }, [selectedUser])

  if(isMessageLoading){
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="chat-box bg-base-100">
        <div className="chat-box-top">
          <div className="user-card-image">
            <img src={selectedUser?.profileImage || profileImage} alt="profile" loading="lazy" />
          </div>
          <div className="user-card-details">
            <h2>{selectedUser.fullName}</h2>
            <p>Online</p>
          </div>
        </div>
        <div className="chat-box-body">
          {
            messages.map((message) => {
              return(
                <div
                  key={message._id}
                  className={`${message?.senderId === authUser?._id ? 'profile-right' : 'profile-left'} chat-profile`}
                >
                  <div className="user-card-image">
                    <img 
                      src={message?.senderId === authUser?._id ? message?.senderDetails?.profileImage || profileImage : message?.receiverDetails?.previewImage || profileImage} 
                      alt="image"
                      loading="lazy"
                      name='image'
                    />
                  </div>
                  
                  <div 
                    className={`${message?.senderId === authUser?._id ? 'chat-message-right' : 'chat-message-left'} chat-message`}
                  >
                    {
                      message?.image && 
                      (
                        <img src={message?.image} alt="" />
                      )
                    }
                    <p>{message?.message}</p>
                    <span>{format(message?.createdAt)}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="chat-box-bottom">
          <input 
            type="file" 
            accept="image/*"
            ref={imageRef}
            onChange={onImageChange}
          />
          {
            previewImage && (
              <div className="input-image-preview">
                <img 
                  src={previewImage} 
                  alt="" 
                />
                <button
                  onClick={() => setPreviewImage('')}
                >
                  <X />
                </button>
              </div>
            )
          }
          <button
            onClick={() => imageRef.current.click()}
          >
            <File />
          </button>
          <InputEmoji 
            fontSize={18}
            value={message}
            onChange={(message) => setMessage(message)}
          />
          <button
            onClick={handleClick}
            disabled={!(message || image)}
            className={`${message || previewImage ? '' : 'opacity-10'}`}
          >
            <SendHorizontal />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
