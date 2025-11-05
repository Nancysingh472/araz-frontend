import React from 'react';

const AdminHome = () => {
  return (
    <div className="my-profile-content px-20">
      <div className="container-fluid">
        <div className="page-head mt-4 mb-3">
          <div className="row align-items-center">
            <div className="col-8">
              <h5 className="text-white">My profile</h5>
            </div>
            <div className="col-4">
              <div className="next-btn-div text-end">
                <a href="#" className="btn btn-primary2">
                  Save details
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-card">
          <div className="profile-sub-card mb-3">
            <div className="align-items-center flex-wrap flex-sm-wrap flex-md-nowrap d-flex gap-4">
              <div className="user-img-div">
                <img
                  src="/assets/images/user-img.png"
                  alt="img"
                  className="img-fluid"
                />
              </div>
              <div className="profile-info-div">
                <div className="profile-info-group">
                  <label>ITS - 20208203</label>
                  <p>Mohammed bhai Murtaza bhai Sabuwala</p>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-sub-card">
            <div className="profile-form">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control form-control2"
                      value="mohammed@gmail.com"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Phone number</label>
                    <input
                      type="text"
                      className="form-control form-control2"
                      value="+91-909-909-0000"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Notifications</label>
                    <select className="form-control form-control2">
                      <option>Receive all notifications</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Preferred mode of communication</label>
                    <select className="form-control form-control2">
                      <option>Email</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Address</label>
                    <textarea
                      rows="4"
                      className="form-control form-control2"
                      value="Flat-403, Bldg A2, Saifee Park, Bori Colony, Opp Marol Police Station, Mumbai - 400059"
                    />
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

export default AdminHome;
