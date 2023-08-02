import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import SearchItem from './SearchItem';

function App() {

  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        
        if(!response.ok) {
          throw Error('Did not recieve the expected data');
        }

        const listItems = await response.json();
        setItems(listItems);

        setFetchError(null);
      } catch(err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    // sleep for 2 seconds
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);

  }, []);

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
      <main>
        {fetchError && <p style={{color: 'red'}}>Error</p>}
        
        {isLoading && <p style={{color: 'magenta'}}>Items are loading...</p>}

        {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.name).toLowerCase()).includes(search.toLowerCase()))}
          handleCheckbox={handleCheckbox}
          handleDelete={handleDelete}
        />}
      </main>

      <Footer 
        length={(items.filter(item => ((item.name).toLowerCase()).includes(search.toLowerCase()))).length}
      />
    </div>
  );
}

export default App;
