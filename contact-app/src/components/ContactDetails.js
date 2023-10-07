import React from "react";
import user from '../images/user.png';
import { Link, useLocation } from "react-router-dom";


export const ContactDetails = (props) => {
    let { state } = useLocation();
    console.log(state);
    return (
        <div className="main">
            <div className="ui card centered" style={{ marginTop: '80px' }}>
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{state.contact.name}</div>
                    <div className="description">{state.contact.email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to={'/'}>
                    <button className="ui button blue">👈Back</button>
                </Link>
            </div>
        </div>
    )
}


export default ContactDetails;
