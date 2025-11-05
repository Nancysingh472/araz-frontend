import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import ArazForm from '../araz/ArazForm';
import RightArrowIcon from '../svgIcons/RightArrowIcon';
import RoundedCloseIcon from '../svgIcons/RoundedCloseIcon';
import CallIcon from '../svgIcons/CallIcon';
import EmailIcon from '../svgIcons/EmailIcon';
import { ARAZ_LANGUAGES } from '../../utils/constant';
import NotificationsSection from './NotificationsSection';

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    // Close the modal programmatically
    const modal = document.getElementById('Language_modal');
    const bootstrapModal = window.bootstrap.Modal.getInstance(modal); // Get Bootstrap modal instance
    if (bootstrapModal) {
      bootstrapModal.hide(); // Hide the modal
    }
  };

  return (
    <header className="user-header">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-4 col-sm-3">
            <div className="header-left-div d-flex align-items-center gap-2 gap-sm-2 gap-md-4">
              <div className="logo-div">
                <img
                  src="/assets/images/logo.png"
                  className="logo img-fluid"
                  alt="logo"
                  width="60"
                />
              </div>
              {isLoggedIn && (
                <div className="header-menu-btn">
                  <button
                    className="btn"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menu-sidebar"
                    aria-controls="menu-sidebar"
                  >
                    <img
                      src="/assets/images/menu-icon.svg"
                      alt="menu"
                      className="img-fluid"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-8 col-sm-9">
            <div className="header-left-div d-flex align-items-center justify-content-end gap-2 gap-sm-2 gap-md-4">
              <div className="need-help-div position-relative">
                <button
                  className="btn btn-help"
                  data-bs-toggle="modal"
                  data-bs-target="#Need_Help_Modal"
                >
                  {t('needHelp')} ?{/*Need Help*/}
                </button>

                <div
                  className="modal fade help-modal header-modal"
                  id="Need_Help_Modal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="help-box">
                        <div className="ntf-head">
                          <h5>Need help?</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <RoundedCloseIcon />
                          </button>
                        </div>
                        <div className="ntf-body">
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
                                <p className="text-primary">
                                  arazportal@gmail.com
                                </p>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="language-div position-relative">
                <button
                  className="btn btn-language"
                  data-bs-toggle="modal"
                  data-bs-target="#Language_modal"
                >
                  <img
                    src="/assets/images/language-icon.svg"
                    alt="language"
                    className="img-fluid"
                  />
                </button>

                <div
                  className="modal fade help-modal header-modal"
                  id="Language_modal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="help-box">
                        <div className="ntf-head">
                          <h5>Select language</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <RoundedCloseIcon />
                          </button>
                        </div>
                        <div className="ntf-body">
                          <div className="language-list">
                            {ARAZ_LANGUAGES.map((lang) => (
                              <button
                                key={lang.value}
                                className="btn btn-secondary"
                                onClick={() => changeLanguage(lang.value)}
                              >
                                {lang.label}
                              </button>
                            ))}
                          </div>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isLoggedIn && <NotificationsSection />}
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
      <ArazForm />
    </header>
  );
};

export default Header;
