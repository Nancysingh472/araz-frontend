import React from 'react';

const AdminNewRequest = () => {
  return (
    <div className="new-request-content px-20">
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
                        <button className="btn btn-export">
                          Compile requests
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
                          <span className="orange-status">
                            Request in progress
                          </span>
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

export default AdminNewRequest;
