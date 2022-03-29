import React, { Component } from "react";
import '../App.css';
import history from '../history';
import {Link} from 'react-router-dom';
export class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="intro">
          <div className="overlay2">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {this.props.data ? this.props.data.title : "Loading"}
                    <span></span>
                  </h1>
                  <p>
                    {this.props.data ? this.props.data.paragraph : "Loading"}
                  </p>
                  
                  <Link to={{
                            pathname: '/CreatorDashBoard',
                            
                          }} >
                  <input type="button" value="Let Set Go Creator"
                    
                    className="btn btn-custom btn-lg page-scroll"
                  />
                    
                  {" "}
                          </Link>

                          <Link to={{
                            pathname: '/ViewerPlatform',
                            
                          }} >
                  <input type="button" value="Yo Stylish Viewer"
                    
                    className="btn btn-custom btn-lg page-scroll"
                  />
                    
                  {" "}
                          </Link>
                    
                  
                  
                  
                  
                  
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
