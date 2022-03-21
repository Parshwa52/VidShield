import React, { Component } from "react";

export class Services extends Component {
  render() {
    return (
      <div id="services" className="text-center">
        <h1>Do you want to report a pirated video?</h1>
        <button
                    onClick={() => window.open('/Reporter')}
                    className="btn btn-warning btn-lg page-scroll"
                  >
                    Click here to report
                  </button>{" "}
      </div>
    );
  }
}

export default Services;
