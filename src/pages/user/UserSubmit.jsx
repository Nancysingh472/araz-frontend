import React, { Fragment } from 'react';
import UserDashboard from '../../components/user/UserDashboard';
import UserHome from './UserLoginSuccess';

const UserSubmit = () => {
  return (
    <div className="usersubmit-content px-20">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="submit-card">
              <div className="submit-body">
                <div className="row">
                  <div className="col-md-5 order-2 order-sm-2 order-md-1">
                    <div className="araz-card">
                      <button className="btn btn-zoom">
                        <img
                          src="/assets/images/zoom-icon.svg"
                          alt="img"
                          className="img-fluid"
                        />
                      </button>
                      <img
                        src="/assets/images/araz.png"
                        alt="img"
                        className="img-fluid"
                        width="100%"
                      />
                    </div>
                  </div>
                  <div className="col-md-7 order-1 order-sm-1 order-md-2">
                    <div className="wl-login-div h-auto">
                      <img
                        src="/assets/images/done-icon.svg"
                        alt="icon"
                        className="img-fluid mb-4"
                      />
                      <p className="mb-3">
                        Your Raza Araz for business name is in process
                      </p>
                      <div className="ls-btn-div d-flex gap-2">
                        <button className="btn btn-custom">
                          Go to dashboard
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSubmit;
