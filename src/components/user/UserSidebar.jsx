import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const UserSidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const offcanvasElement = document.getElementById('menu-sidebar');
    const offcanvasInstance = new window.bootstrap.Offcanvas(offcanvasElement);

    const links = document.querySelectorAll('.menu-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        offcanvasInstance.hide(); // Hide the offcanvas when a link is clicked
      });
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', () => {
          offcanvasInstance.hide();
        });
      });
    };
  }, []);

  const onLogout = () => {
    logout();
    navigate('/user/signin');
  };
  return (
    <div
      className="offcanvas offcanvas-start menu-canvas"
      tabIndex="-1"
      id="menu-sidebar"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <img src="/assets/images/close-icon.svg" alt="Close" />
        </button>
      </div>
      <div className="offcanvas-body">
        <div className="menu-link-list">
          <ul className="menu-link-ul">
            <li>
              <Link to="/user/dashboard" className="menu-link">
                <img src="/assets/images/dashboard.png" alt="icon" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/user/profile" className="menu-link">
                <img src="/assets/images/my-profile.png" alt="icon" /> My
                profile
              </Link>
            </li>
            <li>
              <Link to="/user/draftRequest" className="menu-link">
                <img src="/assets/images/drafts.png" alt="icon" /> Drafts
              </Link>
            </li>
            <li>
              <Link to="/user/referthisapp" className="menu-link">
                <img src="/assets/images/refer-this-app.png" alt="icon" /> Refer
                this app
              </Link>
            </li>
            <li>
              <Link to="/user/support" className="menu-link">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.6874 15C19.5249 15 19.3499 14.975 19.1874 14.925C18.8766 14.82 18.6066 14.6198 18.4159 14.3528C18.2252 14.0858 18.1234 13.7656 18.1249 13.4375V11.2375C16.3749 11.075 14.9999 9.6 14.9999 7.8125V3.4375C14.9999 1.5375 16.5374 0 18.4374 0H26.5625C28.4625 0 30 1.5375 30 3.4375V7.8125C30 9.7125 28.4625 11.25 26.5625 11.25H23.2874L20.9374 14.375C20.6374 14.775 20.1749 15 19.6874 15ZM18.4374 1.875C17.5749 1.875 16.8749 2.575 16.8749 3.4375V7.8125C16.8749 8.675 17.5749 9.375 18.4374 9.375H19.9999V12.5L22.3499 9.375H26.575C27.4375 9.375 28.1375 8.675 28.1375 7.8125V3.4375C28.1375 2.575 27.4375 1.875 26.575 1.875H18.4374ZM9.37483 18.125C7.96687 18.1217 6.61753 17.5609 5.62194 16.5654C4.62636 15.5698 4.06559 14.2204 4.06229 12.8125C4.06559 11.4046 4.62636 10.0552 5.62194 9.05964C6.61753 8.06407 7.96687 7.5033 9.37483 7.5C10.7828 7.5033 12.1321 8.06407 13.1277 9.05964C14.1233 10.0552 14.6841 11.4046 14.6874 12.8125C14.6841 14.2204 14.1233 15.5698 13.1277 16.5654C12.1321 17.5609 10.7828 18.1217 9.37483 18.125ZM9.37483 9.375C7.47482 9.375 5.93731 10.9125 5.93731 12.8125C5.93731 14.7125 7.47482 16.25 9.37483 16.25C11.2748 16.25 12.8124 14.7125 12.8124 12.8125C12.8124 10.9125 11.2748 9.375 9.37483 9.375ZM1.83852 27.4C3.47604 29.125 6.01356 30 9.37608 30C12.7386 30 15.2761 29.125 16.9136 27.4C18.8162 25.3875 18.7549 22.9588 18.7512 22.795V22.7875C18.7512 21.25 17.5011 20 15.9636 20H2.78853C1.25102 20 0.00100728 21.25 0.00100728 22.7375V22.7537C-0.00399276 22.9912 -0.051493 25.4 1.83852 27.4ZM1.87602 22.7875C1.87602 22.2875 2.28853 21.875 2.78853 21.875H15.9636C16.4636 21.875 16.8761 22.2875 16.8761 22.8375V22.84C16.8494 24.0561 16.378 25.2203 15.5511 26.1125C14.2886 27.45 12.1886 28.125 9.37608 28.125C6.56356 28.125 4.50104 27.4625 3.22603 26.1375C2.36697 25.2383 1.88402 24.0448 1.87602 22.8012V22.7875Z"
                    fill="black"
                  />
                </svg>{' '}
                Support{' '}
              </Link>
            </li>
            <li>
              <Link to="/user/PrivacyPolicy" className="menu-link">
                <img src="/assets/images/privacy-policy.png" alt="icon" />{' '}
                Privacy policy
              </Link>
            </li>
            <li>
              <a
                href="#"
                onClick={() => onLogout()}
                className="menu-link justify-content-center logout-menu"
              >
                Logout
              </a>
            </li>
          </ul>

          <div className="sidebar-bottom-div text-center mt-5">
            <img
              src="/assets/images/icon-blue.png"
              alt="icon"
              className="img-fluid mb-2"
            />
            <p>Powered by Idaarah Hasanaat al-Qard al-Hasan al-Burhaniyah</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
