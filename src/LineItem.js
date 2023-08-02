import React from 'react'

import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({ item, handleCheckbox, handleDelete }) => {
  return (
    <li className="item">
        <input 
            type="checkbox" 
            checked={item.checked} 
            onChange={() => handleCheckbox(item.id)}
        />
        <label
            style={item.checked ? {textDecoration: 'line-through'} : null}
            onDoubleClick={() => handleCheckbox(item.id)}
        >{item.name}</label>
        
        <FaTrashAlt
            onClick={() => handleDelete(item.id)}
            role="button"
            tabIndex="0"
            aria-label={`Delete ${item.item}`}
        />
    </li>
  )
}

export default LineItem