import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import "./Header.css"

const Header = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/") {
            setActiveTab("Home");
            } else if(location.pathname === "/about") {
            setActiveTab("About");
            } else if(location.pathname === "/signup") {
            setActiveTab("SignUp");
            } else if(location.pathname === "/signin") {
            setActiveTab("SignIn");
            } else if(location.pathname === "/student") {
            setActiveTab("DropDown");
            } else if(location.pathname === "/addedit") {
            setActiveTab("AddEdit");
            }
            
    }, [location]);
  return (
    <div className='header'>
        <p className='logo'>Rewards App</p>
        <div className='header-right'>
            <Link to="/">
                <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>
                    Home
                </p>
            </Link>
            <Link to="/about">
                <p className={`${activeTab === "About" ? "active" : ""}`} onClick={() => setActiveTab("About")}>
                    About
                </p>
            </Link>
            <Link to="/signup">
                <p className={`${activeTab === "SignUp" ? "active" : ""}`} onClick={() => setActiveTab("SignUp")}>
                    Signup
                </p>
            </Link>
            <Link to="/signin">
                <p className={`${activeTab === "SignIn" ? "active" : ""}`} onClick={() => setActiveTab("SignIn")}>
                    SignIn
                </p>
            </Link>
            <Link to="/student">
                <p className={`${activeTab === "DropDown" ? "active" : ""}`} onClick={() => setActiveTab("DropDown")}>
                    Accordion
                </p>
            </Link>
            <Link to="/addedit">
                <p className={`${activeTab === "AddEdit" ? "active" : ""}`} onClick={() => setActiveTab("AddEdit")}>
                    Edit
                </p>
            </Link>
        </div>
    </div>
  )
}

export default Header