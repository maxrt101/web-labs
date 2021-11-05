import {React, useState} from 'react';
import './Hero.css' 

function Filter() {
  return (
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filter
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">By kilometrage</a>
        <a class="dropdown-item" href="#">By name</a>
        <a class="dropdown-item" href="#">By price</a>
      </div>
    </div>
  );
}

function Search(){
  return(
    <div className="hero_search">
      <form>
        <input id="search_input" className="form-control" type="text" placeholder="Type something..."></input>
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
