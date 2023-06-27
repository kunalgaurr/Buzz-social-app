import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import './Login.css';
import { loginSchema } from '../../Schema/loginSchema';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authReducer';

export const Login = () => {
  const loading = useSelector((state) => state.auth.loading);
  const [emailToggle, setEmailToggle] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [apiError, setApiError] = useState(null);
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(email.current.value, password.current.value));
    } catch (error) {
      setApiError(error.response.data.message);
    }
  };

  if (loading) {
    navigate('/');
  }

  return (
    <div id="login-container">
      <div id="login-wrapper">
        <div id="login-left">
          <span id="login-left-title">
            Welcome to <span>Buzz</span>
          </span>
          <span id="login-left-text">
            Find people around the world and talk with them.
          </span>
        </div>
        <div id="login-right">
          <div id="login-right-wrapper">
            <span id="login-right-title">Login</span>
            <span id="login-right-text">Log into your buzz account.</span>
            <form action="submit" id="login-form" onSubmit={handleSubmit}>
              <label
                htmlFor=""
                className="login-label"
                onClick={() => setEmailToggle(true)}
              >
                <input
                  type="text"
                  className="login-input"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  ref={email}
                />
                <span
                  className="login-input-name"
                  style={{
                    transform: emailToggle
                      ? 'translateY(-140%)'
                      : 'translateY(-50%)',
                    fontSize: emailToggle ? 'x-small' : '1em',
                    color: emailToggle ? 'var(--blue)' : 'white',
                  }}
                >
                  Enter your email
                </span>
              </label>
              <span className="error-message">
                {touched.email && errors.email}
              </span>
              <label
                htmlFor=""
                className="login-label"
                onClick={() => setPasswordToggle(true)}
              >
                <input
                  type="password"
                  className="login-input"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  ref={password}
                />
                <span
                  className="login-input-name"
                  style={{
                    transform: passwordToggle
                      ? 'translateY(-140%)'
                      : 'translateY(-50%)',
                    fontSize: passwordToggle ? 'x-small' : '1em',
                    color: passwordToggle ? 'var(--blue)' : 'white',
                  }}
                >
                  Enter your password
                </span>
              </label>
              <span className="error-message">
                {touched.password && errors.password}
              </span>
              <span className="error-message">{apiError}</span>
              <button id="login-button">Log in</button>
              <span id="login-forgot-password" type="submit">
                Forgot password?
              </span>
              <span>New here? Create an account</span>
              <button
                id="register-button"
                onClick={() => navigate('/register')}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
