import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginAPI } from '../../services/authService';
import LoaderDots from '../../components/common/LoaderDots';

const UserSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onLoginHandler, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // Redirect to admin if the user is already logged in
  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userResponse = await loginAPI('user@araz.com', 'Admin@123');
      onLoginHandler(userResponse?.data?.token || '', userResponse.data); // Calling login function with token and user data
      setIsLoading(false);
      navigate('/admin/dashboard');
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };
  return (
    <div className="signin-page-content h-100">
      <div className="container py-5 h-100">
        <div className="row g-3 align-items-center h-100">
          <div className="col-md-6">
            <div className="welcome-head text-center text-sm-center text-md-start d-flex flex-wrap gap-2 gap-sm-2 gap-md-5 align-items-center">
              <div className="wl-logo m-auto m-sm-auto m-md-0">
                <img
                  src="/assets/images/welcome-img.png"
                  alt="img"
                  className="img-fluid"
                  width="120"
                />
              </div>
              <div className="wl-content">
                <h1 className="mb-3">Welcome to Vepaar Hawaij</h1>
                <p>
                  This module is crafted to facilitate mumineen in seeking
                  blessings from Huzurala TUS before embarking on new business
                  ventures or forging partnerships.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="sign-in-link-div">
              <button onClick={handleLogin} className="sign-in-btn">
                {!isLoading ? (
                  <>
                    <img src="/assets/images/login-icon.png" alt="icon" />
                    Sign in with www.its52.com
                  </>
                ) : (
                  <LoaderDots height={50} width={50} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;
