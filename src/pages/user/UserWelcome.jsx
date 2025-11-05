import React, { Fragment } from 'react';
import UserDashboard from '../../components/user/UserDashboard';
import UserHome from './UserLoginSuccess';

const UserWelcome = () => {
  return (
    <div className="welcome-page-content">
      <div className="container my-5">
        <div className="welcome-head text-center text-sm-center text-md-start d-flex flex-wrap gap-2 gap-sm-2 gap-md-5 align-items-center mb-3 mb-sm-3 mb-md-5">
          <div className="wl-logo m-auto m-sm-auto m-md-0">
            <img
              src="/assets/images/welcome-img.png"
              alt="img"
              className="img-fluid"
            />
          </div>
          <div className="wl-content">
            <h1 className="mb-2">Welcome to Vepaar Hawaij</h1>
            <p>
              This module is crafted to facilitate mumineen in seeking blessings
              from Huzurala TUS before embarking on new business ventures or
              forging partnerships.
            </p>
          </div>
        </div>
        <div className="welcome-video-login">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="wl-video-div">
                <img
                  src="/assets/images/video-thumb.png"
                  alt="img"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="wl-login-div">
                <p className="mb-3">Let’s start your journey</p>
                <a href="user/LoginSuccess" className="btn btn-custom">
                  <img src="/assets/images/btn-icon.png" alt="icon" />
                  Login with ITS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWelcome;
