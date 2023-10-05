import React from "react";
import user from '../images/user.png';


const ContactCard = (props) => {
    const { id, name, email } = props.contact;

    return (
        <div className="item">
            <img className='ui avatar image' src={user} alt="user"></img>
            <div className='content'>
                <div className='header'>{name}</div>
                <div>{email}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <i className='trash alternate outline icon' style={{ color: "red", fontSize: '25px' }} onClick={() => props.clickHandler(id)} ></i>
            </div>
        </div >
    )
}

export default ContactCard