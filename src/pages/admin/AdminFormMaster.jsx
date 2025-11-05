import React from 'react';
import { Link } from 'react-router-dom';

const AdminFormMaster = () => {
  return (
    <div className="form-master-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <h5>Forms</h5>
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
                        <button className="btn">+ Add user</button>
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
                        <th>Form ID</th>
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
                            <Link to="/admin/FormEdit">
                              <button className="btn btn-primary">
                                View form
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
                            <Link to="/admin/FormEdit">
                              <button className="btn btn-primary">
                                View form
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

export default AdminFormMaster;
