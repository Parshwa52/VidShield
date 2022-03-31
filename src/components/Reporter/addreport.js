import React,{Component} from 'react'
import { Icon, Image, Segment, Step,Message,Form,Input,Button } from 'semantic-ui-react'
import Web3 from 'web3';
import VidShield from '../../abis/VidShield.json';
import VideoNFT from '../../abis/VideoNFT.json';
import Navigation from './navigation';
import Header from './header.js';
import Features from './features';
//import '../../App';


const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
export default class Reporter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        id:0,
      vidshield:null,
      ipfshash:"",
      buffer:null,
      pirateaddress:""
    };
    //this.captureFile = this.captureFile.bind(this);
    //this.getFile = this.getFile.bind(this);
    
    this.captureVideoFile = this.captureVideoFile.bind(this);
    this.submitreport = this.submitreport.bind(this);
    this.uploadVideo = this.uploadVideo.bind(this);
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

    //console.log(web3);
    //console.log(accounts);
   // 
   const networkId=await web3.eth.net.getId();
    const networkdata=VidShield.networks[networkId];
    
    
    if(networkdata)
    {
      const vidshield=new web3.eth.Contract(VidShield.abi,networkdata.address);
      await this.setState({vidshield});
      var requestcounter = await vidshield.methods.requestcounter().call();
      //console.log("req count=",requestcounter);
      this.setState({id:requestcounter});
    }
    
  }

  submitreport = async(event)=>{
      event.preventDefault();
      try
      {
      const videolink = `https://ipfs.io/ipfs/${this.state.ipfshash}`;
        //console.log(videolink);
        
        //console.log(this.state.pirateaddress);
      await this.state.vidshield.methods.addReporter(this.state.account,videolink.toString(),this.state.pirateaddress).send({from: this.state.account}).then((result)=>{
          alert("Your report is filed");
      });
    }
    catch(err)
    {
        alert("Error in uploading file. Please try again");
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

  

  

  




 

captureVideoFile=event=>{
  //alert("hellooooooo");
event.preventDefault();
const file=event.target.files[0];
const reader=new window.FileReader();
reader.readAsArrayBuffer(file);

reader.onloadend=()=>{
  this.setState({buffer:Buffer(reader.result)});
  //console.log("buffer",this.state.buffer);
}
}

uploadVideo=(event)=>{
  event.preventDefault();

  //alert("hellooooooo");
  console.log("Submitting file to IPFS...");

  //console.log(this.state.buffer);

  ipfs.add(this.state.buffer,(error,result)=>{
    if(error)
    {
        alert("Error in uploading");
    }
    else
    {
      //console.log("ipfs hash",result);
      
      this.setState({ipfshash:result[0].hash});
        alert("File Uploaded Successfully to Filecoin storage");
    }
  })
}
  
  

  render() {
    return ( 
      <div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<Navigation account ={this.state.account}/>
        <Header title="Report File" paragraph={this.state.account}/>

    <Segment attached>
    <Segment color = "grey" size='large'>
        <
        Message attached header = 'Welcome to VidShield Reporting platform'
        content = "Enter your pirated video details. Upload short clip of pirated video file"
        icon = "searchengin"
        color = 'black' /
        ><br/>
        
        <
        Form>
        <
        br / >
        <h3><font color="black">Request ID</font></h3><br/>
        <Form.Field>
        <
        Input label="Request ID" disabled
        fluid ref = {
          (input) => {
            this.id = input;
          }
        }
        //  labelPosition=""
        value = {
          this.state.id
        }
        onChange = {
          event => this.setState({
            id: event.target.value
          })
        }
  
        
        /> 
        
        </Form.Field>
 
  
        
        
        
        <h3><font color="black">Pirated Video File</font></h3>
        <form>
       <input type="file" onChange={this.captureVideoFile}/>
       <br/>
       

       </form>
        

       <Button color="green" size='large' onClick={this.uploadVideo}>Upload Video</Button>
        <h3><font color="black">Pirate Address</font></h3><br/>

        <
        Form.Field >
        <
        Input label="Pirate Address"
        fluid ref = {
          (input) => {
            this.pirateaddress = input;
          }
        }
        //  labelPosition=""
        value = {
          this.state.pirateaddress
        }
        onChange = {
          event => this.setState({
            pirateaddress: event.target.value
          })
        }
  
        
        /> 
        
        </Form.Field>
        
       
        


        

        <br/>
        <br/>
        
        <Button color="blue" size='large' onClick={this.submitreport}>Submit</Button>
        



        
        
        
        </Form> 
        </Segment>
    </Segment>

    
      </div>
    );
  }
}



