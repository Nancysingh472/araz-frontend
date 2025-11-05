import React, { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import OwlCarousel from 'react-owl-carousel';
import StepCompletedIcon from '../../../components/svgIcons/StepCompletedIcon';
import CommentIcon from '../../../components/svgIcons/CommentIcon';
import UserRazaComment from './UserRazaComment';
import { fetchRequestComments } from '../../../services/requestCommentService';

const UserDashboardSlider = ({ arazData }) => {
  const [arazDataObj, setArazDataObj] = useState(null); // Local state for the input field
  const [razCommentList, setRazaCommentList] = useState([]);
  const [rejectReason, setRejectReason] = useState('Araz Rejected');

  useEffect(() => {
    setArazDataObj(arazData);
  }, [arazData]);

  const loadRequestComments = useCallback(async () => {
    try {
      if (!arazDataObj || !arazDataObj?.id) {
        return;
      }
      const result = await fetchRequestComments(arazDataObj.id);
      setRazaCommentList(result.data || []);
      setRejectReason(
        result.data.length > 0 ? result.data[0]?.comment : 'Araz Rejected'
      );
    } catch (err) {
      console.error('Failed to load data', err);
    }
  }, [arazDataObj, arazData]);

  useEffect(() => {
    setRazaCommentList([]);
    void loadRequestComments();
  }, [loadRequestComments]);

  return (
    <>
      <div className="title-div mb-4">
        <h5>Dashboard</h5>
      </div>
      <div className="dash-slider-div mb-4">
        <OwlCarousel
          key={arazDataObj?.id || Math.random()}
          className="owl-theme"
          loop={false}
          margin={20}
          nav={false}
          items={3}
        >
          {arazDataObj ? (
            <div className="item">
              <div className="progress-card pb-5">
                <div className="progress-head">
                  <p>TR-{arazDataObj.id}</p>
                  <p>
                    Created on{' '}
                    {arazDataObj.createdAt
                      ? format(new Date(arazDataObj.createdAt), 'dd MMM yyyy')
                      : ''}
                  </p>
                  <h5>Raza for {arazDataObj.formId?.name}</h5>
                  <button
                    className="btn btn-progress"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#user_comments"
                    aria-controls="offcanvasRight"
                  >
                    <CommentIcon />
                  </button>
                </div>
                <div className="progress-body">
                  {arazDataObj.status === 'pending' && (
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
                  )}
                  {arazDataObj.status === 'completed' && (
                    <ul className="progress-ul">
                      <li className="progress-done">
                        <div className="progress-li-box">
                          <span>
                            <StepCompletedIcon />
                          </span>
                          <p>Araz submitted</p>
                        </div>
                      </li>
                      <li className="progress-done">
                        <div className="progress-li-box">
                          <span>
                            <StepCompletedIcon />
                          </span>
                          <p>Araz Processed</p>
                        </div>
                      </li>
                      <li className="progress-done">
                        <div className="progress-li-box">
                          <span>
                            <StepCompletedIcon />
                          </span>
                          <p>Araz submitted</p>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
                {arazDataObj.status === 'rejected' && (
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
                          <p>{rejectReason}</p>
                          <button className="btn btn-danger">Update</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="item">
              <div className="progress-card pb-5">
                <div className="progress-head">
                  <h5>No requests available</h5>
                </div>
              </div>
            </div>
          )}
        </OwlCarousel>
      </div>
      <UserRazaComment razCommentList={razCommentList} />
    </>
  );
};

export default UserDashboardSlider;
