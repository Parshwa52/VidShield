import React, { Component } from "react";
import {Link} from 'react-router-dom';
export class features extends Component {
  render() {
    return (
      <div id="features" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Your subscribed creators</h2>
          </div>
          <br/>
          <div>
                    {
                Object.keys(this.props.yourmovies).map(creator_name => {
                  return (
                    <div>
                      <div><h2>{this.props.yourmovies[creator_name].creator}</h2><hr/><br/></div>
                      <div className="row">
                      {
                        
                        this.props.yourmovies[creator_name].videos.map(item => {
                          return( 
                            <div>
                            <Link to={{
                              pathname: '/Video',
                              state: {
                                link:item.livepeerlink,
                                id:item.id,
                                link:item.livepeerlink
                              }
                            }} >
                          <div className="col-xs-6 col-md-3" key={`${item.title}-${item.id}`}>
                          {"       "}
                          <img src={item.thumbnail} height="280px" width="280px"></img>
                          <h3>{item.id}.{ }{item.title}</h3>
                          {"       "}
                          </div>
                          </Link>
                          </div>
                        
                        )
                        })
                        
                      }
                      
                      </div>
                      <br/><br/>
                    </div>
                  )
                })
              }
              </div>
          
            {/* {this.props.yourmovies?
              this.props.yourmovies.map((d,i) => (
                <div key={`${d.creator}-${i}`} className="col-xs-6 col-md-3">
    
                  <h3>{d.creator}</h3>
                  <br/><br/>
                  <div className="row">
                  {d.creator?
                  d.videos.map((e,j) => (
                  <div key={`${e.title}-${j}`} className="col-xs-6 col-md-3">
                    {" "}
                    <img src={e.icon} height="280px" width="280px"></img>
                    <h3>{e.id}.{ }{e.title}</h3>
                    <br/><br/><br/>
                    
                  </div>
                  
                )):<h3>"no videos"</h3>
                  }
                  </div>
                :
                "No vIDEOS"
                <br/>
                </div>
              )):"Loading..."} */}
            
          </div>
        </div>
      
    );
  }
}

export default features;
