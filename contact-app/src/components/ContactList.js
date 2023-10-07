import React from 'react';
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';


const ContactList = (props) => {

    const deleteConatactHandler = (id) => {
        props.getContactId(id);
    }

    const renderContact = props.contacts.map((contact) => {
        return (
            <ContactCard key={contact.id} contact={contact} clickHandler={deleteConatactHandler} />
        )
    })


    return <>
        <div className="main" style={{ marginTop: "50px" }}>
            <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>
                Contact List
                <Link to={"/add"}>
                    <button className='ui button blue'>Add Contact</button>
                </Link>
            </h1>
            <div className='ui celled list'>{renderContact}</div>
        </div>
    </>
}

export default ContactList;