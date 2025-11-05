import React, { useState, useContext } from 'react';
import { loginAPI } from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import LoaderDots from '../../components/common/LoaderDots';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const AdminSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onLoginHandler, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // Redirect to admin if the user is already logged in
  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const userResponse = await loginAPI(values.email, values.password);
      onLoginHandler(userResponse?.data?.token || '', userResponse.data); // Calling login function with token and user data
      setIsLoading(false);
      navigate('/admin/dashboard');
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

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
              {/* Formik form */}
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  // Call the handleLogin function with form values
                  void handleLogin(values);
                  setSubmitting(false); // Stop the submit indicator
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn login-btn mt-3"
                      disabled={isSubmitting || isLoading}
                    >
                      {!isLoading ? (
                        'Login'
                      ) : (
                        <LoaderDots height={50} width={50} />
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
