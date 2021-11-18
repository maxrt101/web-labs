import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
// import './Main.css';
// import CarTemplate from '../../templates';
import {getCar} from '../../../requests';
import Loading from '../../navigation/Loading';
import CarTemplate from '../../templates';
import './Item.css'

export default function Item(props) {
  const[car,setCar] = useState(null);
  const params = useParams();

  useEffect(() => getCar(params.id).then((result) => setCar(result.data)), []);

  return (
    <div className="item">
      {car ? <CarTemplate car={car} /> : <Loading />}
    </div>
  );
}
