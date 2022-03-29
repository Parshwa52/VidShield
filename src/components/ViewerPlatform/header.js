//import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import VidShield from '../../abis/VidShield.json';
import '../../App.css';
import './Director.css';
import {Biconomy} from "@biconomy/mexa";
import Web3 from 'web3';
//import history from '../history';
import {Link} from 'react-router-dom';
import bickey from "../../keys.json";
let sigUtil = require("eth-sig-util");
const { config } = require("../config");


const domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "verifyingContract", type: "address" },
  { name: "salt", type: "bytes32" }
];
//{ name: "chainId", type: "uint256" },
const metaTransactionType = [
  { name: "nonce", type: "uint256" },
  { name: "from", type: "address" },
  { name: "functionSignature", type: "bytes" }
];

let domainData = {
  name: "VidShield",
  version: "1",
  verifyingContract: config.contract.address,
  salt: '0x' + (80001).toString(16).padStart(64, '0')
};

let web3,walletweb3;
let contract;
function Header(props) {

  const [selectedAddress, setSelectedAddress] = useState("");
  const [metaTxEnabled, setMetaTxEnabled] = useState(true);
  useEffect(() => {
    async function init() {
      if (
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isMetaMask
      ) {
        // Ethereum user detected. You can now use the provider.
        const provider = window["ethereum"];
        await provider.enable();
        if (provider.networkVersion === "80001") {
          domainData.chainId = 80001;
        const apikey = `${bickey.BICONOMY_DAPP_KEY}`;
        const biconomy = new Biconomy(provider,{apiKey: apikey, debug: true});
        web3 = new Web3(biconomy);
        walletweb3 = new Web3(provider);
        biconomy.onEvent(biconomy.READY, () => {
          console.log("Mexa is ready!");
          // Initialize your dapp here like getting user accounts etc
          contract = new web3.eth.Contract(
            config.contract.abi,
            config.contract.address
          );
          setSelectedAddress(provider.selectedAddress);
          
          provider.on("accountsChanged", function(accounts) {
            setSelectedAddress(accounts[0]);
          });
        }).onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa

        });
          
        } else {
          console.log("Please change the network in metamask to Polygon Mumbai");
        }
      } else {
        console.log("Metamask not installed");
      }
    }
    init();
  }, []);

  const registerViewer = async (event) => {
    event.preventDefault();
    if (contract) {
      if (metaTxEnabled) {
        console.log("Sending meta transaction");
        let userAddress = selectedAddress;
        let nonce = await contract.methods.getNonce(userAddress).call();
        
        let functionSignature = contract.methods.registerViewer(userAddress).encodeABI();
        let message = {};
        message.nonce = parseInt(nonce);
        message.from = userAddress;
        message.functionSignature = functionSignature;

        const dataToSign = JSON.stringify({
          types: {
            EIP712Domain: domainType,
            MetaTransaction: metaTransactionType
          },
          domain: domainData,
          primaryType: "MetaTransaction",
          message: message
        });
        //console.log(domainData);
        //console.log(userAddress);
        web3.eth.currentProvider.send(
          {
            jsonrpc: "2.0",
            id: 999999999999,
            method: "eth_signTypedData_v4",
            params: [userAddress, dataToSign]
          },
          function(error, response) {
            console.info(`User signature is ${response.result}`);
            if (error || (response && response.error)) {
              console.log("Could not get user signature");
            } else if (response && response.result) {
              let { r, s, v } = getSignatureParameters(response.result);
              // console.log(userAddress);
              // console.log(JSON.stringify(message));
              // console.log(message);
              // console.log(getSignatureParameters(response.result));

              const recovered = sigUtil.recoverTypedSignature_v4({
                data: JSON.parse(dataToSign),
                sig: response.result
              });
              console.log(`Recovered ${recovered}`);
              sendTransaction(userAddress, functionSignature, r, s, v);
            }
          }
        );
      } else {
        console.log("Sending normal transaction");
        contract.methods
          .registerViewer(selectedAddress)
          .send({ from: selectedAddress })
          .on("transactionHash", function(hash) {
            console.log(`Transaction sent to blockchain with hash ${hash}`);
          })
          .once("confirmation", function(confirmationNumber, receipt) {
            console.log("Transaction confirmed");
            
          });
      }
    } else {
      //console.log("");
    }
  };

  const getSignatureParameters = signature => {
    if (!web3.utils.isHexStrict(signature)) {
      throw new Error(
        'Given value "'.concat(signature, '" is not a valid hex string.')
      );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = web3.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    return {
      r: r,
      s: s,
      v: v
    };
  };

  

  const sendTransaction = async (userAddress, functionData, r, s, v) => {
    if (web3 && contract) {
      try {
        let gasLimit = await contract.methods
          .executeMetaTransaction(userAddress, functionData, r, s, v)
          .estimateGas({ from: userAddress });
        let gasPrice = await web3.eth.getGasPrice();
        // console.log(gasLimit);
        // console.log(gasPrice);
        let tx = contract.methods
          .executeMetaTransaction(userAddress, functionData, r, s, v)
          .send({
            from: userAddress,
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit)
          });

        tx.on("transactionHash", function(hash) {
          console.log(`Transaction hash is ${hash}`);
          console.log(`Transaction sent by relayer with hash ${hash}`);
        }).once("confirmation", function(confirmationNumber, receipt) {
          console.log(receipt);
          console.log("Transaction confirmed on chain");
          alert("You have successfully registered as viewer");
          document.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="Header">
    <header id="header">
        <div className="intro212">
          <div className="overlay2">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {props.title ? props.title : "Loading"}
                    <span></span>
                  </h1>
                  
                  
                    {props.isregistered ? 
                   
                  <div>
                  <Link to={{
                            pathname: '/allvideo',
                            
                          }} >
                  <input type="button" value="All Videos"
                    
                    className="btn btn-custom btn-lg page-scroll"
                  />
                    
                  
                          </Link>

                          {"  "}

                  <Link to={{
                            pathname: '/yournft',
                            
                          }} >
                  <input type="button" value="Your NFTs"
                    
                    className="btn btn-custom btn-lg page-scroll"
                  />
                    
                {" "}
                  </Link>

                  <Link to={{
                            pathname: '/allnft',
                            
                          }} >
                  <input type="button" value="All NFTs"
                    
                    className="btn btn-custom btn-lg page-scroll"
                  />
                    
                {" "}
                  </Link>

                  </div>
                  

                  
                  :
                  
                  <button
                    onClick={(event)=>registerViewer(event)}
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Register
                  </button>
                  
                
                
                        }
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </header>
      </div>
  );
}
export default Header;
