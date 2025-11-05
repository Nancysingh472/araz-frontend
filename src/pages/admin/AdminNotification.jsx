import React from 'react';

const AdminNotification = () => {
  return (
    <div className="notification-content px-20">
      <div
        className="offcanvas offcanvas-end custom-canvas-div"
        tabIndex="-1"
        id="Notification_Edit"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Manage notification</h5>
          <div className="canv-right-btn">
            <button className="btn btn-primary">Save</button>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7342 0.274897C11.65 0.190519 11.55 0.123576 11.4399 0.0779014C11.3298 0.0322267 11.2117 0.00871629 11.0925 0.00871629C10.9733 0.00871629 10.8553 0.0322267 10.7452 0.0779014C10.6351 0.123576 10.535 0.190519 10.4508 0.274897L6 4.71663L1.54916 0.265794C1.4649 0.181527 1.36486 0.114683 1.25476 0.0690775C1.14466 0.0234724 1.02665 8.879e-10 0.90748 0C0.788308 -8.879e-10 0.670302 0.0234724 0.560202 0.0690775C0.450101 0.114683 0.350062 0.181527 0.265794 0.265794C0.181527 0.350062 0.114683 0.450101 0.0690775 0.560202C0.0234724 0.670302 -8.879e-10 0.788308 0 0.90748C8.879e-10 1.02665 0.0234724 1.14466 0.0690775 1.25476C0.114683 1.36486 0.181527 1.4649 0.265794 1.54916L4.71663 6L0.265794 10.4508C0.181527 10.5351 0.114683 10.6351 0.0690775 10.7452C0.0234724 10.8553 0 10.9733 0 11.0925C0 11.2117 0.0234724 11.3297 0.0690775 11.4398C0.114683 11.5499 0.181527 11.6499 0.265794 11.7342C0.350062 11.8185 0.450101 11.8853 0.560202 11.9309C0.670302 11.9765 0.788308 12 0.90748 12C1.02665 12 1.14466 11.9765 1.25476 11.9309C1.36486 11.8853 1.4649 11.8185 1.54916 11.7342L6 7.28337L10.4508 11.7342C10.5351 11.8185 10.6351 11.8853 10.7452 11.9309C10.8553 11.9765 10.9733 12 11.0925 12C11.2117 12 11.3297 11.9765 11.4398 11.9309C11.5499 11.8853 11.6499 11.8185 11.7342 11.7342C11.8185 11.6499 11.8853 11.5499 11.9309 11.4398C11.9765 11.3297 12 11.2117 12 11.0925C12 10.9733 11.9765 10.8553 11.9309 10.7452C11.8853 10.6351 11.8185 10.5351 11.7342 10.4508L7.28337 6L11.7342 1.54916C12.0801 1.20329 12.0801 0.620769 11.7342 0.274897Z"
                  fill="#383C3E"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="canvas-group mb-4">
              <label>Name of the notification</label>
              <input
                className="form-control"
                type="text"
                value="Raza ID {Unique ID} has been created successfully!"
              />
            </div>
            <div className="canvas-group mb-4">
              <label>Description of the notification</label>
              <textarea
                className="form-control"
                type="text"
                value="Type message here"
                rows="5"
              />
            </div>
            <div className="canvas-group mb-4">
              <label>Notification type</label>
              <select className="form-control">
                <option>Important</option>
              </select>
            </div>
            <div className="canvas-group mb-4">
              <label>Live for</label>
              <select className="form-control">
                <option>All users and roles</option>
              </select>
            </div>
            <div className="canvas-group mb-4">
              <label>Live for</label>
              <select className="form-control">
                <option>All users and roles</option>
              </select>
            </div>
            <div className="canvas-group mb-4">
              <label>Tag this notification with activity</label>
              <select className="form-control">
                <option>
                  Trigger on “New raza request”, “New dua request”
                </option>
              </select>
            </div>
            <div className="canvas-group mb-4">
              <label>Added on</label>
              <input className="form-control" type="text" value="04 Aug 2023" />
            </div>
          </form>
        </div>
      </div>

      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>All notifications</h5>
            </div>
            <div className="request-table">
              <div className="rt-head">
                <div className="row">
                  <div className="col-md-4">
                    <div className="table-search mb-0">
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
                  <div className="col-md-8">
                    <div className="table-filter-div">
                      <div className="custom-input-group">
                        <label>Added on</label>
                        <input className="tb-custom-control" type="date" />
                      </div>
                      <div className="custom-input-group">
                        <label>Jamiat</label>
                        <select className="tb-custom-control">
                          <option>Show all</option>
                        </select>
                      </div>
                      <div className="custom-input-group">
                        <label>Jamaat</label>
                        <select className="tb-custom-control">
                          <option>Show all</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rt-body">
                <div className="table-responsive">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>
                          <div className="custom-check">
                            <input type="checkbox" />
                            <label></label>
                          </div>
                        </th>
                        <th>Unique ID</th>
                        <th>Notification name</th>
                        <th>Description of notification</th>
                        <th>Type</th>
                        <th>Added on</th>
                        <th>Tags</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="custom-check">
                            <input type="checkbox" />
                            <label></label>
                          </div>
                        </td>
                        <td>00128</td>
                        <td>Raza created</td>
                        <td>Your Raza Araz has been submitted successfully!</td>
                        <td>Important</td>
                        <td>04 Aug 2023</td>
                        <td>
                          <div className="tag-list">
                            <label className="tag-label">
                              Raza
                              <span>
                                <img
                                  src="/assets/images/close-icon.svg"
                                  alt="close"
                                />
                              </span>
                            </label>
                            <label className="tag-label">
                              Raza
                              <span>
                                <img
                                  src="/assets/images/close-icon.svg"
                                  alt="close"
                                />
                              </span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="action-btn-list">
                            <button
                              className="btn p-0"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#Notification_Edit"
                              aria-controls="offcanvasRight"
                            >
                              <svg
                                width="26"
                                height="24"
                                viewBox="0 0 26 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 22.1538H26V24H0V22.1538ZM21.7286 6.46154C22.4714 5.72308 22.4714 4.61538 21.7286 3.87692L18.3857 0.553846C17.6429 -0.184615 16.5286 -0.184615 15.7857 0.553846L1.85714 14.4V20.3077H7.8L21.7286 6.46154ZM17.0857 1.84615L20.4286 5.16923L17.6429 7.93846L14.3 4.61538L17.0857 1.84615ZM3.71429 18.4615V15.1385L13 5.90769L16.3429 9.23077L7.05714 18.4615H3.71429Z"
                                  fill="#383C3E"
                                />
                              </svg>
                            </button>

                            <button className="btn p-0">
                              <svg
                                width="23"
                                height="24"
                                viewBox="0 0 23 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.34375 3.63636H13.6562C13.6562 3.05771 13.4291 2.50276 13.0247 2.09359C12.6203 1.68442 12.0719 1.45455 11.5 1.45455C10.9281 1.45455 10.3797 1.68442 9.9753 2.09359C9.57093 2.50276 9.34375 3.05771 9.34375 3.63636ZM7.90625 3.63636C7.90625 2.67194 8.28488 1.74702 8.95883 1.06507C9.63279 0.383116 10.5469 0 11.5 0C12.4531 0 13.3672 0.383116 14.0412 1.06507C14.7151 1.74702 15.0938 2.67194 15.0938 3.63636H22.2812C22.4719 3.63636 22.6547 3.71299 22.7895 3.84938C22.9243 3.98577 23 4.17075 23 4.36364C23 4.55652 22.9243 4.74151 22.7895 4.8779C22.6547 5.01429 22.4719 5.09091 22.2812 5.09091H20.7661L19.0497 20.1367C18.9284 21.2003 18.4249 22.1816 17.6351 22.8939C16.8452 23.6063 15.8241 23.9999 14.766 24H8.234C7.17593 23.9999 6.15482 23.6063 5.36495 22.8939C4.57507 22.1816 4.07158 21.2003 3.95025 20.1367L2.23387 5.09091H0.71875C0.528126 5.09091 0.345309 5.01429 0.210517 4.8779C0.0757254 4.74151 0 4.55652 0 4.36364C0 4.17075 0.0757254 3.98577 0.210517 3.84938C0.345309 3.71299 0.528126 3.63636 0.71875 3.63636H7.90625ZM5.37769 19.9709C5.4588 20.6798 5.79463 21.3339 6.32129 21.8086C6.84795 22.2833 7.52869 22.5456 8.234 22.5455H14.766C15.4713 22.5456 16.1521 22.2833 16.6787 21.8086C17.2054 21.3339 17.5412 20.6798 17.6223 19.9709L19.3186 5.09091H3.68144L5.37769 19.9709ZM9.34375 8.72727C9.53437 8.72727 9.71719 8.8039 9.85198 8.94029C9.98678 9.07668 10.0625 9.26166 10.0625 9.45455V18.1818C10.0625 18.3747 9.98678 18.5597 9.85198 18.6961C9.71719 18.8325 9.53437 18.9091 9.34375 18.9091C9.15313 18.9091 8.97031 18.8325 8.83552 18.6961C8.70072 18.5597 8.625 18.3747 8.625 18.1818V9.45455C8.625 9.26166 8.70072 9.07668 8.83552 8.94029C8.97031 8.8039 9.15313 8.72727 9.34375 8.72727ZM14.375 9.45455C14.375 9.26166 14.2993 9.07668 14.1645 8.94029C14.0297 8.8039 13.8469 8.72727 13.6562 8.72727C13.4656 8.72727 13.2828 8.8039 13.148 8.94029C13.0132 9.07668 12.9375 9.26166 12.9375 9.45455V18.1818C12.9375 18.3747 13.0132 18.5597 13.148 18.6961C13.2828 18.8325 13.4656 18.9091 13.6562 18.9091C13.8469 18.9091 14.0297 18.8325 14.1645 18.6961C14.2993 18.5597 14.375 18.3747 14.375 18.1818V9.45455Z"
                                  fill="#FF6A6A"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="table-pagination">
                  Show
                  <input type="number" />
                  Enteries
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
