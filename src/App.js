import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';
import SearchItem from './SearchItem';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function App() {

const[items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')));

const [newItem, setNewItem] = useState('');

const [search, setSearch] = useState('');

const saveAndUpdateItemList = (updatedItemList) => {
  setItems(updatedItemList);
  localStorage.setItem('shoppingList', JSON.stringify(updatedItemList));
}

const addItem = (item) => {
  const id = items.length ? items[items.length-1].id + 1 : 1;
  const newItemToBeAdded = { id, name: item,  checked: false };
  const updatedItemList = [...items, newItemToBeAdded];
  saveAndUpdateItemList(updatedItemList);
}

const handleCheckbox = (id) => {
    const updatedItemList = items.map((item) => (
        item.id === id ? {...item, checked : !item.checked} : item
    ));

    saveAndUpdateItemList(updatedItemList);
}

const handleSubmit = (e) => {
  e.preventDefault();
  
  if(!newItem)
    return;
  addItem(newItem);
  setNewItem('');
}

const handleDelete = (id) => {
    const updatedItemList = items.filter((item) => item.id !== id);
    saveAndUpdateItemList(updatedItemList);
}
  
  return (
    <div className="App">
      <Header title="Grocceries 123" />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <Content 
        items={items.filter(item => ((item.name).toLowerCase()).includes(search.toLowerCase()))}
        handleCheckbox={handleCheckbox}
        handleDelete={handleDelete}
      />

      <Footer 
        length={(items.filter(item => ((item.name).toLowerCase()).includes(search.toLowerCase()))).length}
      />
    </div>
  );
}

export default App;
