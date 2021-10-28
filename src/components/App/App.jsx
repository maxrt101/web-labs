import React from 'react';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Footer/>
      </div>
    );
  }
}
