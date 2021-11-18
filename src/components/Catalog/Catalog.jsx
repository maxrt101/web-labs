import React, {useState, useEffect} from 'react';
import Main from './Main'
import {getCars, getFilteredBy, getSearched} from '../../requests'
import Loading from '../navigation/Loading';
import './Catalog.css'
import axios from 'axios';

export default function Catalog(props) {
  const[cars, setCars] = useState(null);

  useEffect(() => getCars().then(result => setCars(result.data)), []);

  var filterCars = () => {
    const by = document.getElementById('filter_input').value
    getFilteredBy(by).then(result => setCars(result.data))
  }

  var searchCars = () => getSearched(document.getElementById('search_input').value).then(result => setCars(result.data))

  return (
    <div>
      <div className="catalog_hero">
        <div className="hero_filter">
          <form>
            <input id="filter_input" className="form-control" type="text" placeholder="Search"></input>
          </form>
          <button id="filter_button" className="btn btn-primary" type="button" onClick={() => filterCars()}>Filter</button>
        </div>
        <div className="hero_search">
          <form>
            <input id="search_input" className="form-control" type="text" placeholder="Search"></input>
          </form>
          <button id="search_button" className="btn btn-primary" type="button" onClick={() => searchCars()}>Search</button>
          <button id="clear_button" className="btn btn-secondary" type="button">Clear</button>
        </div>
      </div>
      {cars ? <Main cars={cars} /> : <Loading />}
    </div>
  );
}
