import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList'
import { v4 as uuidv4 } from 'uuid';
import ContactDetails from './ContactDetails';


function App() {
  const LOCAL_STORAGE_KEY = 'contacts';

  const [contacts, setContacts] = useState(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return retriveContacts || [];
  });

  const addContactHandler = (contact) => {
    setContacts([  { id: uuidv4(), ...contact }]);
  };


  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => { return contact.id !== id });
    setContacts(newContactList);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts]);


  return <>
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/contact/:id" element={<ContactDetails></ContactDetails>} />
        </Routes>
      </Router>
    </div>
  </>
}

export default App;
