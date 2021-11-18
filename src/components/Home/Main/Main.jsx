import React, {useState, useEffect} from 'react';
import CarTemplate from '../../templates';
import './Main.css'
import {getCars} from "../../../requests";
import Loading from '../../navigation';

export default function Main() {
  const[cars, setCars] = useState(null);
  const[count, setCount] = useState(3);

  useEffect(() => getCars().then((result) => setCars(result.data)), []);

  return (
    <div className="main">
      <ul className="item-list">
        {cars ? cars.slice(0, count).map((car, id) => <li key={id}><CarTemplate car={car}/></li>) : <Loading />}
      </ul>
      <div className="button-container">
        <button className="btn btn-outline-dark" onClick={() => setCount(count+3)}>Show More</button>
      </div>
    </div>
  );
}