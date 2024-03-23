import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * ProfilePopup component for displaying user profile information.
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.userData - User data for the profile
 * @param {Function} props.onClose - Function to close the popup
 */


function ProfilePopup({ userData, onClose }) {
    const handleClick = (e) => {
        // Prevent event propagation to the parent div
        e.stopPropagation();
    };

    // Add a fixed offset for the top position
    const popupStyle = {
        top: 'calc(100% + 0.5px)', // Adjust the offset as needed
    };

    return (
        <div className="profile-popup" style={popupStyle} onClick={handleClick}>
            <h4>Profile</h4>
            <p>Name: {userData.full_name}</p>
            <p>Email: {userData.email}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}


/**
 * Header component for the navigation bar.
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isLogged - Flag indicating whether the user is logged in
 * @param {Object} props.userData - User data for the profile
 */
function Header(props) {
    const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
    const profilePicRef = useRef();

    /**
     * Toggle the profile popup.
     */
    const toggleProfilePopup = () => {
        setProfilePopupOpen((prev) => !prev);
    };

    /**
     * Close the profile popup.
     */
    const closeProfilePopup = () => {
        setProfilePopupOpen(false);
    };
    
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <img style={{width:'40px',height:'40px'}} src='./images/logo_irctc.png' />
                    &nbsp; &nbsp;
                    <a className="navbar-brand" href="#" style={{marginTop:'2px'}}>
                        <h3>Indian Railways</h3>
                    </a>

                    {/* Navbar links */}
                    <div className="collapse navbar-collapse ms-auto" id="navbarNavAltMarkup">
                        <nav className="navbar-nav ms-auto">
                            {/* Navigation Links */}
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                            <NavLink to="/about" className="nav-link">
                                About
                            </NavLink>
                            <NavLink to="/contactus" className="nav-link">
                                Contact Us 
                            </NavLink>
                            <NavLink to="/resume" className="nav-link">
                                Resume
                            </NavLink>

                            {/* Profile picture */}
                            {props.isLogged ? (
                                <div className="profile-pic-container" onClick={toggleProfilePopup} ref={profilePicRef}>
                                    <img
                                        className="profile-pic"
                                        src={props.userData.gender === 'Male' ? 'man.png' : 'human.png'}
                                        alt="profile"
                                    />
                                    {/* Profile popup */}
                                    {isProfilePopupOpen && (
                                        <div style={{ top: profilePicRef.current.clientHeight }} onClick={closeProfilePopup}>
                                            <ProfilePopup userData={props.userData} onClose={closeProfilePopup} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <NavLink to="/login">
                                    <button type="button" className="login-button">
                                        Login{' '}
                                        {/* <img
                                            src="login_icon.svg"
                                            alt="Icon"
                                            width="13"
                                            height="14"
                                            loading="lazy"
                                        /> */}
                                    </button>
                                </NavLink>
                            )}
                        </nav>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
