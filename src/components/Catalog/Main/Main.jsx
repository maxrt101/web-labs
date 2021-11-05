import React from 'react';
import './Main.css';
import CarTemplate from '../../templates';

export default function Main(props) {
  return (
    <div className="catalog">
    <ul className="item-list">
      {props.cars.map((car, id) => <li key={id}><CarTemplate car={car}/></li>)}
    </ul>
  </div>
  );
}
