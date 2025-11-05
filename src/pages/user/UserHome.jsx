import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="login-success-content px-20">
      <div className="container-fluid">
        <div className="user-info-card flex-wrap flex-sm-wrap flex-md-nowrap d-flex gap-4 mb-3 mb-sm-3 mb-md-3">
          <div className="user-img-div">
            <img
              src="/assets/images/user-img.png"
              alt="img"
              className="img-fluid"
            />
          </div>
          <div className="user-info-div">
            <div className="row">
              <div className="col-md-12">
                <div className="info-group mb-3">
                  <label>Name</label>
                  <p>
                    {userData?.firstName} {userData?.lastName}
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="info-group">
                  <label>Phone number</label>
                  <p>{userData?.phone}</p>
                </div>
              </div>
              <div className="col">
                <div className="info-group">
                  <label>Email ID</label>
                  <p>{userData?.email}</p>
                </div>
              </div>
              <div className="col">
                <div className="info-group">
                  <label>Jamiat</label>
                  <p>Secunderabad</p>
                </div>
              </div>
              <div className="col">
                <div className="info-group">
                  <label>Jamaat</label>
                  <p>Secunderabad</p>
                </div>
              </div>
              <div className="col">
                <div className="info-group">
                  <label>Occupation</label>
                  <p>Business</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="wl-login-div">
              <img
                src="/assets/images/done-icon.svg"
                alt="icon"
                className="img-fluid mb-4"
              />
              <p className="mb-3">
                Your login is successful, let’s start your request for
              </p>
              <div className="ls-btn-div d-flex gap-2">
                <button
                  onClick={() => navigate('/user/UserArazForm')}
                  className="btn btn-custom"
                >
                  Dua Araz
                </button>
                <button
                  onClick={() => navigate('/user/UserArazForm')}
                  className="btn btn-custom"
                >
                  Raza Araz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
