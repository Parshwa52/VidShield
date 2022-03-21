


import VidShield from '../../abis/VidShield.json';
import React, { Component } from 'react';
import Navigation from './navigation';
import Header from './header.js';
import Features from './features';


import Web3 from 'web3';
import { BrowserRouter as Router } from 'react-router-dom';

import '../../App';
class allvideo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      yourmovies:[],
      isregistered:false,
      vidshield:null,
      blockstatus:false
    }

    
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
      this.setState({vidshield});
      

      var isregistered = await vidshield.methods.checkIfAlreadyViewer(this.state.account).call();
      console.log("registred viewer=",isregistered);
      await this.setState({isregistered});

      const totalcreators = await vidshield.methods.getCountOfAllRegisteredCreators().call();
      console.log("totalcreators=",totalcreators);

      var creatorarray = await vidshield.methods.getAllRegisteredCreators().call();
      console.log("creatorarray=",creatorarray);
      
      var vidcounter = await vidshield.methods.vidcounter().call();
      console.log("video count=",vidcounter);
      var i;

      var creatorlength = totalcreators;
      var j;
      var allmovies=[];

      for(j=0;j<creatorlength;j++)
      {
        var currcreator = creatorarray[j];
        var obj=new Object();
        obj.creator=currcreator;
        
        var videoarray=[];
      for(i=1;i<=vidcounter;i++)
      {
        var videodata = await vidshield.methods.getVideoData(i).call();
        if(videodata.creator ==currcreator)
        {
          var videoobj = new Object();
          videoobj.title = videodata.title;
          videoobj.thumbnail = videodata.thumbnail;
          videoobj.id = videodata.id;
          videoobj.livepeerlink = videodata.livepeerlink;
          videoarray.push(videoobj);
        }
        
      }
    
      obj.videos=videoarray;
      allmovies.push(obj);
    
    
    }


    this.setState({yourmovies:allmovies});
    

      
    }
    
    
  }
  

  render() {
    return (
     
      <div>
        
        {this.state.blockstatus?
        <h1> You are blocked from viewing the video</h1>
        :
        
        <div>
        <Navigation account ={this.state.account}/>
        <Header title="All Videos" paragraph="You can subscribe your creator here" isregistered={this.state.isregistered} blockstatus={this.state.blockstatus}/>
        <Features yourmovies={this.state.yourmovies} vidshield={this.state.vidshield} vieweraccount={this.state.account} />
        </div>
        }
        
        
        
      </div>
     
      
        
    );
  }
}

export default allvideo;
