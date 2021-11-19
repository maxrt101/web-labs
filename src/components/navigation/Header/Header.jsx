import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import Home from '../../Home';
import Catalog from '../../Catalog';
import Cart from '../../Cart';
import Item from '../../Catalog/Item';
import logo from '../../../assets/logo.png';
import './Header.css';

export default function Header() {
  return (
    <Router>
      <header className="header">
        <ul className="nav">
          <li><img className="logo" src={logo} alt="Logo" /></li>
          <li>
            <ul>
              <li><NavLink exact to="/" className="btn btn-outline-dark">Home</NavLink></li>
              <li><NavLink exact to="/catalog" className="btn btn-outline-dark">Catalog</NavLink></li>
              <li><NavLink exact to="/cart" className="btn btn-outline-dark">Cart</NavLink></li>
            </ul>
          </li>
          <li className="nav-last-placeholder" />
        </ul>
      </header>
      <Switch>
        <Route exact path="/catalog" component={Catalog}>
          <Catalog />
        </Route>
        <Route path="/cart" component={Cart}>
          <Cart />
        </Route>
        <Route exact path="/" component={Home}>
          <Home />
        </Route>
        <Route exact path={"/car/:id"} component={Item}>
          <Item />
        </Route>
      </Switch>
    </Router>
  );
}
