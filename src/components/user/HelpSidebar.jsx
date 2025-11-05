import React, { useState } from 'react';
import CallIcon from '../svgIcons/CallIcon';
import EmailIcon from '../svgIcons/EmailIcon';
import { createRequestComments } from '../../services/requestCommentService';
import { createUserSupportQuery } from '../../services/userSupportService';

const HelpSidebar = () => {
  const [addedComment, setAddedComments] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    try {
      const params = {
        title: title,
        comment: addedComment,
      };
      await createUserSupportQuery(params);
      setAddedComments('');
      setTitle('');
      var myOffcanvas = document.getElementById('Need_Help_Modal');
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(myOffcanvas);
      bsOffcanvas.hide();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end custom-canvas-div"
      tabIndex="-1"
      id="Need_Help_Modal"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Need Help?</h5>
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
        <div className="comment-list">
          <div className="nh-list-div">
            <div className="nh-list-box">
              <div className="nh-icon">
                <CallIcon />
              </div>
              <div className="nh-text">
                <h5>Call us</h5>
                <p className="text-primary">+91-909-909-0000</p>
              </div>
            </div>
            <div className="nh-list-box">
              <div className="nh-icon">
                <EmailIcon />
              </div>
              <div className="nh-text">
                <h5>Write to us at</h5>
                <p className="text-primary">arazportal@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="nh-btn-div">
            <a href="#" className="btn btn-primary">
              <img
                src="/assets/images/whatsapp.png"
                alt="language"
                className="img-fluid"
              />
              WhatsApp Us
            </a>
          </div>
          <div className="nh-btn-div">
            <h6 id="offcanvasRightLabel">Have a query?</h6>
            <div className="nh-btn-div">
              <label>Title</label>
              <input
                type="text"
                className="form-control form-control2"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="nh-btn-div">
              <label>Comments</label>
              <textarea
                className="form-control nh-btn-div"
                rows="5"
                placeholder="Type here"
                onChange={(e) => setAddedComments(e.target.value)}
              ></textarea>
            </div>
            <div className="next-btn-div text-end nh-btn-div">
              <button
                disabled={!addedComment}
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSidebar;
