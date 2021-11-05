import React from 'react';
import Hero from './Hero'
import Main from './Main'
import cars from './cars';

export default function Catalog(props) {
  return (
    <div>
      <Hero />
      <Main cars={cars} />
    </div>
  );
}
