import React, { Component } from "react";

export class features extends Component {

  

  subscribecreator=async(creator)=>
  {
      
      try{
      console.log("viewer",this.props.vieweraccount);
      //console.log("Vidshield",this.props.vidshield);
      const viewer = this.props.vieweraccount;
      const vidshield = this.props.vidshield;

      var check = await vidshield.methods.creatorssubscribed(viewer,creator).call();
      const toda = new Date();
      const yyyy = toda.getFullYear();
      let mm = toda.getMonth() + 1; // Months start at 0!
      let dd = toda.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const todaydate = dd + '/' + mm + '/' + yyyy;

      const current = new Date(todaydate);
      const subscribeenddate = new Date(check);
      const diffTime = Math.abs(subscribeenddate - current);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if(check==="" || diffDays>365)
      {
      //await console.log("last date=",check);
      //date
      let subscriptionamount=window.web3.utils.toWei('0.001', 'Ether');
      var year  = new Date().getFullYear();
      var month = new Date().getMonth();
      var day   = new Date().getDate();
      var date  = new Date(year + 1, month, day);
      const yyyy2 = date.getFullYear();
      let mm2 = date.getMonth() + 1; // Months start at 0!
      let dd2 = date.getDate();

      if (dd2 < 10) dd2 = '0' + dd2;
      if (mm2 < 10) mm2 = '0' + mm2;

      const todaydate2 = mm2 + '/' + dd2 + '/' + yyyy2.toString().substr(2,4);
      //console.log("date=",todaydate2);
      //console.log("creator=",creator);
      await vidshield.methods.subscribeCreator(viewer,creator,todaydate2).send({from: viewer,value: subscriptionamount})
      .then((result)=>{
        
          alert(`You have successfully subscribed to ${creator} with subscription amount of 0.001 ether`);
          //document.location.reload();
        
      });
    }
    else 
    {
      alert("Your subscription is still valid.");
    }
    }
    catch(err){
      alert("Some unexpected error took place. Have patience and restart application");
    }
  }
  render() {
    return (
      <div id="features" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Creator Videos</h2>
          </div>
          <br/>
          <div>
                    {
                Object.keys(this.props.yourmovies).map(creator_name => {
                  return (
                    <div>
                      <div><h2>{this.props.yourmovies[creator_name].creator}</h2>
                      <form><input type="button" value="Subscribe" className="btn btn-success btn-custom btn-lg page-scroll" onClick={()=>this.subscribecreator(this.props.yourmovies[creator_name].creator)}/></form><br/></div>
                      <div className="row">
                      {
                        
                        this.props.yourmovies[creator_name].videos.map(item => {
                          return( <div className="col-xs-6 col-md-3" key={`${item.id}-${item.title}`}>
                          {"       "}
                          <img src={item.thumbnail} height="280px" width="280px"></img>
                          <h3>{item.id}.{ }{item.title}</h3>

                          {"       "}
                          
                        </div>
                        )
                        })
                        
                      }
                      
                      </div>
                      <br/><br/><br/>
                    </div>
                  )
                })
              }
              </div>
          
            
            
          </div>
        </div>
      
    );
  }
}

export default features;
