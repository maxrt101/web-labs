import React, {useState, useEffect} from 'react';
import Hero from './Hero'
import Main from './Main'
// import cars from './cars';
import {getCars} from '../../requests'

export default function Catalog(props) {
  const[cars, setCars] = useState(null);

  useEffect(()=>{
    getCars().then((result) => setCars(result.data) );  
  },[]);

  return (
    <div>
      <Hero />
      {cars ? <Main cars={cars} /> : <p>Loading</p>}
    </div>
  );
}
