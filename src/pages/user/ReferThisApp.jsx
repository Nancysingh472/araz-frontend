import React, { Fragment } from 'react';
import UserDashboard from '../../components/user/UserDashboard';
import UserHome from './UserLoginSuccess';

const ReferThisApp = () => {
  return (
    <div className="refer-page-content px-20">
      <div className="page-head mt-4 mb-3">
        <h5 className="text-white">Refer this app</h5>
      </div>
      <div className="page-card text-center">
        <div className="app-card-div">
          <h4>Refer this app to friends and family</h4>
          <div className="app-box">
            <a href="#" className="btn btn-custom">
              Share app link
            </a>
            <div className="app-img">
              <img
                src="/assets/images/app-link-img.png"
                alt="img"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferThisApp;
