import React from 'react';

const AdminNewRequest2 = () => {
  return (
    <div className="new-request-content px-20">
      <div
        className="offcanvas offcanvas-end custom-canvas-div"
        tabIndex="-1"
        id="Upload_Jawab"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Upload jawab</h5>
          <div className="canv-right-btn">
            <button className="btn btn-primary">Send</button>
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
              <label>Suggest answer to the raza</label>
              <select className="form-control">
                <option>Pray Dua Kamil, Dua Joshan</option>
              </select>
            </div>
            <div className="canvas-group mb-4">
              <label>Recommend services</label>
              <select className="form-control">
                <option>Counseling</option>
              </select>
            </div>

            <div className="canvas-group mb-4">
              <label>Add additional information</label>
              <textarea
                rows="5"
                className="form-control"
                placeholder="Type here"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <h5>New requests</h5>
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
                    <div className="table-top-right-btn-list">
                      <div className="import-btn-div">
                        <button className="btn btn-export">Export CSV</button>
                      </div>
                      <div className="import-btn-div">
                        <button className="btn btn-primary2 h-100">
                          Upload bulk jawab
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
                        <th>
                          <div className="custom-check">
                            <input type="checkbox" />
                            <label></label>
                          </div>
                        </th>
                        <th>Request ID</th>
                        <th>ITS ID</th>
                        <th>Business name</th>
                        <th>Jamiat</th>
                        <th>Jamaat</th>
                        <th>Category</th>
                        <th>Added on</th>
                        <th>Status</th>
                        <th>Latest comments</th>
                        <th></th>
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
                        <td>30303030</td>
                        <td>Mohammedi Hardware</td>
                        <td>Surat</td>
                        <td>Surat</td>
                        <td>Raza araz</td>
                        <td>04 Aug 2023</td>
                        <td>
                          <span className="purple-status">Sent to vazarat</span>
                        </td>
                        <td>Signed raza araz received by Vazarat</td>
                        <td>
                          <div className="action-btn-list">
                            <button
                              className="btn btn-primary2 text-nowrap"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#Upload_Jawab"
                              aria-controls="offcanvasRight"
                            >
                              Upload Jawab
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="custom-check">
                            <input type="checkbox" />
                            <label></label>
                          </div>
                        </td>
                        <td>00128</td>
                        <td>30303030</td>
                        <td>Mohammedi Hardware</td>
                        <td>Surat</td>
                        <td>Surat</td>
                        <td>Raza araz</td>
                        <td>04 Aug 2023</td>
                        <td>
                          <span className="blue-status">Request in review</span>
                        </td>
                        <td>-</td>
                        <td>
                          <div className="action-btn-list">
                            <button className="btn btn-primary text-nowrap">
                              Review request
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

export default AdminNewRequest2;
