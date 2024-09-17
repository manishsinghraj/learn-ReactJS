// Header.js
import React from 'react';

const Header = ({ theme }) => {
    return <header style={{ background: theme === 'light' ? '#eee' : '#333', color: theme === 'light' ? '#333' : '#eee' }}>Header</header>;
};

export default Header;

