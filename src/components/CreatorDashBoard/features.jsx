import React, { Component } from "react";
import {Link} from 'react-router-dom';
export class features extends Component {
  render() {
    return (
      <div id="features" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Your videos</h2>
          </div>
          <div className="row">
            {this.props.data
              ? this.props.data.map((d,i) => (
                  <div  key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                    {" "}
                    <Link to={{
                              pathname: '/Video',
                              state: {
                                link:d.livepeerlink,
                                id:d.id,
                              }
                            }} >
                    <img src={d.thumbnail} height="280px" width="280px"></img>
                    <h3>{d.id}.{ }{d.title}</h3>
                    </Link>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    );
  }
}

export default features;
