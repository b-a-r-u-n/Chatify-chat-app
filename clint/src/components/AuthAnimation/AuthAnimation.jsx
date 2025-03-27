import React from "react";
import Squares from "../Squares/Squares";
import './AuthAnimation.css'

const AuthAnimation = ({title, subtitle}) => {
  return (
    <>
        <div className="auth-animation">
            <Squares 
                speed={0.2} 
                squareSize={50}
                direction='diagonal' // up, down, left, right, diagonal
                borderColor='#fff'
                hoverFillColor='#4361ee'
            />
            <div className="bottom-text">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </div>
    </>
  );
};

export default AuthAnimation;
