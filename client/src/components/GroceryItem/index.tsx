import React, { FunctionComponent } from 'react';
import './GroceryItem.scss';

export const GroceryItem: FunctionComponent<GroceryItem> = ({handleComplete, handleDelete, item}) => {
  return (
    <div className="grocery-item">
      <div className="grocery-name">
        <input
          id={item.id}
          type="checkbox"
          onChange={() => handleComplete(item)}
          checked={item.completed}
        />
        <label htmlFor={item.id}>
          { item.completed ? <s>{item.name}</s> : item.name }
        </label>
        
      </div>
      <div className="grocery-actions">
        <button name="complete" className="btn btn--secondary" onClick={() => handleComplete(item)}>Complete</button>
        <button className="btn btn--remove" onClick={() => handleDelete(item.id)}>Remove</button>
      </div>
    </div>
  )
}