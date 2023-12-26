import React from 'react'

export const SearchList = ({ filteredList }) => {
    return (
        <div className='search-list-container'>
            {filteredList && filteredList.map((user, index) =>
                <div key={index}
                    className='search-list-items'
                    onClick={() => alert(user.name)}
                >{user.name}</div>
            )}
        </div>
    )
}
