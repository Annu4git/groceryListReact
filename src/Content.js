import { useState } from "react";
import ItemList from "./ItemList";

const Content = ({ items, handleCheckbox, handleDelete }) => {

    // here name is a variable and setName is a setter
    // or we can think as below is the destructure of getter and setter for variable name
    const[name, setName] = useState('Anurag');

  return (
    <>
        {items.length ? (
            <ItemList 
                items={items}
                handleCheckbox={handleCheckbox}
                handleDelete={handleDelete}
            />
        ) : (<p>List is empty</p>)}

    </>
  )
}

export default Content