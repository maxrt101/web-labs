import React from "react";
import Hero from "./Hero/Hero";
import Main from "./Main/Main";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Hero/>
        <Main/>
      </div>
    );
  }
}