import { useFormik } from 'formik';
import React, { useState } from 'react';
import './Register.css';
import { registerSchema } from '../../Schema/registerSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [nameToggle, setNameToggle] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  const isSubmiting = async (e) => {
    e.preventDefault();
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      await axios.post('/user/register', user);
      navigate('/login');
    } catch (error) {
      setApiError(error.response.data.message);
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    isSubmiting,
  });

  return (
    <div id="register-container">
      <div id="register-wrapper">
        <div id="register-left">
          <span id="register-left-title">
            Welcome to <span>Buzz</span>
          </span>
          <span id="register-left-text">
            Find people around the world and talk with them.
          </span>
        </div>
        <div id="register-right">
          <div id="register-right-wrapper">
            <span id="register-right-title">Register</span>
            <span id="register-right-text">
              Create your account and get started.
            </span>
            <form
              action="submit"
              id="register-form"
              onSubmit={(isSubmitting, handleSubmit)}
            >
              <label
                htmlFor=""
                className="register-label"
                onClick={() => setNameToggle(true)}
              >
                <input
                  type="text"
                  className="register-input"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                />
                <span
                  className="register-input-name"
                  style={{
                    transform: nameToggle
                      ? 'translateY(-140%)'
                      : 'translateY(-50%)',
                    fontSize: nameToggle ? 'x-small' : '1em',
                    color: nameToggle ? 'var(--blue)' : 'white',
                  }}
                >
                  Enter your name
                </span>
              </label>
              <span className="error-message">
                {touched.name && errors.name}
              </span>
              <label
                htmlFor=""
                className="register-label"
                onClick={() => setEmailToggle(true)}
              >
                <input
                  type="email"
                  className="register-input"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                />
                <span
                  className="register-input-name"
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
                className="register-label"
                onClick={() => setPasswordToggle(true)}
              >
                <input
                  type="password"
                  className="register-input"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                />
                <span
                  className="register-input-name"
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

              <label
                htmlFor=""
                className="register-label"
                onClick={() => setConfirmPasswordToggle(true)}
              >
                <input
                  type="password"
                  className="register-input"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmPassword"
                />
                <span
                  className="register-input-name"
                  style={{
                    transform: confirmPasswordToggle
                      ? 'translateY(-140%)'
                      : 'translateY(-50%)',
                    fontSize: confirmPasswordToggle ? 'x-small' : '1em',
                    color: confirmPasswordToggle ? 'var(--blue)' : 'white',
                  }}
                >
                  Confirm your password
                </span>
              </label>
              <span className="error-message">
                {touched.confirmPassword && errors.confirmPassword}
              </span>
              <span className="error-message">{apiError}</span>
              <button
                id="register-button"
                disabled={isSubmitting}
                style={{ color: '#000000' }}
                onClick={isSubmiting}
              >
                Sign up
              </button>
              <span>Already have an account?</span>
              <button
                id="login-button"
                disabled={isSubmitting}
                onClick={() => navigate('/login')}
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
