import React from 'react';
import CarTemplate from '../../templates';
import './Main.css'

const cars = [
  {
    id: 0,
    model: 'A8',
    manufacturer: 'Audi',
    plate: 'AB1234BC',
    kilometrage: '10000',
    price: '1200000'
  },
  {
    id: 1,
    model: 'A200',
    manufacturer: 'Mercedes',
    plate: 'BO5656AA',
    kilometrage: '1253',
    price: '400000'
  },
  {
    id: 2,
    model: '5008',
    manufacturer: 'Peugeot',
    plate: 'BC9898BP',
    kilometrage: '54000',
    price: '1500000'
  }
]

export default function Main() {
  return (
    <div className="main">
      <ul className="item-list">
        {cars.map((car, id) => <li key={id}><CarTemplate car={car}/></li>)}
      </ul>
      <div className="button-container">
        <button className="btn btn-outline-dark">Show More</button>
      </div>
    </div>
  );
}