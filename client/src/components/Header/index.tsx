import React, { FunctionComponent } from 'react';
import logo from '../../images/logo.svg'

export const Header: FunctionComponent = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>
          <span>Equal experts test</span>
        </div>
      </div>
    </header>
  )
}