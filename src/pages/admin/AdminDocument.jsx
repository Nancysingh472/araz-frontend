import React from 'react';
import { Link } from 'react-router-dom';

const AdminDocument = () => {
  return (
    <div className="document-content px-20">
      <div
        className="offcanvas offcanvas-end custom-canvas-div"
        tabIndex="-1"
        id="Add_New_Document"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Add a new document</h5>
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
              <label>Name of the document</label>
              <input
                className="form-control"
                type="text"
                value="Document name here"
              />
            </div>
            <div className="canvas-group mb-4">
              <label>Select a document</label>
              <select className="form-control">
                <option>Select a document</option>
              </select>
            </div>

            <div className="canvas-group mb-4">
              <label>Custom file (This uploaded file will be uneditable)</label>
              <div className="attach-file canvas-attachment">
                <label htmlFor="Custom_file">
                  <img
                    src="/assets/images/upload-icon.svg"
                    className="img-fluid"
                  />
                  <span className="attach-label-1">Upload from computer</span>
                  <span className="attach-label-2">
                    .png and .pdf files with 2MB size
                  </span>
                </label>
                <input
                  type="file"
                  className="form-control d-none"
                  id="Custom_file"
                />
              </div>
              <div className="attach-list">
                <p>shop-photo.jpg</p>
                <button className="btn">
                  <svg
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.68286 6.46015H6.89018V12.8992H5.68286V6.46015ZM9.30481 6.46015H10.5121V12.8992H9.30481V6.46015Z"
                      fill="#FF6A6A"
                    />
                    <path
                      d="M0.853516 3.35561V4.62042H2.06083V17.2685C2.06083 17.604 2.18803 17.9257 2.41445 18.1629C2.64086 18.4001 2.94795 18.5333 3.26815 18.5333H12.9267C13.2469 18.5333 13.554 18.4001 13.7804 18.1629C14.0068 17.9257 14.134 17.604 14.134 17.2685V4.62042H15.3413V3.35561H0.853516ZM3.26815 17.2685V4.62042H12.9267V17.2685H3.26815ZM5.68278 0.825996H10.5121V2.0908H5.68278V0.825996Z"
                      fill="#FF6A6A"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>Documents</h5>
            </div>
            <div className="request-table">
              <div className="rt-head">
                <div className="row">
                  <div className="col-lg-4">
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
                  <div className="col-lg-8">
                    <div className="table-top-right-btn-list">
                      <div className="filter-select">
                        <label>Show :</label>
                        <select>
                          <option>Latest</option>
                        </select>
                      </div>
                      <div className="adduser-btn-div">
                        <button
                          className="btn"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#Add_New_Document"
                          aria-controls="offcanvasRight"
                        >
                          + Add user
                        </button>
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
                        <th>Doc. ID</th>
                        <th>Document name</th>
                        <th>Jamiat</th>
                        <th>Jamaat</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th>Latest comments</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>00128</td>
                        <td>Approval document</td>
                        <td>All</td>
                        <td>All</td>
                        <td>04 Aug 2023</td>
                        <td>
                          <span className="blue-status">Enabled</span>
                        </td>
                        <td>-</td>
                        <td>
                          <div className="action-btn-list">
                            <Link to="/admin/PreviewDocument">
                              <button className="btn btn-primary">
                                View document
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>00128</td>
                        <td>Request deleted document</td>
                        <td>All</td>
                        <td>All</td>
                        <td>04 Aug 2023</td>
                        <td>
                          <span className="red-status">Disabled</span>
                        </td>
                        <td>-</td>
                        <td>
                          <div className="action-btn-list">
                            <Link to="/admin/PreviewDocument">
                              <button className="btn btn-primary">
                                View document
                              </button>
                            </Link>
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

export default AdminDocument;
