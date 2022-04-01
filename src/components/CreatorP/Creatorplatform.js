import React,{Component} from 'react'
import { Icon, Image, Segment, Step,Message,Form,Input,Button } from 'semantic-ui-react'
import Web3 from 'web3';
import VidShield from '../../abis/VidShield.json';
import VideoNFT from '../../abis/VideoNFT.json';
import Navigation from './navigation';
import Header from './header.js';
import Features from './features';
import dotenv from 'dotenv';
//import '../../App';
var CryptoJS = require("crypto-js");
const axios = require('axios');
dotenv.config();


const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
export default class Creatorplatform extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id:0,
      title:"",
      desc:"",
      length:0,
      creatorname:"",
      vidshield:null,
      videonft:null,
      uploadfiledone:false,
      buffer:null,
      uploadurls:"",
      assetID:"",
      taskID:"",
      livepeeripfsvideourl:"",
      nftMetadataUrl:"",
      thumbnaillink:"",
      exportipfsdone:false,
      thumbnaildone:false,
      livepeerdone: false,
      filetoupload:null,
      binaryfile:null,
      nftcontractaddress:"",
      livepeerkey:""
    };
    //this.captureFile = this.captureFile.bind(this);
    //this.getFile = this.getFile.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadtoIPFS = this.uploadtoIPFS.bind(this);
    this.GetLivepeerIPFSURL = this.GetLivepeerIPFSURL.bind(this);
    this.captureVideoFile = this.captureVideoFile.bind(this);
    this.captureFile2 = this.captureFile2.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.mintNFT = this.mintNFT.bind(this);
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
    const networkdata_vidnft = VideoNFT.networks[networkId];
    this.setState({nftcontractaddress:networkdata_vidnft.address});
    if(networkdata)
    {
      const vidshield=new web3.eth.Contract(VidShield.abi,networkdata.address);
      const videonft = new web3.eth.Contract(VideoNFT.abi,networkdata_vidnft.address);
      //console.log("videonft=",videonft);
      await this.setState({videonft});
      
      await this.setState({vidshield});
      var vidcounter = await vidshield.methods.vidcounter().call();
      //console.log("vidcounter=",vidcounter);
      this.setState({id:vidcounter});
    }
    
    const livepeerkey = process.env.REACT_APP_LIVEPEER_API_KEY;
    this.setState({livepeerkey});
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

  upload=async(event)=>
  {
      event.preventDefault();
      //console.log(this.state.binaryfile);
      var context=this;
      try{
        var data = JSON.stringify({
            "name": this.state.title
          });
          
          var config = {
            method: 'post',
            url: 'https://livepeer.com/api/asset/request-upload',
            headers: { 
              'Authorization': `${this.state.livepeerkey}`, 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', 
              'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
            data : data
          };
          
          await axios(config)
          .then(function (response) {
            console.log({response});
            console.log(response.headers);
            response.headers["access-control-allow-origin"]="*";
            console.log("after=",response.headers);
            //console.log(JSON.stringify(response.data));
            //uploadUrl = JSON.stringify(response.data).url;
            context.setState({uploadurls:response.data.url,assetID:response.data.asset.id});
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }catch(error) {
        return [];
    }
    //await console.log("UploadURL=",this.state.uploadurls);
    //await console.log("AssetID=",this.state.assetID);

    //Put asset to given Livepeer URL
    var data2 = this.state.binaryfile;

    var config2 = {
    method: 'put',
    url: this.state.uploadurls,
    headers: { 
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    },
    data : data2
    };

    await axios(config2)
    .then(function (response) {
      response.headers["access-control-allow-origin"]="*";
        //console.log("SUCCESS");
    //console.log(JSON.stringify(response.data));
    alert("Video Processing done and uploaded");
    })
    .catch(function (error) {
    console.log(error);
    });

    await this.setState({uploadfiledone:true});

    
  }

  uploadtoIPFS=async(event)=>
  {
      event.preventDefault();
      var context =  this;
    var data3 = JSON.stringify(
        {
        "ipfs": 
        {

        }
      });
      
      var makeurl = `https://livepeer.com/api/asset/${this.state.assetID}/export`;
      var config3 = {
        method: 'post',
        url: makeurl,
        headers: { 
            'Authorization': `${this.state.livepeerkey}`, 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
              },
        data : data3
      };
      
      await axios(config3)
      .then(function (response) {
          //console.log("EXPORT SUCCESS");
        //console.log("Export response",JSON.stringify(response.data));
        response.headers["access-control-allow-origin"]="*";
        context.setState({taskID:response.data.task.id});
        alert("Video exported to IPFS storage");
      })
      .catch(function (error) {
        console.log(error);
      });

      //await console.log("TaskID",this.state.taskID);
      await this.setState({exportipfsdone:true});

      
      
     

  }

  GetLivepeerIPFSURL=async(event)=>{
    event.preventDefault();
  
  var context =  this;
  var config4 = {
      method: 'get',
      url: `https://livepeer.com/api/task/${this.state.taskID}`,
      headers: { 
        'Authorization': `${this.state.livepeerkey}`,
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
    };
    
    await axios(config4)
    .then(function (response) {
      response.headers["access-control-allow-origin"]="*";
      //console.log(JSON.stringify(response.data));
      context.setState({livepeeripfsvideourl:response.data.output.export.ipfs.videoFileGatewayUrl,
      nftMetadataUrl:response.data.output.export.ipfs.nftMetadataUrl });
      alert("Video successfully onboarded to Livepeer platform");
    })
    .catch(function (error) {
      console.log(error);
    });
    //await console.log("livepeeripfsvideourl",this.state.livepeeripfsvideourl);
    //await console.log("nftmetadaturl=",this.state.nftMetadataUrl);
    await this.setState({livepeerdone:true});

    var finalthumbnaillink = `https://ipfs.io/ipfs/${this.state.thumbnaillink}`;
    //Date

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var cipherlink = CryptoJS.AES.encrypt(this.state.livepeeripfsvideourl.toString(), 'secret').toString();
    this.setState({livepeeripfsvideourl:cipherlink});
    today = dd + '/' + mm + '/' + yyyy;
    // console.log("title=",this.state.title);
    // console.log("LivepeerIPFSURL=",this.state.livepeeripfsvideourl);
    // console.log("creator=",this.state.account);
    // console.log("date uploaded=",today.toString());
    // console.log("final thumbnail link=",finalthumbnaillink.toString());
    try{
    await this.state.vidshield.methods.registerVideo(this.state.title.toString(),this.state.livepeeripfsvideourl.toString(),this.state.account,today.toString(),finalthumbnaillink).send({
      from: this.state.account
    }).then((result)=>{
      
        alert("You have successfully uploaded the video");
      
    });
  }
  catch(err)
  {
    alert("Some unexpected error took place. Have patience and restart application");
  }
  

}

mintNFT=async(event)=>{
  event.preventDefault();
  try{
  //console.log("nftmurl=",this.state.nftMetadataUrl);
  //const nonce = await window.web3.eth.getTransactionCount(this.state.account, 'latest');
  await this.state.videonft.methods.mintNFT(this.state.account,this.state.nftMetadataUrl).send({'from':this.state.account})
  .then((result)=>{
        alert("You have successfully minted your video NFT");
    });
  }
  catch(err)
  {
    alert("Some unexpected error took place. Have patience and restart application");
  }

}


  captureVideoFile=async(event)=>{
  
  event.preventDefault();
  const file=event.target.files[0];
  await this.setState({filetoupload:file});
  var blob = new Blob([file],{"type" : "video\/mp4"});
  this.setState({binaryfile:blob});
  
  
}

captureFile2=event=>{
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

uploadImage=(event)=>{
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
      alert("Your thumbnail is successfully uploaded");
      this.setState({thumbnaillink:result[0].hash,thumbnaildone:true});
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
        <Header title="Upload Video" paragraph={this.state.account}/>

    <Segment attached>
    <Segment color = "grey" size='large'>
        <
        Message attached header = 'Welcome to VidShield'
        content = "Enter your video details. Please follow steps serially for smooth upload"
        icon = "searchengin"
        color = 'black' /
        ><br/>
        <Step.Group attached='top'>
      <Step active>
        <Icon name={this.state.binaryfile!==""?'thumbs up':'truck'} />
        <Step.Content>
          <Step.Title>File Upload</Step.Title>
          <Step.Description>Upload your video file</Step.Description>
        </Step.Content>
      </Step>

      <Step active>
        <Icon name={this.state.uploadfiledone?'thumbs up':'payment'} />
        <Step.Content>
          <Step.Title>Make file an asset</Step.Title>
          <Step.Description>Get upload done</Step.Description>
        </Step.Content>
      </Step>
      <Step active>
        <Icon name={this.state.exportipfsdone?'thumbs up':'save outline'} />
        <Step.Content>
          <Step.Title>Export to IPFS</Step.Title>
          <Step.Description>Send to IPFS</Step.Description>
        </Step.Content>
      </Step>

      <Step active>
        <Icon name={this.state.livepeerdone?'thumbs up':'info'} />
        <Step.Content>
          <Step.Title>Get Livepeer Link</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
        <
        Form>
        <
        br / >
  
  
        
        <h3><font color="black">Video ID</font></h3><br/>
        <Form.Field>
        <
        Input label="Video ID" disabled
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
        
        <h3><font color="black">Video File</font></h3>
        <form>
       <input type="file" onChange={this.captureVideoFile}/>
       <br/>
       

       </form>
        

       <h3><font color="black">Video Title</font></h3><br/>
       <
        Form.Field >
        <
        Input label="Video Title"
        fluid ref = {
          (input) => {
            this.title = input;
          }
        }
        //  labelPosition=""
        value = {
          this.state.title
        }
        onChange = {
          event => this.setState({
            title: event.target.value
          })
        }
  
        
        /> 
        
        </Form.Field>

        <h3><font color="black">Video Description</font></h3><br/>

        <
        Form.Field >
        <
        Input label="Video Description"
        fluid ref = {
          (input) => {
            this.desc = input;
          }
        }
        //  labelPosition=""
        value = {
          this.state.desc
        }
        onChange = {
          event => this.setState({
            desc: event.target.value
          })
        }
  
        
        /> 
        
        </Form.Field>
        
       <Button color="blue" size='large' disabled={this.state.uploadfiledone} onClick={this.upload}>Upload File</Button>
        <br/>
        <h3><font color="black">Video Length(in mins)</font></h3><br/>
          <
          Form.Field >
          <
          Input label = "Video length(in mins)"
          fluid ref = {
            (input) => {
              this.length = input;
            }
          }
          //  labelPosition=""
          value = {
            this.state.length
          }
          onChange = {
            event => this.setState({
              length: event.target.value
            })
          }


          /> 

          </Form.Field>

<Button color="blue" size='large' disabled={this.state.exportipfsdone} onClick={this.uploadtoIPFS}>Export to IPFS</Button>
      <br/>
      <h3><font color="black">Upload thumbnail</font></h3><br/>

        <form>
        <input type="file" onChange={this.captureFile2}/>
        
        </form>
        <Button color="blue" size='large' disabled={this.state.thumbnaildone} onClick={this.uploadImage}>Upload Thumbnail</Button>

        <h3><font color="black">Creator Name</font></h3><br/>
        <
        Form.Field >
        <
        Input label = "Creator Name"
        fluid ref = {
          (input) => {
            this.creatorname = input;
          }
        }
        //  labelPosition=""
        value = {
          this.state.creatorname
        }
        onChange = {
          event => this.setState({
            creatorname: event.target.value
          })
        }


        /> 

        </Form.Field>


        <Button color="green" size='large' disabled={this.state.livepeerdone} onClick={this.GetLivepeerIPFSURL}>Submit to Livepeer</Button>

        <Button color="yellow" size='large' onClick={this.mintNFT}>Mint NFT</Button>

        <br/>
        <br/>
        
        
        



        
        
        
        </Form> 
        </Segment>
    </Segment>

    
      </div>
    );
  }
}



