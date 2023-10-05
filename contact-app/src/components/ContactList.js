import React from 'react';
import ContactCard from './ContactCard';


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
        <div className='ui celled list'>{renderContact}</div>
    </>
}

export default ContactList;