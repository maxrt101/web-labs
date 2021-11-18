import {React, useState} from 'react';
import './Hero.css' 

function Filter() {
  return (
    <div className="hero_filter">
      <form>
        <input id="filter_input" className="form-control" type="text" placeholder="Search"></input>
      </form>
      <button id="filter_button" className="btn btn-primary" type="button">Filter</button>
    </div>
  );
}

function Search() {
  return(
    <div className="hero_search">
      <form>
        <input id="search_input" className="form-control" type="text" placeholder="Search"></input>
      </form>
      <button id="search_button" className="btn btn-primary" type="button">Search</button>
      <button id="clear_button" className="btn btn-secondary" type="button">Clear</button>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="catalog_hero">
      <Filter />
      <Search />
    </div>
  );
}
