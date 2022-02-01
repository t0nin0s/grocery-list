import React, { useState, FormEvent, FunctionComponent } from 'react';
import './GroceryForm.scss';

export const GroceryForm : FunctionComponent<GroceryForm> = ({submitItem}) => {
  const [ value, setValue ] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if(!value) return;
    submitItem(value);
    setValue("");
  }
  return (
    <div className="section section--main">
      <form>
        <div className="full-column">
          <div className="grocery-form__title">
            <h1 >Add new grocery product</h1>
          </div>
        </div>
        <div className="full-column">
          <div className="grocery-form__input">
            <input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              className="input-text"
              placeholder="Add your item"
            />
          </div>
          <div className="grocery-form__submit">
            <button className="btn btn--primary" onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </form>
    </div>
  )
}