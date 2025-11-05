import React from 'react';

const ArazForm = () => {
  return (
    <div
      className="modal fade araz-modal"
      id="Start_New_Araz"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="help-box step-1">
            <div className="ntf-head">
              <h5 className="text-primary">Fill the form to proceed</h5>
              <div className="d-flex gap-4">
                <button className="btn btn-primary py-2">Next</button>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5127 0.503977C21.3583 0.349284 21.175 0.226556 20.9731 0.142819C20.7712 0.0590823 20.5548 0.0159799 20.3363 0.0159799C20.1177 0.0159799 19.9013 0.0590823 19.6995 0.142819C19.4976 0.226556 19.3142 0.349284 19.1599 0.503977L11 8.64716L2.84014 0.48729C2.68565 0.3328 2.50224 0.210252 2.30039 0.126642C2.09854 0.0430327 1.88219 1.62782e-09 1.66371 0C1.44523 -1.62782e-09 1.22889 0.0430327 1.02704 0.126642C0.825186 0.210251 0.64178 0.3328 0.48729 0.48729C0.3328 0.64178 0.210251 0.825186 0.126642 1.02704C0.0430327 1.22889 -1.62782e-09 1.44523 0 1.66371C1.62782e-09 1.88219 0.0430327 2.09854 0.126642 2.30039C0.210252 2.50224 0.3328 2.68565 0.48729 2.84014L8.64716 11L0.48729 19.1599C0.3328 19.3144 0.210251 19.4978 0.126642 19.6996C0.0430327 19.9015 0 20.1178 0 20.3363C0 20.5548 0.0430327 20.7711 0.126642 20.973C0.210251 21.1748 0.3328 21.3582 0.48729 21.5127C0.64178 21.6672 0.825186 21.7897 1.02704 21.8734C1.22889 21.957 1.44523 22 1.66371 22C1.88219 22 2.09854 21.957 2.30039 21.8734C2.50224 21.7897 2.68565 21.6672 2.84014 21.5127L11 13.3528L19.1599 21.5127C19.3144 21.6672 19.4978 21.7897 19.6996 21.8734C19.9015 21.957 20.1178 22 20.3363 22C20.5548 22 20.7711 21.957 20.973 21.8734C21.1748 21.7897 21.3582 21.6672 21.5127 21.5127C21.6672 21.3582 21.7897 21.1748 21.8734 20.973C21.957 20.7711 22 20.5548 22 20.3363C22 20.1178 21.957 19.9015 21.8734 19.6996C21.7897 19.4978 21.6672 19.3144 21.5127 19.1599L13.3528 11L21.5127 2.84014C22.1468 2.20604 22.1468 1.13808 21.5127 0.503977Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="ntf-body">
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

          <div className="help-box step-2">
            <div className="ntf-head flex-wrap">
              <h5 className="text-primary">
                <span>Fill form ></span>
                Preview > Araz ID - 23368
              </h5>
              <div className="d-flex gap-4">
                <button className="btn p-0 text-dark text-decoration-underline draft-btn">
                  Save as draft
                </button>
                <button className="btn btn-primary py-2">Next</button>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5127 0.503977C21.3583 0.349284 21.175 0.226556 20.9731 0.142819C20.7712 0.0590823 20.5548 0.0159799 20.3363 0.0159799C20.1177 0.0159799 19.9013 0.0590823 19.6995 0.142819C19.4976 0.226556 19.3142 0.349284 19.1599 0.503977L11 8.64716L2.84014 0.48729C2.68565 0.3328 2.50224 0.210252 2.30039 0.126642C2.09854 0.0430327 1.88219 1.62782e-09 1.66371 0C1.44523 -1.62782e-09 1.22889 0.0430327 1.02704 0.126642C0.825186 0.210251 0.64178 0.3328 0.48729 0.48729C0.3328 0.64178 0.210251 0.825186 0.126642 1.02704C0.0430327 1.22889 -1.62782e-09 1.44523 0 1.66371C1.62782e-09 1.88219 0.0430327 2.09854 0.126642 2.30039C0.210252 2.50224 0.3328 2.68565 0.48729 2.84014L8.64716 11L0.48729 19.1599C0.3328 19.3144 0.210251 19.4978 0.126642 19.6996C0.0430327 19.9015 0 20.1178 0 20.3363C0 20.5548 0.0430327 20.7711 0.126642 20.973C0.210251 21.1748 0.3328 21.3582 0.48729 21.5127C0.64178 21.6672 0.825186 21.7897 1.02704 21.8734C1.22889 21.957 1.44523 22 1.66371 22C1.88219 22 2.09854 21.957 2.30039 21.8734C2.50224 21.7897 2.68565 21.6672 2.84014 21.5127L11 13.3528L19.1599 21.5127C19.3144 21.6672 19.4978 21.7897 19.6996 21.8734C19.9015 21.957 20.1178 22 20.3363 22C20.5548 22 20.7711 21.957 20.973 21.8734C21.1748 21.7897 21.3582 21.6672 21.5127 21.5127C21.6672 21.3582 21.7897 21.1748 21.8734 20.973C21.957 20.7711 22 20.5548 22 20.3363C22 20.1178 21.957 19.9015 21.8734 19.6996C21.7897 19.4978 21.6672 19.3144 21.5127 19.1599L13.3528 11L21.5127 2.84014C22.1468 2.20604 22.1468 1.13808 21.5127 0.503977Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="ntf-body">
              <div className="raza-progress-body">
                <div className="row">
                  <div className="col-md-5">
                    <div className="araz-info-card shadow-none mb-4">
                      <div className="araz-info-group">
                        <div className="araz-info-icon">
                          <img
                            src="/assets/images/name-icon.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>
                        <div className="araz-info-text">
                          <p>Your araz is for</p>
                          <h5>
                            Business name dealing in Hardware & Tools in Surat
                            city
                          </h5>
                        </div>
                      </div>

                      <div className="araz-info-group">
                        <div className="araz-info-icon">
                          <img
                            src="/assets/images/location-icon.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>
                        <div className="araz-info-text">
                          <p>Location of business</p>
                          <h5>Surat</h5>
                        </div>
                      </div>

                      <div className="araz-info-group">
                        <div className="araz-info-icon">
                          <img
                            src="/assets/images/bag-icon.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>
                        <div className="araz-info-text">
                          <p>Type of business</p>
                          <h5>Hardware, Tools and Machinery</h5>
                        </div>
                      </div>

                      <div className="araz-info-group">
                        <div className="araz-info-icon">
                          <img
                            src="/assets/images/star-icon.svg"
                            alt="img"
                            className="img-fluid"
                          />
                        </div>
                        <div className="araz-info-text">
                          <p>First name of your choice</p>
                          <h5>Saifee Hardware Store</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="araz-card p-0 bg-transparent">
                      <img
                        src="/assets/images/araz.png"
                        alt="img"
                        className="img-fluid"
                        width="100%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="help-box step-3">
            <div className="ntf-head">
              <div></div>
              <div className="d-flex gap-4">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5127 0.503977C21.3583 0.349284 21.175 0.226556 20.9731 0.142819C20.7712 0.0590823 20.5548 0.0159799 20.3363 0.0159799C20.1177 0.0159799 19.9013 0.0590823 19.6995 0.142819C19.4976 0.226556 19.3142 0.349284 19.1599 0.503977L11 8.64716L2.84014 0.48729C2.68565 0.3328 2.50224 0.210252 2.30039 0.126642C2.09854 0.0430327 1.88219 1.62782e-09 1.66371 0C1.44523 -1.62782e-09 1.22889 0.0430327 1.02704 0.126642C0.825186 0.210251 0.64178 0.3328 0.48729 0.48729C0.3328 0.64178 0.210251 0.825186 0.126642 1.02704C0.0430327 1.22889 -1.62782e-09 1.44523 0 1.66371C1.62782e-09 1.88219 0.0430327 2.09854 0.126642 2.30039C0.210252 2.50224 0.3328 2.68565 0.48729 2.84014L8.64716 11L0.48729 19.1599C0.3328 19.3144 0.210251 19.4978 0.126642 19.6996C0.0430327 19.9015 0 20.1178 0 20.3363C0 20.5548 0.0430327 20.7711 0.126642 20.973C0.210251 21.1748 0.3328 21.3582 0.48729 21.5127C0.64178 21.6672 0.825186 21.7897 1.02704 21.8734C1.22889 21.957 1.44523 22 1.66371 22C1.88219 22 2.09854 21.957 2.30039 21.8734C2.50224 21.7897 2.68565 21.6672 2.84014 21.5127L11 13.3528L19.1599 21.5127C19.3144 21.6672 19.4978 21.7897 19.6996 21.8734C19.9015 21.957 20.1178 22 20.3363 22C20.5548 22 20.7711 21.957 20.973 21.8734C21.1748 21.7897 21.3582 21.6672 21.5127 21.5127C21.6672 21.3582 21.7897 21.1748 21.8734 20.973C21.957 20.7711 22 20.5548 22 20.3363C22 20.1178 21.957 19.9015 21.8734 19.6996C21.7897 19.4978 21.6672 19.3144 21.5127 19.1599L13.3528 11L21.5127 2.84014C22.1468 2.20604 22.1468 1.13808 21.5127 0.503977Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="ntf-body">
              <div className="raza-progress-body bg-white">
                <div className="row justify-content-center">
                  <div className="ntf-head justify-content-center">
                    <h5 className="text-primary text-center">
                      Araz ID-23368{' '}
                      <span className="text-primary">
                        has been created successfully
                      </span>
                    </h5>
                  </div>

                  <div className="col-md-6">
                    <div className="araz-card p-0 bg-transparent shadow">
                      <img
                        src="/assets/images/araz.png"
                        alt="img"
                        className="img-fluid"
                        width="100%"
                      />
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

export default ArazForm;
