import { nanoid } from "@reduxjs/toolkit";
import { MessageSquare, Users } from "lucide-react";
import React from "react";

const HomeSkeleton = () => {
  return (
    <>
      <div className="home">
        <div className="home-container bg-base-300">
          <div className="leftside">
            <div className="left-heading">
              <div className="left-heading-top">
                <Users />
                <h1 className="skeleton h-3 w-28"></h1>
              </div>
              <div className="left-heading-bottom">
                <label htmlFor="box">
                  <span className="skeleton h-3 w-32"></span>
                  <span className="skeleton h-3 w-32"></span>
                </label>
              </div>
            </div>
            <div className="overflow-hidden">
              {Array.from(Array(10), () => {
                return (
                  <div key={nanoid()} className="user-card skeleton bg-base-200">
                    <div className="user-card-image">
                      <div className="skeleton h-[3rem] w-[3rem] rounded-full"></div>
                    </div>
                    <div className="user-card-details flex flex-col gap-2">
                      <h2 className="skeleton w-24 h-4"></h2>
                      <p className="skeleton w-24 h-4"></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rightside">
              <div className="right-side-container">
                <div className="right-side-logo animate-bounce">
                  <MessageSquare size={40} />
                </div>
                <h1 className="skeleton h-3 w-40"></h1>
                <p className="skeleton h-3 w-60"></p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSkeleton;
