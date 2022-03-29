import React, { Component } from "react";
import {Link} from 'react-router-dom';

export class Services extends Component {
  render() {
    return (
      <div id="services" className="text-center">
        <h1>Do you want to report a pirated video?</h1>
        <Link to={{
                            pathname: '/Reporter',
                            
                          }} >
                  <input type="button" value="Click here to report"
                    
                    className="btn btn-warning btn-lg page-scroll"
                  />
                    
                  {" "}
                          </Link>
      </div>
    );
  }
}

export default Services;
