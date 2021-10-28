import React from 'react';
import logo from '../../../assets/logo.png';
import facebook from '../../../assets/facebook_logo.png';
import twitter from '../../../assets/twitter_logo.png';
import linkedin from '../../../assets/linkedin_logo.png';
import google from '../../../assets/google_logo.png';
import './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <ul>
          <li>
            <div>
              <p className="footer-heading">Brand stuff</p>
              <p className="footer-text">Lorem ipsum dolor sit amet, consectetur<br/>adipiscing elit, sed do eiusmod<br/>tempor incididunt</p>
            </div>
          </li>
          <li><img className="footer-logo" src={logo} alt="Logo" /></li>
          <li>
            <img className="footer-img" src={facebook} alt="Facebook Logo" />
            <img className="footer-img" src={twitter} alt="Twitter Logo" />
            <img className="footer-img" src={linkedin} alt="Linedin Logo" />
            <img className="footer-img" src={google} alt="Google Logo" />
          </li>
        </ul>
        <div className="footer-line"></div>
        <div className="footer-copyright">
          <p>2021 IoT &copy; Copyright all rights reserved</p>
        </div>
      </footer>
    );
  }
}
