import React, { Component } from "react";
import {Link} from 'react-router-dom';

export class testimonials extends Component {
  render() {
    return (
      <div id="testimonials">
        <h1>Do you want to check reports?</h1>

        <Link to={{
                            pathname: '/checkreport',
                            
                          }} >
                  <input type="button" value="Click here to check"
                    
                    className="btn btn-success btn-lg page-scroll"
                  />
                    
                  {" "}
                          </Link>
        
      </div>
    );
  }
}

export default testimonials;
