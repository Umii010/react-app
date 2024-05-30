import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>
                Welcome to LBA Login <i className="fas fa-hands-clapping"></i>
              </h3>
              <span><i className="fa-solid fa-circle-nodes"></i> Enter your credentials and start enjoying <i className="fas fa-splotch"></i></span>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email" placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password" placeholder="Your Choosen Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>

              

                <div className="form-group">
                <Link to="/signup">Create Account</Link>  | 
                  <a href="/forgot-password"> Forgot Password</a>
                </div>

                <div className="form-group text-center">
                  <button type="submit" className="btn btn-dark btn-block my-4">
                    Login <i className="fas fa-arrow-right"></i>
                  </button>
                </div>

                <div className="text-center">
                  <p>Or login with:</p>
                  <div>
                    <button className="btn btn-primary mx-2">
                      <i className="fab fa-google"></i> Google
                    </button>
                    <button className="btn btn-dark mx-2">
                      <i className="fab fa-github"></i> GitHub
                    </button>
                    <button className="btn btn-info">
                      <i className="fab fa-linkedin"></i> LinkedIn
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
