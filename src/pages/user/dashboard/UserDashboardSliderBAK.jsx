import React, { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';

import OwlCarousel from 'react-owl-carousel';
import StepCompletedIcon from '../../../components/svgIcons/StepCompletedIcon';
import RightArrowCircleIcon from '../../../components/svgIcons/RightArrowCircleIcon';

const UserDashboardSliderBAK = ({ arazData }) => {
  if (!arazData) {
    return;
  }

  return (
    <>
      <div className="title-div mb-4">
        <h5>Dashboard</h5>
      </div>
      <div className="dash-slider-div mb-4">
        <OwlCarousel
          className="owl-theme"
          loop={false}
          margin={20}
          nav={false}
          items={3} // Number of items to show
        >
          <div className="item">
            <div className="progress-card pb-5">
              <div className="progress-head">
                <p>TR-{arazData?.id}</p>
                <p>
                  Created on{' '}
                  {arazData?.createdAt
                    ? format(new Date(arazData?.createdAt), 'dd MMM yyyy')
                    : ''}
                </p>
                <h5>Raza for {arazData?.formId?.name}</h5>
                <button
                  className="btn btn-progress"
                  data-bs-toggle="modal"
                  data-bs-target="#Verification_Modal"
                >
                  <RightArrowCircleIcon />
                </button>
              </div>
              <div className="progress-body">
                <ul className="progress-ul">
                  <li className="progress-done">
                    <div className="progress-li-box">
                      <span>
                        <StepCompletedIcon />
                      </span>
                      <p>Araz submitted</p>
                    </div>
                  </li>
                  <li className="progress-process">
                    <div className="progress-li-box">
                      <span>
                        <label>1</label>
                        <img
                          src="/assets/images/progress-icon.svg"
                          alt="img"
                          className="img-fluid progress-icon"
                        />
                      </span>
                      <p>Araz in process</p>
                    </div>
                  </li>
                  <li className="progress-pending">
                    <div className="progress-li-box">
                      <span>
                        <StepCompletedIcon />
                      </span>
                      <p>Request pending</p>
                    </div>
                  </li>
                </ul>
              </div>
              {arazData?.status === 'rejected' && (
                <div className="progress-footer">
                  <div className="alert-box">
                    <div className="alert-head">
                      <div>
                        <img
                          src="/assets/images/info-icon.svg"
                          alt="img"
                          className="img-fluid"
                        />
                      </div>
                      <div>
                        <p>
                          You have chosen the wrong business type, please edit
                          your form and select the right type of business and
                          submit again.
                        </p>
                        <button className="btn btn-danger">Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/*<div className="item">*/}
          {/*    <div className="progress-card">*/}
          {/*        <div className="progress-head">*/}
          {/*            <p>TR-10234</p>*/}
          {/*            <p>Due on 23 February 2024</p>*/}
          {/*            <h5>Raza for business name</h5>*/}
          {/*            <button*/}
          {/*                className="btn btn-primary btn-progress"*/}
          {/*                data-bs-toggle="modal"*/}
          {/*                data-bs-target="#Download_Jawab_Modal"*/}
          {/*            >*/}
          {/*                <svg*/}
          {/*                    width="24"*/}
          {/*                    height="18"*/}
          {/*                    viewBox="0 0 24 18"*/}
          {/*                    fill="none"*/}
          {/*                    xmlns="http://www.w3.org/2000/svg"*/}
          {/*                >*/}
          {/*                    <path*/}
          {/*                        d="M22.1046 8.99997L14.5256 1.42102L22.1046 8.99997ZM22.1046 8.99997L14.5256 16.5789L22.1046 8.99997ZM22.1046 8.99997H8.84141H22.1046ZM1.89404 8.99997H5.05194H1.89404Z"*/}
          {/*                        fill="#909090"*/}
          {/*                    />*/}
          {/*                    <path*/}
          {/*                        d="M22.1046 8.99997L14.5256 1.42102M22.1046 8.99997L14.5256 16.5789M22.1046 8.99997H8.84141M1.89404 8.99997H5.05194"*/}
          {/*                        stroke="white"*/}
          {/*                        stroke-width="2"*/}
          {/*                        stroke-linecap="round"*/}
          {/*                        stroke-linejoin="round"*/}
          {/*                    />*/}
          {/*                </svg>*/}
          {/*            </button>*/}
          {/*        </div>*/}
          {/*        <div className="progress-body">*/}
          {/*            <ul className="progress-ul">*/}
          {/*                <li className="progress-done">*/}
          {/*                    <div className="progress-li-box">*/}
          {/*        <span>*/}
          {/*          <svg*/}
          {/*              width="28"*/}
          {/*              height="19"*/}
          {/*              viewBox="0 0 28 19"*/}
          {/*              fill="none"*/}
          {/*              xmlns="http://www.w3.org/2000/svg"*/}
          {/*          >*/}
          {/*            <path*/}
          {/*                d="M10.4214 18.7747C9.89156 18.7747 9.38821 18.5678 9.01732 18.2057L1.52005 10.8873C0.75178 10.1374 0.75178 8.8961 1.52005 8.14616C2.28832 7.39622 3.55994 7.39622 4.32822 8.14616L10.4214 14.094L24.0384 0.801898C24.8066 0.0519554 26.0782 0.0519554 26.8465 0.801898C27.6148 1.55184 27.6148 2.79312 26.8465 3.54306L11.8255 18.2057C11.4546 18.5678 10.9512 18.7747 10.4214 18.7747Z"*/}
          {/*                fill="#B9B9B9"*/}
          {/*            />*/}
          {/*          </svg>*/}
          {/*        </span>*/}
          {/*                        <p>Araz submitted</p>*/}
          {/*                    </div>*/}
          {/*                </li>*/}
          {/*                <li className="progress-done">*/}
          {/*                    <div className="progress-li-box">*/}
          {/*        <span>*/}
          {/*          <svg*/}
          {/*              width="28"*/}
          {/*              height="19"*/}
          {/*              viewBox="0 0 28 19"*/}
          {/*              fill="none"*/}
          {/*              xmlns="http://www.w3.org/2000/svg"*/}
          {/*          >*/}
          {/*            <path*/}
          {/*                d="M10.4214 18.7747C9.89156 18.7747 9.38821 18.5678 9.01732 18.2057L1.52005 10.8873C0.75178 10.1374 0.75178 8.8961 1.52005 8.14616C2.28832 7.39622 3.55994 7.39622 4.32822 8.14616L10.4214 14.094L24.0384 0.801898C24.8066 0.0519554 26.0782 0.0519554 26.8465 0.801898C27.6148 1.55184 27.6148 2.79312 26.8465 3.54306L11.8255 18.2057C11.4546 18.5678 10.9512 18.7747 10.4214 18.7747Z"*/}
          {/*                fill="#B9B9B9"*/}
          {/*            />*/}
          {/*          </svg>*/}
          {/*        </span>*/}
          {/*                        <p>Araz in process</p>*/}
          {/*                    </div>*/}
          {/*                </li>*/}
          {/*                <li className="progress-done">*/}
          {/*                    <div className="progress-li-box">*/}
          {/*        <span>*/}
          {/*          <svg*/}
          {/*              width="28"*/}
          {/*              height="19"*/}
          {/*              viewBox="0 0 28 19"*/}
          {/*              fill="none"*/}
          {/*              xmlns="http://www.w3.org/2000/svg"*/}
          {/*          >*/}
          {/*            <path*/}
          {/*                d="M10.4214 18.7747C9.89156 18.7747 9.38821 18.5678 9.01732 18.2057L1.52005 10.8873C0.75178 10.1374 0.75178 8.8961 1.52005 8.14616C2.28832 7.39622 3.55994 7.39622 4.32822 8.14616L10.4214 14.094L24.0384 0.801898C24.8066 0.0519554 26.0782 0.0519554 26.8465 0.801898C27.6148 1.55184 27.6148 2.79312 26.8465 3.54306L11.8255 18.2057C11.4546 18.5678 10.9512 18.7747 10.4214 18.7747Z"*/}
          {/*                fill="#B9B9B9"*/}
          {/*            />*/}
          {/*          </svg>*/}
          {/*        </span>*/}
          {/*                        <p>Request pending</p>*/}
          {/*                    </div>*/}
          {/*                </li>*/}
          {/*            </ul>*/}
          {/*        </div>*/}
          {/*        <div className="progress-footer">*/}
          {/*            <div className="alert-box">*/}
          {/*                <div className="alert-head">*/}
          {/*                    <div>*/}
          {/*                        <img*/}
          {/*                            src="/assets/images/check-circle.svg"*/}
          {/*                            alt="img"*/}
          {/*                            className="img-fluid"*/}
          {/*                        />*/}
          {/*                    </div>*/}
          {/*                    <div>*/}
          {/*                        <p>You have received your jawab!</p>*/}
          {/*                        <button className="btn btn-primary">*/}
          {/*                            Download jawab*/}
          {/*                        </button>*/}
          {/*                    </div>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}
          {/*<div className="item">*/}
          {/*    <div className="progress-card">*/}
          {/*        <div className="progress-head">*/}
          {/*            <p>TR-10234</p>*/}
          {/*            <p>Due on 23 February 2024</p>*/}
          {/*            <h5>Raza for business name</h5>*/}
          {/*            <button*/}
          {/*                className="btn btn-progress"*/}
          {/*                data-bs-toggle="modal"*/}
          {/*                data-bs-target="#Verification_Modal"*/}
          {/*            >*/}
          {/*                <svg*/}
          {/*                    width="24"*/}
          {/*                    height="18"*/}
          {/*                    viewBox="0 0 24 18"*/}
          {/*                    fill="none"*/}
          {/*                    xmlns="http://www.w3.org/2000/svg"*/}
          {/*                >*/}
          {/*                    <path*/}
          {/*                        d="M22.1046 8.99997L14.5256 1.42102L22.1046 8.99997ZM22.1046 8.99997L14.5256 16.5789L22.1046 8.99997ZM22.1046 8.99997H8.84141H22.1046ZM1.89404 8.99997H5.05194H1.89404Z"*/}
          {/*                        fill="#909090"*/}
          {/*                    />*/}
          {/*                    <path*/}
          {/*                        d="M22.1046 8.99997L14.5256 1.42102M22.1046 8.99997L14.5256 16.5789M22.1046 8.99997H8.84141M1.89404 8.99997H5.05194"*/}
          {/*                        stroke="white"*/}
          {/*                        stroke-width="2"*/}
          {/*                        stroke-linecap="round"*/}
          {/*                        stroke-linejoin="round"*/}
          {/*                    />*/}
          {/*                </svg>*/}
          {/*            </button>*/}
          {/*        </div>*/}
          {/*        <div className="progress-body">*/}
          {/*            <ul className="progress-ul">*/}
          {/*                <li className="progress-done">*/}
          {/*                    <div className="progress-li-box">*/}
          {/*        <span>*/}
          {/*          <svg*/}
          {/*              width="28"*/}
          {/*              height="19"*/}
          {/*              viewBox="0 0 28 19"*/}
          {/*              fill="none"*/}
          {/*              xmlns="http://www.w3.org/2000/svg"*/}
          {/*          >*/}
          {/*            <path*/}
          {/*                d="M10.4214 18.7747C9.89156 18.7747 9.38821 18.5678 9.01732 18.2057L1.52005 10.8873C0.75178 10.1374 0.75178 8.8961 1.52005 8.14616C2.28832 7.39622 3.55994 7.39622 4.32822 8.14616L10.4214 14.094L24.0384 0.801898C24.8066 0.0519554 26.0782 0.0519554 26.8465 0.801898C27.6148 1.55184 27.6148 2.79312 26.8465 3.54306L11.8255 18.2057C11.4546 18.5678 10.9512 18.7747 10.4214 18.7747Z"*/}
          {/*                fill="#B9B9B9"*/}
          {/*            />*/}
          {/*          </svg>*/}
          {/*        </span>*/}
          {/*                        <p>Araz submitted</p>*/}
          {/*                    </div>*/}
          {/*                </li>*/}
          {/*                <li className="progress-process">*/}
          {/*                    <div className="progress-li-box">*/}
          {/*        <span>*/}
          {/*          <label>1</label>*/}
          {/*          <img*/}
          {/*              src="/assets/images/progress-icon.svg"*/}
          {/*              alt="img"*/}
          {/*              className="img-fluid progress-icon"*/}
          {/*          />*/}
          {/*        </span>*/}
          {/*                        <p>Araz in process</p>*/}
          {/*                    </div>*/}
          {/*                </li>*/}
          {/*                <li className="progress-pending">*/}
          {/*                    <div className="progress-li-box">*/}
          {/*        <span>*/}
          {/*          <svg*/}
          {/*              width="28"*/}
          {/*              height="19"*/}
          {/*              viewBox="0 0 28 19"*/}
          {/*              fill="none"*/}
          {/*              xmlns="http://www.w3.org/2000/svg"*/}
          {/*          >*/}
          {/*            <path*/}
          {/*                d="M10.4214 18.7747C9.89156 18.7747 9.38821 18.5678 9.01732 18.2057L1.52005 10.8873C0.75178 10.1374 0.75178 8.8961 1.52005 8.14616C2.28832 7.39622 3.55994 7.39622 4.32822 8.14616L10.4214 14.094L24.0384 0.801898C24.8066 0.0519554 26.0782 0.0519554 26.8465 0.801898C27.6148 1.55184 27.6148 2.79312 26.8465 3.54306L11.8255 18.2057C11.4546 18.5678 10.9512 18.7747 10.4214 18.7747Z"*/}
          {/*                fill="#B9B9B9"*/}
          {/*            />*/}
          {/*          </svg>*/}
          {/*        </span>*/}
          {/*                        <p>Request pending</p>*/}
          {/*                    </div>*/}
          {/*                </li>*/}
          {/*            </ul>*/}
          {/*        </div>*/}
          {/*        <div className="progress-footer">*/}
          {/*            <div className="alert-box">*/}
          {/*                <div className="alert-head">*/}
          {/*                    <div>*/}
          {/*                        <img*/}
          {/*                            src="/assets/images/info-icon.svg"*/}
          {/*                            alt="img"*/}
          {/*                            className="img-fluid"*/}
          {/*                        />*/}
          {/*                    </div>*/}
          {/*                    <div>*/}
          {/*                        <p>*/}
          {/*                            You have chosen the wrong business type, please edit*/}
          {/*                            your form and select the right type of business and*/}
          {/*                            submit again.*/}
          {/*                        </p>*/}
          {/*                        <button className="btn btn-danger">Update</button>*/}
          {/*                    </div>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}
          {/*<div className="item">*/}
          {/*    <div className="progress-card">*/}
          {/*        <div className="progress-head">*/}
          {/*            <p>TR-10234</p>*/}
          {/*            <p>Due on 23 February 2024</p>*/}
          {/*            <h5>Raza for business name</h5>*/}
          {/*            <button*/}
          {/*                className="btn btn-progress"*/}
          {/*                data-bs-toggle="modal"*/}
          {/*                data-bs-target="#Verification_Modal"*/}
          {/*            >*/}
          {/*                <svg*/}
          {/*                    width="24"*/}
          {/*                    height="18"*/}
          {/*                    viewBox="0 0 24 18"*/}
          {/*                    fill="none"*/}
          {/*                    xmlns="http://www.w3.org/2000/svg"*/}
          {/*                >*/}
          {/*                    <path*/}
          {/*                        d="M22.1046 8.99997L14.5256 1.42102L22.1046 8.99997ZM22.1046 8.99997L14.5256 16.5789L22.1046 8.99997ZM22.1046 8.99997H8.84141H22.1046ZM1.89404 8.99997H5.05194H1.89404Z"*/}
          {/*                        fill="#909090"*/}
          {/*                    />*/}
          {/*                    <path*/}
          {/*                        d="M22.1046 8.99997L14.5256 1.42102M22.1046 8.99997L14.5256 16.5789M22.1046 8.99997H8.84141M1.89404 8.99997H5.05194"*/}
          {/*                        stroke="white"*/}
          {/*                        stroke-width="2"*/}
          {/*                        stroke-linecap="round"*/}
          {/*                        stroke-linejoin="round"*/}
          {/*                    />*/}
          {/*                </svg>*/}
          {/*            </button>*/}
          {/*        </div>*/}
          {/*        <div className="progress-body">*/}
          {/*            <ul className="progress-ul">*/}
          {/*                <li className="progress-done">*/}
          {/*                    <div className="progress-li-box">*/}
          {/*        <span>*/}
          {/*          <svg*/}
          {/*              width="28"*/}
          {/*              height="19"*/}
          {/*              viewBox="0 0 28 19"*/}
          {/*              fill="none"*/}
          {/*              xmlns="http://www.w3.org/2000/svg"*/}
          {/*          >*/}
          {/*            <path*/}
          {/*                d="M10.4214 18.7747C9.89156 18.7747 9.38821 18.5678 9.01732 18.2057L1.52005 10.8873C0.75178 10.1374 0.75178 8.8961 1.52005 8.14616C2.28832 7.39622 3.55994 7.39622 4.32822 8.14616L10.4214 14.094L24.0384 0.801898C24.8066 0.0519554 26.0782 0.0519554 26.8465 0.801898C27.6148 1.55184 27.6148 2.79312 26.8465 3.54306L11.8255 18.2057C11.4546 18.5678 10.9512 18.7747 10.4214 18.7747Z"*/}
          {/*                fill="#B9B9B9"*/}
          {/*            />*/}
          {/*          </svg>*/}
          {/*        </span>*/}
          {/*                        <p>Araz submitted</p>*/}
          {/*                    </div>*/}
          {/*                </li>*/}
          {/*                <li className="progress-process">*/}
          {/*                    <div className="progress-li-box">*/}
          {/*        <span>*/}
          {/*          <label>1</label>*/}
          {/*          <img*/}
          {/*              src="/assets/images/progress-icon.svg"*/}
          {/*              alt="img"*/}
          {/*              className="img-fluid progress-icon"*/}
          {/*          />*/}
          {/*        </span>*/}
          {/*                        <p>Araz in process</p>*/}
          {/*                    </div>*/}
          {/*                </li>*/}
          {/*                <li className="progress-pending">*/}
          {/*                    <div className="progress-li-box">*/}
          {/*        <span>*/}
          {/*          <svg*/}
          {/*              width="28"*/}
          {/*              height="19"*/}
          {/*              viewBox="0 0 28 19"*/}
          {/*              fill="none"*/}
          {/*              xmlns="http://www.w3.org/2000/svg"*/}
          {/*          >*/}
          {/*            <path*/}
          {/*                d="M10.4214 18.7747C9.89156 18.7747 9.38821 18.5678 9.01732 18.2057L1.52005 10.8873C0.75178 10.1374 0.75178 8.8961 1.52005 8.14616C2.28832 7.39622 3.55994 7.39622 4.32822 8.14616L10.4214 14.094L24.0384 0.801898C24.8066 0.0519554 26.0782 0.0519554 26.8465 0.801898C27.6148 1.55184 27.6148 2.79312 26.8465 3.54306L11.8255 18.2057C11.4546 18.5678 10.9512 18.7747 10.4214 18.7747Z"*/}
          {/*                fill="#B9B9B9"*/}
          {/*            />*/}
          {/*          </svg>*/}
          {/*        </span>*/}
          {/*                        <p>Request pending</p>*/}
          {/*                    </div>*/}
          {/*                </li>*/}
          {/*            </ul>*/}
          {/*        </div>*/}
          {/*        <div className="progress-footer">*/}
          {/*            <div className="alert-box">*/}
          {/*                <div className="alert-head">*/}
          {/*                    <div>*/}
          {/*                        <img*/}
          {/*                            src="/assets/images/info-icon.svg"*/}
          {/*                            alt="img"*/}
          {/*                            className="img-fluid"*/}
          {/*                        />*/}
          {/*                    </div>*/}
          {/*                    <div>*/}
          {/*                        <p>*/}
          {/*                            You have chosen the wrong business type, please edit*/}
          {/*                            your form and select the right type of business and*/}
          {/*                            submit again.*/}
          {/*                        </p>*/}
          {/*                        <button className="btn btn-danger">Update</button>*/}
          {/*                    </div>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </OwlCarousel>
      </div>
    </>
  );
};

export default UserDashboardSliderBAK;
