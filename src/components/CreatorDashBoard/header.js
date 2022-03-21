import React, { Component } from "react";
import VidShield from '../../abis/VidShield.json';
import '../../App.css';
import './Director.css';

import Web3 from 'web3';
//import history from '../history';
import {Link} from 'react-router-dom';
export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      yourmovies:[{"title":"ABCD","icon":"https://ipfs.io/ipfs/","id":1,"link":"abcd"}],
      id:0,
      abcd:"",
      vidshield:null
    }
    
    this.registerCreator = this.registerCreator.bind(this);
  }

  async componentDidMount()
  {
    await this.loadWeb3();
    await this.loadBlockchainData();
    
  }
  async loadWeb3()
  {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        console.log(window.web3);
        //console.log(web3.eth.getAccounts());
        // Acccounts now exposed
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log(window.web3);
      // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData()
  {
    const web3=window.web3;
    const accounts=await web3.eth.getAccounts();
    //var paccount = accounts[0];
    //var oldaccount=this.state.account;
    this.setState({account:accounts[0]});
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      window.location.reload();
      this.setState({account:accounts[0]});
    }.bind(this));

    console.log(web3);
    console.log(accounts);
   // 
   const networkId=await web3.eth.net.getId();
   //console.log(networkId);
    const networkdata=VidShield.networks[networkId];
    //console.log(networkdata);
    if(networkdata)
    {
      const vidshield=new web3.eth.Contract(VidShield.abi,networkdata.address);
      await this.setState({vidshield});
      
      
    }
    
    
  }

  registerCreator=async(event)=>
  {
    event.preventDefault();
    try
    {
    await this.state.vidshield.methods.registerCreator(this.state.account).send({
      from: this.state.account
    }).then((result)=>{
        alert("You have successfully registered.Please refresh your page.");
        document.location.reload();
    });
  }
  catch(err)
  {
    alert("Some unexpected error took place. Have patience and restart application");
  }
}

  


  
  
  render() {
    return (
      <header id="header">
        <div className="intro21">
          <div className="overlay2">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {this.props.title ? this.props.title : "Loading"}
                    <span></span>
                  </h1>
                  {this.props.isregistered? 
                   
                  <form>
                  <Link to={{
                            pathname: '/Creatorplatform',
                            state: {
                              id:0
                    
                            }
                          }} >
                  <input type="button" value="Upload New Video"
                    
                    className="btn btn-custom btn-lg page-scroll"
                  />
                    
                  {" "}
                          </Link>

                          <Link to={{
                            pathname: '/yournft',
                            state: {
                              id:0,
                              account1:this.state.account
                            }
                          }} >
                  <input type="button" value="Your NFTs"
                    
                    className="btn btn-custom btn-lg page-scroll"
                  />
                    
                {" "}
                  </Link>
                  
                  </form>
                  :
                  <form>
                  <button
                    onClick={this.registerCreator}
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Register
                  </button>
                  </form>
                }
                  
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
