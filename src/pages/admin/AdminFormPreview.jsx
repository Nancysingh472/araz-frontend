import React from 'react';

const AdminFormPreview = () => {
  return (
    <div className="preview-document-content px-20">
      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h5>
                    <a
                      href="#"
                      className="text-decoration-underline text-white text-regular"
                    >
                      Forms
                    </a>
                    <span className="text-regular">></span> Edit Form for
                    Business Name
                  </h5>
                </div>
                <div className="col-sm-4">
                  <div className="table-filter-div">
                    <button className="btn btn-primary">Exit preview</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pre-document-card">
            <div className="pre-doc-title">
              <h5 className="textcolor2 text-uppercase">Business name form</h5>
            </div>
            <div className="doc-box p-0 border-0">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Select Dua or Raza araz</label>
                    <select className="form-control form-control2">
                      <option>Raza Araz</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Select category of Raza</label>
                    <select className="form-control form-control2">
                      <option>Business related raza</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Select type of Raza</label>
                    <select className="form-control form-control2">
                      <option>For Business name</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr className="form-line" />

              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>ITS ID of applicant</label>
                    <input
                      type="text"
                      className="form-control form-control2"
                      value="30393030"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Contact details of araz owner</label>
                    <input
                      type="text"
                      className="form-control form-control2"
                      value="909-099-0909"
                    />
                  </div>
                </div>
              </div>

              <hr className="form-line" />

              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>
                      Provide a name of your choice{' '}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control2"
                      value="Saifee Hardware Store"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Any other name of choice</label>
                    <input
                      type="text"
                      className="form-control form-control2"
                      value="None"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Location of business</label>
                    <input
                      type="text"
                      className="form-control form-control2"
                      value="Surat"
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Select the type of business</label>
                    <select className="form-control form-control2">
                      <option>Hardware and tools</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="form-line" />

              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className="form-group mb-3">
                    <label>Upload a file</label>
                    <div className="attach-file ">
                      <label
                        className="border-primary2"
                        htmlFor="Business_Photo"
                      >
                        <img
                          src="/assets/images/upload-icon.svg"
                          className="img-fluid"
                        />
                        <span className="attach-label-1">
                          Upload from computer
                        </span>
                        <span className="attach-label-2">
                          .png and .jpg (max 2MB size only)
                        </span>
                      </label>
                      <input
                        type="file"
                        className="form-control form-control2 d-none"
                        id="Business_Photo"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFormPreview;
