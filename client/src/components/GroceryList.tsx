import React, { FunctionComponent } from 'react';
import { GroceryItem } from './GroceryItem';

export const GroceryList: FunctionComponent<GroceryList> = ({handleComplete, handleDelete, list}) => {
  return (
    <div className="section section--secondary">
      <div className="full-column">
        <div className="grocery-list">
          {
            list.length > 0 ?
            list.map((item, index) => 
              <GroceryItem
                item={item}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                key={index}
              />
            )
            :
            "List is empty, start adding products to your list"
          }
        </div>
      </div>
    </div>
  )
}