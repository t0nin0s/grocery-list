import React, { useState, useEffect } from 'react';
import './App.scss';
import { Header } from './components/Header/';
import { GroceryForm } from './components/GroceryForm/';
import { GroceryList } from './components/GroceryList';
import * as api from './api/grocery-api';

function App() {
  const [ items, setItems ] = useState<Item[]>([]);

  useEffect(() => {
    const fetchGroceryList = async () => {
      const result = await api.getGroceryList();
      setItems(result.data);
    }

    fetchGroceryList();
  }, [])

  const handleSubmit = async (value: string) => {
    await api.addGroceryItem(value)
    const allItems = await api.getGroceryList();
    setItems(allItems.data)
  }

  const handleComplete = async (item: Item) => {
    await api.updateGroceryItem({...item, completed: !item.completed});
    const allItems = await api.getGroceryList();
    setItems(allItems.data)
  }

  const handleDelete = async (id: string) => {
    await api.deleteGroceryItem(id);
    const allItems = await api.getGroceryList();
    setItems(allItems.data)
  }

  return (
    <div className="App">
      <Header />
      <GroceryForm 
        submitItem={(value) => {
          handleSubmit(value);
        }}
      />
      <h2>Your Grocery list</h2>
      <GroceryList
        list={items}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
