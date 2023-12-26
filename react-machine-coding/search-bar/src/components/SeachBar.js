import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { SearchList } from './SearchList';

export const SearchBar = ({ result }) => {
    const [input, setInput] = useState("");
    const [filteredList, setFilteredList] = useState(null)


    const handleChange = (e) => {
        setInput(e.target.value);
        setFilteredList(result.filter((user) => {
            return user && user.name && user.name.toLowerCase().includes(e.target.value.toLowerCase());
        }));
    }


    return (
        <>
            <div className='input-wrapper-container'>
                <FaSearch className='search-icon' />
                <input type="text" placeholder='type..' value={input} onChange={handleChange} />
            </div>
            {input && <SearchList filteredList={filteredList} />}
        </>
    )
}
