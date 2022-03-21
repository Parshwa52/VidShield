import React, { Component } from 'react'
import { Button, Grid, Segment } from 'semantic-ui-react'

import Web3 from 'web3';
export default class ReporterComp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      

      tipAmount:0
    };
   
  }

  
  

  

  handleClick = (link) => window.open(link);
  
  

  

  render() {
    

    return (
      <div className="row">
        <Segment inverted color="black">
        <h1>Here is the list of all requests:</h1>
        
        <Segment inverted color="grey">
        
        <Grid>
            {this.props.data
              ? this.props.data.map((d,i) => (
                <div key={i}>
                <Grid.Column width={5} >
                <Segment attached='top' size='small'>
                  {d.requestid}{")"}{d.address}
                </Segment>
                <Button.Group color='blue' widths='5'>
          <Button attached='bottom' onClick={(event)=>{window.open(d.link);}}>View Copy</Button>

          <Button attached='bottom' onClick={(event)=>{this.props.blockpirate(d.address)}}>Block Pirate</Button>

          <Button color="red" attached='bottom' onClick={(event)=>{this.props.cancelRequest(d.requestid)}}>Cancel Request</Button>
          
        </Button.Group>
              </Grid.Column>
              </div>
                ))
              : "Loading..."}
         
      

        
        
      </Grid>
      </Segment>
      </Segment>
      </div>
    )
  }
}
