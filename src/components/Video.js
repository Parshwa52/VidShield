import React, { Component } from 'react';
//import Identicon from 'identicon.js';
import './Video.css';
import VidShield from '../abis/VidShield.json';
import Web3 from 'web3';
const CryptoJS = require("crypto-js");
class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      siahash:'',
      livepeerlink:"",
      interval:5
    }
 
    
  }
  async componentDidMount()
  {
    await this.loadWeb3();
    await this.loadBlockchainData();
    document.documentElement.webkitRequestFullscreen();
    this.interval = setInterval(this.handlefullscreen, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  async loadWeb3()
  {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        //console.log(window.web3);
        //console.log(web3.eth.getAccounts());
        // Acccounts now exposed
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      //console.log(window.web3);
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
    window.ethereum.on('accountsChanged',function (accounts) {
 
      
      // Time to reload your interface with accounts[0]!
      alert("Account changed");
      window.location.reload();
      // if(err)
      // {
      //   alert("Unauthorized Account");
      //   window.close();
      // }
      this.setState({account:accounts[0]});
      //if(this.state.account)
      
    }.bind(this));
 
 
 
    //console.log(web3);
    //console.log(accounts);
   // 
   const networkId=await web3.eth.net.getId();
    const networkdata=VidShield.networks[networkId];
    if(networkdata)
    {
      const vidshield=new web3.eth.Contract(VidShield.abi,networkdata.address);
     
      
      //const {link}=this.props.location.state;
      //this.setState({siahash:link});
      //console.log(icon);
      try {
        const  {handle} =this.props.match.params;
      const {id}=this.props.location.state;
      const {link}=this.props.location.state;
      
      var bytes  = CryptoJS.AES.decrypt(link, 'secret');
      var originallink = bytes.toString(CryptoJS.enc.Utf8);

      
      this.setState({livepeerlink: originallink});
        
      } catch (error) {
        console.log(error);
          alert("Unauthorized Account");
          window.close();
      }
    }
    
    
  }
 
  handlefullscreen()
  {
    //alert("Handle fs");
    if (document.addEventListener)
    {
     // alert("add event");
     document.addEventListener('fullscreenchange',()=>{alert("Exiting Full Screen is not allowed.");window.close();}, false);
     //document.addEventListener('mozfullscreenchange', exitHandler, false);
     //document.addEventListener('MSFullscreenChange', exitHandler, false);
     document.addEventListener('webkitfullscreenchange',()=>{alert("Exiting Full Screen is not allowed.");window.close();}, false);
     document.addEventListener("keydown", e => {
       alert("You are not allowed to press any key");
       window.close();
      //if(e.key == "F11") e.preventDefault();
  });
    }
    
    
  }
  /* exitHandler()
    {
        alert("handle exit");
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        if(fullscreenElement==null)
        {
          alert("Not fs");
        }
        // if in fullscreen mode fullscreenElement won't be null
    
    }*/
 
  handleinspect(e) 
  {
    alert("key down");
    if(e.keyCode == 123) 
    {
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
    }
  }
  
 
 
 
  render() {
    return (
      
      <div onContextMenu={e => e.preventDefault()} onKeyDown={this.handleinspect} tabIndex="0" style={{ width: "100%" }} className="container-fluid mt-5" >
           <center>
      <header>
  
    <video src={this.state.livepeerlink} autoplay="autoplay" controls controlsList="nodownload" disablePictureInPicture onKeyDown={e=>e.preventDefault()}></video>
    <div class="overlay">
        <h1 id='abcd'>{this.state.account}</h1>
    </div>
</header>
</center>
      </div>
      
    );
  }
}
 
export default Video;

