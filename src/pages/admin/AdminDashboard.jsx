import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="dashboard-content px-20">
      <div
        className="offcanvas offcanvas-end custom-canvas-div"
        tabIndex="-1"
        id="Activity_Log"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header border-0 pb-0">
          <h5 id="offcanvasRightLabel">Activity log</h5>
          <div className="canv-right-btn">
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
          <div className="active-log-according">
            <div className="accordion" id="Log_Accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#logcollapse1"
                    aria-expanded="true"
                    aria-controls="logcollapse1"
                  >
                    <span>This week</span>
                  </button>
                </h2>
                <div
                  id="logcollapse1"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#Log_Accordion"
                >
                  <div className="accordion-body">
                    <div className="log-list">
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#logcollapse2"
                    aria-expanded="false"
                    aria-controls="logcollapse2"
                  >
                    <span>Last week</span>
                  </button>
                </h2>
                <div
                  id="logcollapse2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#Log_Accordion"
                >
                  <div className="accordion-body">
                    <div className="log-list">
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#logcollapse3"
                    aria-expanded="false"
                    aria-controls="logcollapse3"
                  >
                    <span>Last month</span>
                  </button>
                </h2>
                <div
                  id="logcollapse3"
                  className="accordion-collapse collapse"
                  data-bs-parent="#Log_Accordion"
                >
                  <div className="accordion-body">
                    <div className="log-list">
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#logcollapse4"
                    aria-expanded="false"
                    aria-controls="logcollapse4"
                  >
                    <span>May 2022</span>
                  </button>
                </h2>
                <div
                  id="logcollapse4"
                  className="accordion-collapse collapse"
                  data-bs-parent="#Log_Accordion"
                >
                  <div className="accordion-body">
                    <div className="log-list">
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#logcollapse5"
                    aria-expanded="false"
                    aria-controls="logcollapse5"
                  >
                    <span>April 2022</span>
                  </button>
                </h2>
                <div
                  id="logcollapse5"
                  className="accordion-collapse collapse"
                  data-bs-parent="#Log_Accordion"
                >
                  <div className="accordion-body">
                    <div className="log-list">
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                      <div className="log-main-box">
                        <div className="log-box">
                          <h6>3:23 PM, 29th July 2022</h6>
                          <p>
                            Taher Bhai Qasim Bhai Suratwala approved the budget
                            request
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="offcanvas-header border-0 px-0">
            <h5>Version History</h5>
          </div>
          <div className="active-log-according">
            <div className="accordion" id="Log_History_Accordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#historylogcollapse1"
                    aria-expanded="true"
                    aria-controls="historylogcollapse1"
                  >
                    <span>Today</span>
                  </button>
                </h2>
                <div
                  id="historylogcollapse1"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#Log_History_Accordion"
                >
                  <div className="accordion-body">
                    <div className="log-list">
                      <div className="log-box mb-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          <div className="lb-left">
                            <h6 className="mb-1">3:23 PM, 30th AUG 2022</h6>
                            <small>Mohammed Sabuwala</small>
                            <p className="text-primary">
                              Current version (v_1.0)
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="log-box mb-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          <div className="lb-left">
                            <h6 className="mb-1">3:23 PM, 30th AUG 2022</h6>
                            <small>Mohammed Sabuwala</small>
                            <p className="text-primary">
                              Current version (v_1.0)
                            </p>
                          </div>
                          <div className="lb-left">
                            <button className="btn text-primary p-0 text-decoration-underline">
                              Restore version
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#historylogcollapse2"
                    aria-expanded="false"
                    aria-controls="historylogcollapse2"
                  >
                    <span>Yesterday</span>
                  </button>
                </h2>
                <div
                  id="historylogcollapse2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#Log_History_Accordion"
                >
                  <div className="accordion-body">
                    <div className="log-list">
                      <div className="log-box mb-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          <div className="lb-left">
                            <h6 className="mb-1">3:23 PM, 30th AUG 2022</h6>
                            <small>Mohammed Sabuwala</small>
                            <p className="text-primary">
                              Current version (v_1.0)
                            </p>
                          </div>
                          <div className="lb-left">
                            <button className="btn text-primary p-0 text-decoration-underline">
                              Restore version
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="log-box mb-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                          <div className="lb-left">
                            <h6 className="mb-1">3:23 PM, 30th AUG 2022</h6>
                            <small>Mohammed Sabuwala</small>
                            <p className="text-primary">
                              Current version (v_1.0)
                            </p>
                          </div>
                          <div className="lb-left">
                            <button className="btn text-primary p-0 text-decoration-underline">
                              Restore version
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
        </div>
      </div>

      <div className="container-fluid">
        <div className="admin-card">
          <div className="request-table-div">
            <div className="title-div mb-4">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <h5>Dashboard</h5>
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
                        <option>Hyderabad</option>
                      </select>
                    </div>
                    <div className="custom-input-group">
                      <label>Jamaat</label>
                      <select className="tb-custom-control">
                        <option>Ezzy</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card-list mb-3">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="dashboard-card bg-white mb-4">
                    <div className="dc-head">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <div className="card-title">
                            <p>New requests </p>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-icon">
                            <svg
                              width="65"
                              height="68"
                              viewBox="0 0 65 68"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.4">
                                <path
                                  d="M31.7349 46.2238C43.947 46.2238 53.8468 36.3239 53.8468 24.1119C53.8468 11.8998 43.947 2 31.7349 2C19.5229 2 9.62305 11.8998 9.62305 24.1119C9.62305 36.3239 19.5229 46.2238 31.7349 46.2238Z"
                                  stroke="#A99368"
                                  stroke-width="2.6"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M31.7406 33.9381C37.1682 33.9381 41.5681 29.5382 41.5681 24.1106C41.5681 18.683 37.1682 14.2831 31.7406 14.2831C26.313 14.2831 21.9131 18.683 21.9131 24.1106C21.9131 29.5382 26.313 33.9381 31.7406 33.9381Z"
                                  stroke="#A99368"
                                  stroke-width="2.6"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M27.4632 45.83L23.1391 64.0109C23.0535 64.3564 22.8953 64.6797 22.675 64.9593C22.4547 65.2389 22.1774 65.4684 21.8615 65.6324C21.5281 65.7771 21.1685 65.8518 20.805 65.8518C20.4416 65.8518 20.082 65.7771 19.7486 65.6324L3.43494 58.5075C3.09275 58.3457 2.79165 58.1085 2.55424 57.8137C2.31683 57.5189 2.14929 57.1742 2.06418 56.8054C1.97907 56.4366 1.9786 56.0533 2.06283 55.6843C2.14705 55.3153 2.31376 54.9701 2.55046 54.6748L15.1788 38.8525"
                                  stroke="#A99368"
                                  stroke-width="2.6"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M37.29 45.5856L41.7124 64.0122C41.8004 64.3636 41.9649 64.6911 42.1943 64.9715C42.4236 65.2518 42.7121 65.478 43.0391 65.6337C43.3634 65.7803 43.7152 65.856 44.071 65.856C44.4269 65.856 44.7786 65.7803 45.1029 65.6337L61.3183 58.5088C61.6656 58.349 61.9709 58.1103 62.2097 57.8117C62.4486 57.5131 62.6144 57.1629 62.6941 56.789C62.7873 56.4232 62.7913 56.0403 62.7058 55.6727C62.6203 55.305 62.4478 54.9632 62.2028 54.6761L49.0339 37.9202"
                                  stroke="#A99368"
                                  stroke-width="2.6"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dc-bottom">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <button className="btn p-0 view-req-btn">
                            View requests >
                          </button>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-count">
                            <h1>18</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="dashboard-card bg-white mb-4">
                    <div className="dc-head">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <div className="card-title">
                            <p>Incomplete requests </p>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-icon">
                            <svg
                              width="53"
                              height="62"
                              viewBox="0 0 53 62"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.4"
                                d="M26.5 8.85714C21.2588 8.85714 16.1353 10.4155 11.7774 13.3352C7.4195 16.2549 4.02293 20.4048 2.0172 25.2601C0.0114821 30.1154 -0.513306 35.458 0.509202 40.6124C1.53171 45.7667 4.05559 50.5013 7.76168 54.2174C11.4678 57.9335 16.1896 60.4642 21.3301 61.4894C26.4706 62.5147 31.7989 61.9885 36.6411 59.9774C41.4834 57.9662 45.6221 54.5605 48.5339 50.1909C51.4458 45.8212 53 40.6839 53 35.4286C52.992 28.3839 50.1974 21.63 45.2295 16.6486C40.2615 11.6673 33.5258 8.8652 26.5 8.85714ZM26.5 57.5714C22.1323 57.5714 17.8628 56.2728 14.2312 53.8397C10.5996 51.4066 7.76911 47.9483 6.09767 43.9023C4.42624 39.8562 3.98891 35.404 4.841 31.1087C5.69309 26.8134 7.79633 22.8679 10.8847 19.7712C13.9731 16.6745 17.908 14.5656 22.1918 13.7112C26.4755 12.8568 30.9157 13.2953 34.9509 14.9712C38.9861 16.6472 42.4351 19.4853 44.8616 23.1267C47.2882 26.768 48.5833 31.0491 48.5833 35.4286C48.5768 41.2992 46.248 46.9275 42.108 51.0786C37.968 55.2298 32.3549 57.5648 26.5 57.5714ZM39.1041 22.7905C39.3094 22.9962 39.4723 23.2404 39.5834 23.5092C39.6945 23.778 39.7517 24.0661 39.7517 24.3571C39.7517 24.6481 39.6945 24.9363 39.5834 25.2051C39.4723 25.4739 39.3094 25.7181 39.1041 25.9237L28.0624 36.9952C27.8572 37.2009 27.6136 37.3641 27.3456 37.4754C27.0775 37.5868 26.7902 37.6441 26.5 37.6441C26.2098 37.6441 25.9225 37.5868 25.6544 37.4754C25.3864 37.3641 25.1428 37.2009 24.9376 36.9952C24.7324 36.7894 24.5697 36.5452 24.4586 36.2764C24.3476 36.0076 24.2904 35.7195 24.2904 35.4286C24.2904 35.1376 24.3476 34.8495 24.4586 34.5807C24.5697 34.3119 24.7324 34.0677 24.9376 33.862L35.9793 22.7905C36.1844 22.5847 36.4279 22.4213 36.696 22.3099C36.9641 22.1985 37.2515 22.1411 37.5417 22.1411C37.8319 22.1411 38.1192 22.1985 38.3873 22.3099C38.6554 22.4213 38.899 22.5847 39.1041 22.7905ZM17.6667 2.21429C17.6667 1.62702 17.8993 1.06381 18.3135 0.648549C18.7276 0.23329 19.2893 0 19.875 0H33.125C33.7107 0 34.2724 0.23329 34.6865 0.648549C35.1007 1.06381 35.3333 1.62702 35.3333 2.21429C35.3333 2.80155 35.1007 3.36476 34.6865 3.78002C34.2724 4.19528 33.7107 4.42857 33.125 4.42857H19.875C19.2893 4.42857 18.7276 4.19528 18.3135 3.78002C17.8993 3.36476 17.6667 2.80155 17.6667 2.21429Z"
                                fill="#A99368"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dc-bottom">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <button className="btn p-0 view-req-btn">
                            View requests >
                          </button>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-count">
                            <h1>39</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="dashboard-card bg-white mb-4">
                    <div className="dc-head">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <div className="card-title">
                            <p>Approved requests </p>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-icon">
                            <svg
                              width="58"
                              height="58"
                              viewBox="0 0 58 58"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.4">
                                <path
                                  d="M37.8225 49.7632L43.7935 55.7342L55.7339 43.7937M43.7935 2H10.9555C10.1639 2 9.40467 2.31446 8.84492 2.87421C8.28517 3.43396 7.9707 4.19315 7.9707 4.98475V19.9114H19.9112L25.8821 25.8823H49.763V7.97094M43.7935 2L49.763 7.97094M43.7935 2V7.97094H49.763"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M25.8823 55.7342H4.98475C4.19315 55.7342 3.43396 55.4197 2.87421 54.8599C2.31446 54.3002 2 53.541 2 52.7494V22.8961C2 22.1045 2.31446 21.3453 2.87421 20.7856C3.43396 20.2258 4.19315 19.9114 4.98475 19.9114H19.9114L25.8823 25.8823H52.7494C53.541 25.8823 54.3002 26.1968 54.86 26.7565C55.4197 27.3163 55.7342 28.0755 55.7342 28.8671V31.8518"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dc-bottom">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <button className="btn p-0 view-req-btn">
                            View requests >
                          </button>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-count">
                            <h1>12</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="dashboard-card bg-white mb-4">
                    <div className="dc-head">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <div className="card-title">
                            <p>Rejected requests</p>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-icon">
                            <svg
                              width="62"
                              height="62"
                              viewBox="0 0 62 62"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.4">
                                <path
                                  d="M31.2537 60.5074C47.41 60.5074 60.5074 47.41 60.5074 31.2537C60.5074 15.0973 47.41 2 31.2537 2C15.0973 2 2 15.0973 2 31.2537C2 47.41 15.0973 60.5074 31.2537 60.5074Z"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M31.2539 15.5016V29.0033"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M31.2522 44.7564C32.495 44.7564 33.5025 43.7489 33.5025 42.5061C33.5025 41.2633 32.495 40.2558 31.2522 40.2558C30.0094 40.2558 29.002 41.2633 29.002 42.5061C29.002 43.7489 30.0094 44.7564 31.2522 44.7564Z"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dc-bottom">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <button className="btn p-0 view-req-btn">
                            View requests >
                          </button>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-count">
                            <h1>03</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="dashboard-card bg-white mb-4">
                    <div className="dc-head">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <div className="card-title">
                            <p>Istershaad / Manzoori</p>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-icon">
                            <svg
                              width="57"
                              height="57"
                              viewBox="0 0 57 57"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.4">
                                <path
                                  d="M6.10068 10.2005C5.01311 10.2005 3.97009 10.6325 3.20106 11.4016C2.43203 12.1706 2 13.2136 2 14.3012V51.2073C2 52.2949 2.43203 53.3379 3.20106 54.1069C3.97009 54.876 5.01311 55.308 6.10068 55.308H51.2082C52.2957 55.308 53.3388 54.876 54.1078 54.1069C54.8768 53.3379 55.3089 52.2949 55.3089 51.2073V14.3012C55.3089 13.2136 54.8768 12.1706 54.1078 11.4016C53.3388 10.6325 52.2957 10.2005 51.2082 10.2005H43.0068"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M2 26.6038H55.3089"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.3018 2V18.4027"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M43.0068 2V18.4027"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.3018 10.2004H34.8052"
                                  stroke="#A99368"
                                  stroke-width="3"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dc-bottom">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <button className="btn p-0 view-req-btn">
                            View requests >
                          </button>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-count">
                            <h1>40</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="dashboard-card bg-white mb-4">
                    <div className="dc-head">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <div className="card-title">
                            <p>Completed requests</p>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-icon">
                            <svg
                              width="61"
                              height="46"
                              viewBox="0 0 61 46"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.4"
                                d="M61 4.83669L19.1714 46L0 27.1335L4.91486 22.2968L19.1714 36.2923L56.0851 0L61 4.83669Z"
                                fill="#A99368"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dc-bottom">
                      <div className="row align-items-center justify-content-between">
                        <div className="col-8">
                          <button className="btn p-0 view-req-btn">
                            View requests >
                          </button>
                        </div>
                        <div className="col-4 text-end">
                          <div className="dc-count">
                            <h1>64</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="title-div mb-4">
              <h5>All Requests</h5>
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
                      <div className="filter-select">
                        <label>Show :</label>
                        <select>
                          <option>All</option>
                        </select>
                      </div>
                      <div className="import-btn-div">
                        <input id="file-import" type="file" />
                        <label htmlFor="file-import">Import</label>
                      </div>
                      <div className="import-btn-div">
                        <input id="file-export" type="file" />
                        <label htmlFor="file-export">Export</label>
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
                        <th>Business name</th>
                        <th>Jamiat</th>
                        <th>Jamaat</th>
                        <th>Added on</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Comments</th>
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
                        <td>Mohammedi Hardware</td>
                        <td>Surat</td>
                        <td>Surat</td>
                        <td>04 Aug 2023</td>
                        <td>Raza araz</td>
                        <td>
                          <span className="blue-status">Request</span>
                        </td>
                        <td>I am facing problems in creating my...</td>
                        <td>
                          <div className="action-btn-list">
                            <Link to="Overview">
                              <button className="btn btn-primary text-nowrap">
                                Review request
                              </button>
                            </Link>
                            <button className="btn btn-primary2 circle-btn">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 13.599L4.44986 9.05014L5.36014 8.12443L8.35714 11.1214V0H9.64286V11.1214L12.6386 8.12571L13.5501 9.05014L9 13.599ZM2.07771 18C1.48543 18 0.991285 17.802 0.595285 17.406C0.199285 17.01 0.000857143 16.5154 0 15.9223V12.807H1.28571V15.9223C1.28571 16.1203 1.368 16.302 1.53257 16.4674C1.69714 16.6329 1.87843 16.7151 2.07643 16.7143H15.9236C16.1207 16.7143 16.302 16.632 16.4674 16.4674C16.6329 16.3029 16.7151 16.1211 16.7143 15.9223V12.807H18V15.9223C18 16.5146 17.802 17.0087 17.406 17.4047C17.01 17.8007 16.5154 17.9991 15.9223 18H2.07771Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                            <button
                              className="btn btn-primary2 circle-btn"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#Activity_Log"
                            >
                              <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.5 6.19312V10.5008L13.1923 13.1931"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M2.24861 4.97727L1.44092 4.9805C1.44177 5.19341 1.52665 5.39737 1.6771 5.54802C1.82755 5.69868 2.0314 5.78383 2.24431 5.78496L2.24861 4.97727ZM4.98615 5.79789C5.09222 5.79838 5.19734 5.77798 5.29553 5.73785C5.39371 5.69771 5.48303 5.63864 5.55838 5.56398C5.63373 5.48933 5.69364 5.40057 5.73469 5.30277C5.77573 5.20496 5.79712 5.10003 5.79761 4.99396C5.79811 4.8879 5.77771 4.78277 5.73757 4.68459C5.69744 4.5864 5.63836 4.49709 5.56371 4.42174C5.48906 4.34639 5.4003 4.28647 5.30249 4.24543C5.20469 4.20438 5.09976 4.183 4.99369 4.1825L4.98615 5.79789ZM3.04231 2.23112C3.04116 2.01691 2.95497 1.81192 2.80269 1.66126C2.65041 1.51059 2.44452 1.42659 2.23031 1.42774C2.01609 1.42888 1.81111 1.51507 1.66044 1.66735C1.50978 1.81963 1.42578 2.02552 1.42692 2.23974L3.04231 2.23112ZM1.61538 10.5008C1.61538 10.2866 1.53029 10.0812 1.37882 9.92968C1.22734 9.77821 1.0219 9.69311 0.807692 9.69311C0.593479 9.69311 0.388039 9.77821 0.236567 9.92968C0.0850957 10.0812 0 10.2866 0 10.5008H1.61538ZM15.75 19.5954C15.8457 19.5445 15.9301 19.4747 15.9983 19.3904C16.0665 19.3062 16.117 19.209 16.1469 19.1048C16.1767 19.0005 16.1852 18.8913 16.172 18.7837C16.1587 18.6761 16.1239 18.5723 16.0697 18.4784C16.0154 18.3845 15.9429 18.3025 15.8563 18.2373C15.7696 18.1721 15.6708 18.125 15.5656 18.0988C15.4604 18.0726 15.351 18.0678 15.2439 18.0848C15.1368 18.1017 15.0342 18.1401 14.9423 18.1976L15.75 19.5954ZM18.1968 14.9431C18.1393 15.0351 18.1009 15.1376 18.084 15.2447C18.067 15.3518 18.0717 15.4612 18.0979 15.5664C18.1242 15.6716 18.1713 15.7705 18.2365 15.8571C18.3017 15.9437 18.3837 16.0163 18.4776 16.0705C18.5715 16.1247 18.6753 16.1595 18.7829 16.1728C18.8905 16.1861 18.9997 16.1775 19.1039 16.1477C19.2082 16.1178 19.3053 16.0673 19.3896 15.9991C19.4739 15.931 19.5436 15.8465 19.5946 15.7508L18.1968 14.9431ZM3.11231 3.03773C2.96007 3.18854 2.87398 3.39364 2.87297 3.60793C2.87196 3.82221 2.95612 4.02811 3.10692 4.18035C3.25773 4.33258 3.46283 4.41868 3.67711 4.41968C3.89139 4.42069 4.0973 4.33654 4.24954 4.18573L3.11231 3.03773ZM17.8898 3.10989C13.776 -1.00395 7.12815 -1.04488 3.04123 3.04204L4.18277 4.1825C7.62892 0.737429 13.2537 0.75789 16.7483 4.2525L17.8898 3.10989ZM3.04123 3.04204L1.67785 4.40543L2.81938 5.54696L4.18384 4.18466L3.04123 3.04204ZM2.24431 5.78496L4.98615 5.79789L4.99369 4.1825L2.25292 4.16958L2.24431 5.78496ZM3.05631 4.97296L3.04231 2.23112L1.42692 2.23974L1.44092 4.9805L3.05631 4.97296ZM10.5 1.6162C12.8563 1.6162 15.1162 2.55225 16.7824 4.21844C18.4485 5.88463 19.3846 8.14446 19.3846 10.5008H21C21 7.71603 19.8937 5.04532 17.9246 3.07619C15.9555 1.10706 13.2848 0.000813715 10.5 0.000813715V1.6162ZM10.5 19.3854C8.14365 19.3854 5.88381 18.4494 4.21763 16.7832C2.55144 15.117 1.61538 12.8572 1.61538 10.5008H0C0 13.2856 1.10625 15.9563 3.07538 17.9254C5.04451 19.8946 7.71522 21.0008 10.5 21.0008V19.3854ZM14.9423 18.1976C13.5924 18.9789 12.0597 19.3887 10.5 19.3854V21.0008C12.4115 21.0008 14.2046 20.4893 15.75 19.5954L14.9423 18.1976ZM19.3846 10.5008C19.3879 12.0605 18.9781 13.5932 18.1968 14.9431L19.5946 15.7508C20.5181 14.1555 21.0029 12.3442 21 10.5008H19.3846ZM4.24954 4.18573C5.91106 2.53595 8.15853 1.61271 10.5 1.6162V0.000813715C7.73267 -0.00286855 5.07648 1.08834 3.11231 3.03773L4.24954 4.18573Z"
                                  fill="white"
                                />
                              </svg>
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
                        <td>Mohammedi Hardware</td>
                        <td>Surat</td>
                        <td>Surat</td>
                        <td>04 Aug 2023</td>
                        <td>Raza araz</td>
                        <td>
                          <span className="orange-status">
                            Manzoori received
                          </span>
                        </td>
                        <td>I am facing problems in creating my...</td>
                        <td>
                          <div className="action-btn-list">
                            <Link to="Overview">
                              <button className="btn btn-primary text-nowrap">
                                Review request
                              </button>
                            </Link>
                            <button className="btn btn-primary2 circle-btn">
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9 13.599L4.44986 9.05014L5.36014 8.12443L8.35714 11.1214V0H9.64286V11.1214L12.6386 8.12571L13.5501 9.05014L9 13.599ZM2.07771 18C1.48543 18 0.991285 17.802 0.595285 17.406C0.199285 17.01 0.000857143 16.5154 0 15.9223V12.807H1.28571V15.9223C1.28571 16.1203 1.368 16.302 1.53257 16.4674C1.69714 16.6329 1.87843 16.7151 2.07643 16.7143H15.9236C16.1207 16.7143 16.302 16.632 16.4674 16.4674C16.6329 16.3029 16.7151 16.1211 16.7143 15.9223V12.807H18V15.9223C18 16.5146 17.802 17.0087 17.406 17.4047C17.01 17.8007 16.5154 17.9991 15.9223 18H2.07771Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                            <button className="btn btn-primary2 circle-btn">
                              <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.5 6.19312V10.5008L13.1923 13.1931"
                                  stroke="white"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M2.24861 4.97727L1.44092 4.9805C1.44177 5.19341 1.52665 5.39737 1.6771 5.54802C1.82755 5.69868 2.0314 5.78383 2.24431 5.78496L2.24861 4.97727ZM4.98615 5.79789C5.09222 5.79838 5.19734 5.77798 5.29553 5.73785C5.39371 5.69771 5.48303 5.63864 5.55838 5.56398C5.63373 5.48933 5.69364 5.40057 5.73469 5.30277C5.77573 5.20496 5.79712 5.10003 5.79761 4.99396C5.79811 4.8879 5.77771 4.78277 5.73757 4.68459C5.69744 4.5864 5.63836 4.49709 5.56371 4.42174C5.48906 4.34639 5.4003 4.28647 5.30249 4.24543C5.20469 4.20438 5.09976 4.183 4.99369 4.1825L4.98615 5.79789ZM3.04231 2.23112C3.04116 2.01691 2.95497 1.81192 2.80269 1.66126C2.65041 1.51059 2.44452 1.42659 2.23031 1.42774C2.01609 1.42888 1.81111 1.51507 1.66044 1.66735C1.50978 1.81963 1.42578 2.02552 1.42692 2.23974L3.04231 2.23112ZM1.61538 10.5008C1.61538 10.2866 1.53029 10.0812 1.37882 9.92968C1.22734 9.77821 1.0219 9.69311 0.807692 9.69311C0.593479 9.69311 0.388039 9.77821 0.236567 9.92968C0.0850957 10.0812 0 10.2866 0 10.5008H1.61538ZM15.75 19.5954C15.8457 19.5445 15.9301 19.4747 15.9983 19.3904C16.0665 19.3062 16.117 19.209 16.1469 19.1048C16.1767 19.0005 16.1852 18.8913 16.172 18.7837C16.1587 18.6761 16.1239 18.5723 16.0697 18.4784C16.0154 18.3845 15.9429 18.3025 15.8563 18.2373C15.7696 18.1721 15.6708 18.125 15.5656 18.0988C15.4604 18.0726 15.351 18.0678 15.2439 18.0848C15.1368 18.1017 15.0342 18.1401 14.9423 18.1976L15.75 19.5954ZM18.1968 14.9431C18.1393 15.0351 18.1009 15.1376 18.084 15.2447C18.067 15.3518 18.0717 15.4612 18.0979 15.5664C18.1242 15.6716 18.1713 15.7705 18.2365 15.8571C18.3017 15.9437 18.3837 16.0163 18.4776 16.0705C18.5715 16.1247 18.6753 16.1595 18.7829 16.1728C18.8905 16.1861 18.9997 16.1775 19.1039 16.1477C19.2082 16.1178 19.3053 16.0673 19.3896 15.9991C19.4739 15.931 19.5436 15.8465 19.5946 15.7508L18.1968 14.9431ZM3.11231 3.03773C2.96007 3.18854 2.87398 3.39364 2.87297 3.60793C2.87196 3.82221 2.95612 4.02811 3.10692 4.18035C3.25773 4.33258 3.46283 4.41868 3.67711 4.41968C3.89139 4.42069 4.0973 4.33654 4.24954 4.18573L3.11231 3.03773ZM17.8898 3.10989C13.776 -1.00395 7.12815 -1.04488 3.04123 3.04204L4.18277 4.1825C7.62892 0.737429 13.2537 0.75789 16.7483 4.2525L17.8898 3.10989ZM3.04123 3.04204L1.67785 4.40543L2.81938 5.54696L4.18384 4.18466L3.04123 3.04204ZM2.24431 5.78496L4.98615 5.79789L4.99369 4.1825L2.25292 4.16958L2.24431 5.78496ZM3.05631 4.97296L3.04231 2.23112L1.42692 2.23974L1.44092 4.9805L3.05631 4.97296ZM10.5 1.6162C12.8563 1.6162 15.1162 2.55225 16.7824 4.21844C18.4485 5.88463 19.3846 8.14446 19.3846 10.5008H21C21 7.71603 19.8937 5.04532 17.9246 3.07619C15.9555 1.10706 13.2848 0.000813715 10.5 0.000813715V1.6162ZM10.5 19.3854C8.14365 19.3854 5.88381 18.4494 4.21763 16.7832C2.55144 15.117 1.61538 12.8572 1.61538 10.5008H0C0 13.2856 1.10625 15.9563 3.07538 17.9254C5.04451 19.8946 7.71522 21.0008 10.5 21.0008V19.3854ZM14.9423 18.1976C13.5924 18.9789 12.0597 19.3887 10.5 19.3854V21.0008C12.4115 21.0008 14.2046 20.4893 15.75 19.5954L14.9423 18.1976ZM19.3846 10.5008C19.3879 12.0605 18.9781 13.5932 18.1968 14.9431L19.5946 15.7508C20.5181 14.1555 21.0029 12.3442 21 10.5008H19.3846ZM4.24954 4.18573C5.91106 2.53595 8.15853 1.61271 10.5 1.6162V0.000813715C7.73267 -0.00286855 5.07648 1.08834 3.11231 3.03773L4.24954 4.18573Z"
                                  fill="white"
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

export default AdminDashboard;
