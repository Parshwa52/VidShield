


import VidShield from '../../abis/VidShield.json';
import VideoNFT from '../../abis/VideoNFT.json';
import React, { Component } from 'react';
import Navigation from './navigation';
import Header from './header2.js';
import Features from './features';
import axios from 'axios';
import keys from '../../keys.json';
import Web3 from 'web3';
import { BrowserRouter as Router } from 'react-router-dom';

import '../../App';
class allnft extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      nftarray:[],
      isregistered:false
      
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
    const nwdata_videonft = VideoNFT.networks[networkId];
    //console.log(networkdata);
    if(networkdata)
    {
      const vidshield=new web3.eth.Contract(VidShield.abi,networkdata.address);
//
      const videonft = new web3.eth.Contract(VideoNFT.abi,nwdata_videonft.address);

      const totalNFTsforContract = await videonft.methods._tokenIds().call();
      //const totalNFTsforContract = 1;
      //const {id}=this.props.id.state;
      //console.log("acc=",id);
      //const balance = await videonft.methods.balanceOf("0x1E0745195BCcf063eBDAfB44731FaAD1e30b160C").call();
      //alert(balance);

      var context =  this;
      var i;
      const apiKey = keys.ALCHEMY_NFT_API_KEY;
      const baseURL = `https://polygon-mumbai.g.alchemy.com/${apiKey}/v1/getNFTMetadata`;
      
      const contractAddr = nwdata_videonft.address;
      const tokenType = "erc721";
      var tokenId;
      var nftarray=[]
      for(i=1;i<=totalNFTsforContract;i++)
      {
          tokenId = i.toString();
          var config = {
            method: 'get',
            url: `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}&tokenType=${tokenType}`,
            headers: { }
          };
          await axios(config)
          .then(function(response){
            var nftObj = new Object();
            var nftcontract = response.data.contract.address;
          var tokenID= response.data.id.tokenId;
          var tokenInteger = parseInt(tokenID.toString(),16);
          var title = response.data.title;
          var thumbnailimg = response.data.metadata.image;
          thumbnailimg = thumbnailimg.replace("ipfs://","");
          var thumbnaillink = `https://ipfs.io/ipfs/${thumbnailimg}`;
          var clickablelink = `https://testnets.opensea.io/assets/${nftcontract}/${tokenInteger}`;
          console.log(nftcontract);
          console.log(tokenID);
          console.log(tokenInteger);
          console.log(title);
          console.log(thumbnailimg);
          console.log(thumbnaillink);
          console.log(clickablelink);
          nftObj.tokenInteger = tokenInteger;
          nftObj.title = title;
          nftObj.thumbnaillink = thumbnaillink;
          nftObj.clickablelink = clickablelink; 
          nftarray.push(nftObj);
          })
          .catch(error => console.log(error));
      }
      context.setState({nftarray});
      await console.log("nftarray=",this.state.nftarray);
      
  
    
    

      
    }
    
    
  }
  

  render() {
    return (
     
      <div>
        
        
        <Navigation account ={this.state.account}/>
        <Header title="Your NFTs"/>
        <Features data={this.state.nftarray} />
        
        
        
      </div>
     
      
        
    );
  }
}

export default allnft;
