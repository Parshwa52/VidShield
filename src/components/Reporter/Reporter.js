import React, {
    Component
  } from 'react';
  import ReactDOM from 'react-dom';
  //import Select from 'react-select';
  import VidShield from '../../abis/VidShield.json';
  import Web3 from 'web3';
  import ReporterComp from './ReporterComp';
  
  import Navigation from './navigation';
  import Header1 from './header.js';
  

  
  var CryptoJS = require("crypto-js");
  export default class ReportCheck extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        totrequests:[],
        vidshield:null
      };
      this.blockpirate = this.blockpirate.bind(this);
      this.cancelRequest = this.cancelRequest.bind(this);
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
      //console.log("props",this.props.location.state.id);
      const web3=window.web3;
      const accounts=await web3.eth.getAccounts();
      //var paccount = accounts[0];
      //var oldaccount=this.state.account;
      this.setState({account:accounts[0]});
      window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        alert("account changed");
        this.setState({account:accounts[0]});
      }.bind(this));
  
      console.log(web3);
      console.log(accounts);
     // admin account
     if(this.state.account==="0x163613C90525DDf901383cdD32554b969285cea6")
     {
     const networkId=await web3.eth.net.getId();
      const networkdata=VidShield.networks[networkId];
      if(networkdata)
      {
        const vidshield=new web3.eth.Contract(VidShield.abi,networkdata.address);
        
        this.setState({vidshield});
        
        const requestcounter=await this.state.vidshield.methods.requestcounter().call();

        //const admin = await this.state.vidshield.methods.admin().call();
        var requestarray=[];
        for(var i=1;i<=requestcounter;i++)
        {
            const request=await this.state.vidshield.methods.getreporterrequest(i).call();
            console.log(request);
            if(request.fulfill===false)
            {
                var movieobj=new Object();
            movieobj.address=request.reporter;
            //var bytes  = CryptoJS.AES.decrypt(request.movielink, 'secret');
            //var originalText = bytes.toString(CryptoJS.enc.Utf8);
            movieobj.link=request.movielink;
            movieobj.requestid=i;
            requestarray.push(movieobj);
            }
        }
        this.setState({totrequests:requestarray});
      }
    }
    else
    {
      alert("Unauthorized Account");
      window.close();
    }
      
      
      
    }
    
    
    //handleClose = () => this.setState({ modalOpen: false })
    
    blockpirate=async(address)=>{
      try{
          await this.state.vidshield.methods.blockUser(address).send({from:this.state.account}).then(
            (result)=>{
              alert("Pirate Blocked");
            })
      }
      catch(err)
      {
        alert("Error while transaction. Please try again.")
      }
    }

    cancelRequest=async(requestid)=>{
      try{
        await this.state.vidshield.methods.cancelRequest(requestid).send({from:this.state.account}).then(
          (result)=>{
            alert("Request Cancelled");
          })
    }
    catch(err)
    {
      alert("Error while transaction. Please try again.")
    }
    }
   
  
    
    

    
      
    
    
    handleChange = (event, {
      name,
      value
    }) => {
      if (this.state.hasOwnProperty(name)) {
        this.setState({
          [name]: value
        });
      }
    }

    
    
    
  
    render() {
      return ( 
        <div>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<Navigation account ={this.state.account}/>
        <Header1 title="Check Requests" paragraph={this.state.account}/>
            
        <ReporterComp data={this.state.totrequests} blockpirate={this.blockpirate} cancelRequest={this.cancelRequest}/>
        </div>
      );
    }
  }