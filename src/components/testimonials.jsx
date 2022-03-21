import React, { Component } from "react";

export class testimonials extends Component {
  render() {
    return (
      <div id="testimonials">
        <h1></h1>
        <button
                    onClick={() => window.open('/')}
                    className="btn btn-success btn-lg page-scroll"
                  >
                    Click here to check
                  </button>{" "}
      </div>
    );
  }
}

export default testimonials;
