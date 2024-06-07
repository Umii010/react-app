import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const data = await response.json();
  
      // Handle successful login
      console.log('User logged in successfully', data);
  
      // Check if session data is included in the response
      if (data.user_id) {
        console.log('Session created');
        console.log('User ID:', data.user_id);
        // Log other session data if needed
      } else {
        console.log('Session not created');
      }
  
      // Navigate to the home/dashboard page after login
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500); // Adjust the path to your home or dashboard page
    } catch (error) {
      console.error('Error logging in:', error.message);
      setLoginError('Invalid email or password');
  
      // Dismiss the error message after 2000 milliseconds
      setTimeout(() => {
        setLoginError('');
      }, 2000);
    }
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
              {loginError && (
                <div className="alert alert-danger" role="alert">
                  {loginError}
                </div>
              )}
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
                      name="email"
                      placeholder="john@example.com"
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
                      name="password"
                      placeholder="Your Chosen Password"
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
