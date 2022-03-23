import React, { Component } from "react";

export class features extends Component {
  render() {
    return (
      <div id="features" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>All NFTs</h2>
          </div>
          <div className="row">
            {this.props.data
              ? this.props.data.map((d,i) => (
                  <div  key={`${d.tokenInteger}-${i}`} className="col-xs-6 col-md-3">
                    {" "}
                    <a href={d.clickablelink} target="_blank">
                    <img src={d.thumbnaillink} height="280px" width="280px"></img>
                    <h3>{d.tokenInteger}.{ }{d.title}</h3>
                    </a>
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
