

import VidShield from '../../abis/VidShield.json';
import React, { Component } from 'react';
import Navigation from './navigation';
import Header from './header.js';
import Features from './features';


import Web3 from 'web3';
import { BrowserRouter as Router } from 'react-router-dom';

import '../../App';
class ViewerPlatform extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      yourmovies:[{"creator":"0x1E0745195BCcf063eBDAfB44731FaAD1e30b160C","videos":[{"title":"aABCD","thumbnail":"https://ipfs.io/ipfs/","id":1,"livepeerlink":"https://ipfs.livepeer.com/ipfs/"},{"title":"bABCD","thumbnail":"https://ipfs.io/ipfs/","id":1,"livepeerlink":"https://ipfs.livepeer.com/ipfs/"}]},{"creator":"0x1E0745195BCcf063eBDAfB44731FaAD1e30b160C","videos":[{"title":"cABCD","thumbnail":"https://ipfs.io/ipfs/","id":1,"livepeerlink":"https://ipfs.livepeer.com/ipfs/"}]},{"creator":"0x1E0745195BCcf063eBDAfB44731FaAD1e30b160C","videos":[{"title":"dABCD","thumbnail":"https://ipfs.io/ipfs/","id":1,"livepeerlink":"https://ipfs.livepeer.com/ipfs/"}]}],
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

      

      var isregistered = await vidshield.methods.checkIfAlreadyViewer(this.state.account).call();
      console.log("registred viewer=",isregistered);
      await this.setState({isregistered});

      const yourcreatorssubscribed = await vidshield.methods.getCreatorsforViewer(this.state.account).call();
      console.log("ycs=",yourcreatorssubscribed);

      const viewerdata = await vidshield.methods.getUserData(this.state.account).call();
      console.log("viewerdata=",viewerdata);

      await this.setState({blockstatus:viewerdata[2]});
      
      var vidcounter = await vidshield.methods.vidcounter().call();
      console.log("video count=",vidcounter);
      var i;

      var creatorlength = yourcreatorssubscribed.length;
      var j;
      var youreligiblemovies=[];

      for(j=0;j<creatorlength;j++)
      {
        var currcreator = yourcreatorssubscribed[j];
        console.log("jcreator=",currcreator);
        var obj=new Object();
        obj.creator=currcreator;
        var check = await vidshield.methods.creatorssubscribed(this.state.account,currcreator).call();
        console.log("check=",check);
        //date
        const toda = new Date();
      const yyyy = toda.getFullYear();
      let mm = toda.getMonth() + 1; // Months start at 0!
      let dd = toda.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const todaydate = mm + '/' + dd + '/' + yyyy.toString().substr(2,4);

      const current = new Date(todaydate);
      console.log("todaydate=",current);
      const subscribeenddate = new Date(check);
      console.log("subdate=",subscribeenddate);
      const diffTime = Math.abs(subscribeenddate - current);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        //date end
        console.log("diffdays=",diffDays);
        if(check!=="" && diffDays<=365)
        {
        var videoarray=[];
      for(i=1;i<=vidcounter;i++)
      {
        var videodata = await vidshield.methods.getVideoData(i).call();
        var creator = videodata.creator;
        console.log("vid creator=",creator);
        console.log("currcreator=",currcreator);
        if(creator==currcreator)
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
      youreligiblemovies.push(obj);
    }
    
    }


    this.setState({yourmovies:youreligiblemovies});
    
      
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
        <Header title="Viewer Dashboard" paragraph={this.state.account} isregistered={this.state.isregistered} blockstatus={this.state.blockstatus}/>
        <Features yourmovies={this.state.yourmovies} />
        </div>
        }
        
        
        
      </div>
     
      
        
    );
  }
}

export default ViewerPlatform;
