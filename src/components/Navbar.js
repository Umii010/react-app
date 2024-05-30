import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navbar(props) {
const textColor = props.mode === 'dark' ? 'text-light' : 'text-dark';

return (
<div>
<nav className={`navbar navbar-expand-lg navbar bg-dark -${props.mode} bg-${props.mode}`}>
<div className="container-fluid">
<img  src="/logo.png" alt="Logo"width="90"  height="85" className="d-inline-block align-text-top"style={{ marginRight: '15px', borderRadius: '50%',  objectFit: 'cover'   }} />
<a className={`navbar-brand ${textColor}`} href="#">{props.title}</a>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="navbar-nav me-auto mb-2 mb-lg-0">
<li className="nav-item">
<a className="nav-link active text-white" aria-current="page" href="#">Home</a>
</li>
<li className="nav-item ">
<a className={`nav-link ${textColor} text-white`} href="#">{props.about_text}</a>
</li>
<li className="nav-item">
<a className="nav-link active text-white" aria-current="page" href="/login">Login</a>
</li>
<li className="nav-item">
<a className="nav-link active text-white" aria-current="page" href="/signup">Signup</a>
</li>
</ul>
<div className="form-check form-switch">
    <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
    <label className={`form-check-label ${textColor}`} htmlFor="flexSwitchCheckDefault">
        <i className="fas fa-bullseye"></i> Dark Mode
    </label>
</div>

</div>
</div>
</nav>
</div>
);
}

Navbar.propTypes = {
title: PropTypes.string.isRequired,
about_text: PropTypes.string.isRequired,
mode: PropTypes.oneOf(['light', 'dark']).isRequired,
toggleMode: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
title: 'LBA',
about_text: 'About',
};
