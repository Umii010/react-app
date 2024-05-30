import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
const [formData, setFormData] = useState({
first_name: '',
last_name: '',
dob: '',
email: '',
password: '',
confirm_password: ''
});
const [registrationSuccess, setRegistrationSuccess] = useState(false);
const navigate = useNavigate();

const handleChange = (e) => {
const { name, value } = e.target;
setFormData({
...formData,
[name]: value
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
const response = await fetch('http://127.0.0.1:8000/api/student', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(formData),
});

if (!response.ok) {
throw new Error('Failed to sign up');
}

// Handle successful signup
console.log('User signed up successfully');
setRegistrationSuccess(true);

// Navigate to login page after 600ms
setTimeout(() => {
navigate('/login');
}, 2500);
} catch (error) {
console.error('Error signing up:', error.message);
}
};

return (
<div className="container mt-5">
<div className="row justify-content-center">
<div className="col-md-6">
<div className="card">
<div className="card-header text-center">
<h3>Welcome to LBA <i className="fa-solid fa-hands-clapping"></i></h3>
<span><i className="fas fa-bell"></i> Start your Adventure here! <i className="fas fa-compass"></i></span>
</div>
<div className="card-body">
{registrationSuccess && (
<div className="alert alert-success" role="alert">
Registration successful! Redirecting to login page...
</div>
)}
<form onSubmit={handleSubmit}>
<div className="form-group">
<label htmlFor="first_name">First Name</label>
<div className="input-group">
<div className="input-group-prepend">
<span className="input-group-text">
<i className="fa-regular fa-user"></i>
</span>
</div>
<input
type="text"
className="form-control"
id="first_name"
name="first_name"
placeholder="Enter your first name"
value={formData.first_name}
onChange={handleChange}
required
/>
</div>
</div>

<div className="form-group">
<label htmlFor="last_name">Last Name</label>
<div className="input-group">
<div className="input-group-prepend">
<span className="input-group-text">
<i className="fa-regular fa-user"></i>
</span>
</div>
<input
type="text"
className="form-control"
id="last_name"
name="last_name"
placeholder="Enter your last name"
value={formData.last_name}
onChange={handleChange}
required
/>
</div>
</div>

<div className="form-group">
<label htmlFor="dob">Date of Birth</label>
<div className="input-group">
<div className="input-group-prepend">
<span className="input-group-text">
<i className="fa-regular fa-calendar"></i>
</span>
</div>
<input
type="date"
className="form-control"
id="dob"
name="dob"
value={formData.dob}
onChange={handleChange}
required
/>
</div>
</div>

<div className="form-group">
<label htmlFor="email">Email</label>
<div className="input-group">
<div className="input-group-prepend">
<span className="input-group-text">
<i className="fa-regular fa-envelope"></i>
</span>
</div>
<input
type="email"
className="form-control"
id="email"
name="email"
placeholder="Enter your email address"
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
<i className="fa-solid fa-key"></i>
</span>
</div>
<input
type="password"
className="form-control"
id="password"
name="password"
placeholder="Enter your password"
value={formData.password}
onChange={handleChange}
required
/>
</div>
</div>

<div className="form-group">
<label htmlFor="confirm_password">Confirm Password</label>
<div className="input-group">
<div className="input-group-prepend">
<span className="input-group-text">
<i className="fa-solid fa-key"></i>
</span>
</div>
<input
type="password"
className="form-control"
id="confirm_password"
name="confirm_password"
placeholder="Confirm your password"
value={formData.confirm_password}
onChange={handleChange}
required
/>
</div>
</div>

<div className="text-center">
<button type="submit" className="btn btn-dark btn-block my-4">
Get Started <i className="fas fa-arrow-right"></i>
</button>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
);
};

export default SignupForm;
