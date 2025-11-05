import React, { useEffect, useState, useCallback } from 'react';
import UserRequestTable from './UserRequestTable';
import UserDashboardSlider from './UserDashboardSlider';

const UserDashboard = () => {
  return (
    <div className="dashboard-content-div px-20">
      <div
        className="modal fade verification-modal"
        id="Verification_Modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.402 0.618517C26.2125 0.428667 25.9875 0.278046 25.7397 0.175278C25.492 0.0725101 25.2264 0.0196116 24.9582 0.0196116C24.69 0.0196116 24.4244 0.0725101 24.1766 0.175278C23.9289 0.278046 23.7038 0.428667 23.5144 0.618517L13.5 10.6124L3.48562 0.598037C3.29602 0.408436 3.07093 0.258036 2.8232 0.155424C2.57548 0.0528129 2.30997 1.99777e-09 2.04183 0C1.77369 -1.99778e-09 1.50818 0.0528129 1.26045 0.155424C1.01273 0.258036 0.787639 0.408436 0.598037 0.598037C0.408436 0.787639 0.258036 1.01273 0.155424 1.26045C0.0528129 1.50818 -1.99777e-09 1.77369 0 2.04183C1.99778e-09 2.30997 0.0528129 2.57548 0.155424 2.8232C0.258036 3.07093 0.408436 3.29602 0.598037 3.48562L10.6124 13.5L0.598037 23.5144C0.408436 23.704 0.258036 23.9291 0.155424 24.1768C0.0528129 24.4245 0 24.69 0 24.9582C0 25.2263 0.0528129 25.4918 0.155424 25.7395C0.258036 25.9873 0.408436 26.2124 0.598037 26.402C0.787639 26.5916 1.01273 26.742 1.26045 26.8446C1.50818 26.9472 1.77369 27 2.04183 27C2.30997 27 2.57548 26.9472 2.8232 26.8446C3.07093 26.742 3.29602 26.5916 3.48562 26.402L13.5 16.3876L23.5144 26.402C23.704 26.5916 23.9291 26.742 24.1768 26.8446C24.4245 26.9472 24.69 27 24.9582 27C25.2263 27 25.4918 26.9472 25.7395 26.8446C25.9873 26.742 26.2124 26.5916 26.402 26.402C26.5916 26.2124 26.742 25.9873 26.8446 25.7395C26.9472 25.4918 27 25.2263 27 24.9582C27 24.69 26.9472 24.4245 26.8446 24.1768C26.742 23.9291 26.5916 23.704 26.402 23.5144L16.3876 13.5L26.402 3.48562C27.1802 2.70741 27.1802 1.39673 26.402 0.618517Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div className="progress-text-div">
                <div className="progress-icon-div">
                  <img
                    src="/assets/images/progress-icon.svg"
                    alt="icon"
                    className="img-fluid"
                  />
                </div>
                <p>
                  Your araz in verification stage, kindly check jawab for
                  starting new business on
                </p>
                <h4>23 February 2024</h4>
              </div>
              <div className="progress-btn-div">
                <p>Start a new request</p>
                <div className="pbd-list">
                  <button className="btn btn-primary">Dua Araz</button>
                  <button className="btn btn-primary">Raza Araz</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        {/*
        <div className="request-table-div">
          <div className="title-div mb-4">
            <h5>All requests</h5>
          </div>
          <div className="request-table">
            <div className="rt-head">
              <div className="row">
                <div className="col-sm-4">
                  <div className="table-search">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                    />
                    <button className="btn search-btn">
                      <img
                        src="/assets/images/search-icon.svg"
                        alt="icon"
                        className="img-fluid"
                      />
                    </button>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="table-action-btn-list">
                    <input className="form-control" type="date" />
                    <select className="form-control">
                      <option>Category</option>
                    </select>
                    <select className="form-control">
                      <option>Sub-category</option>
                    </select>
                    <select className="form-control">
                      <option>Status</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="rt-body">
              <div className="table-responsive">
                <table className="table table-striped custom-table">
                  <thead>
                    <tr>
                      <th width="6%">Request ID</th>
                      <th>Business name</th>
                      <th>Jamiat</th>
                      <th>Jamaat</th>
                      <th>Added on</th>
                      <th>Araz type</th>
                      <th>Status</th>
                      <th>Latest comments</th>
                      <th width="12%"></th>
                      <th width="3%"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>00128</td>
                      <td>Mohammedi Hardware</td>
                      <td>Surat</td>
                      <td>Surat</td>
                      <td>04 Aug 2023</td>
                      <td>Dua araz</td>
                      <td>
                        <span className="text-primary">Jawab received</span>
                      </td>
                      <td>-</td>
                      <td>
                        <div className="dj-btn">
                          <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#Download_Jawab_Modal"
                          >
                            Download Jawab
                          </button>
                        </div>
                      </td>
                      <td>
                        <button className="btn dlt-btn p-0">
                          <img
                            src="/assets/images/delete-icon.svg"
                            alt="delete"
                            className="img-fluid"
                          />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>00128</td>
                      <td>Mohammedi Hardware</td>
                      <td>Surat</td>
                      <td>Surat</td>
                      <td>04 Aug 2023</td>
                      <td>Dua araz</td>
                      <td>
                        <span className="review-status">Request in review</span>
                      </td>
                      <td>-</td>
                      <td>
                        <div className="dj-btn">
                          <button className="btn btn-primary">
                            Download Jawab
                          </button>
                        </div>
                      </td>
                      <td>
                        <button className="btn dlt-btn p-0">
                          <img
                            src="/assets/images/delete-icon.svg"
                            alt="delete"
                            className="img-fluid"
                          />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
*/}
        <UserRequestTable />
      </div>
    </div>
  );
};

export default UserDashboard;
