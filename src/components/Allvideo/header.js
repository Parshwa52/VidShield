import React, { Component } from "react";
import VidShield from '../../abis/VidShield.json';
import '../../App.css';
import './Director.css';
import Web3 from 'web3';
//import history from '../history';
import {Link} from 'react-router-dom';
export class Header extends Component {
  

  

  

  


  
  render() {
    return (
      <header id="header">
        <div className="intro213">
          <div className="overlay2">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {this.props.title ? this.props.title : "Loading"}
                    <br/>
                    <h3><font color="white">{this.props.paragraph}</font></h3>
                    <span></span>
                  </h1>
                  
                  
                    
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </header>
    );
  
}
}

export default Header;
