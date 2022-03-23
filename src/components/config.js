let config = {};
config.contract = {
    address: "0x2bf2E0203FDdc3cdab48091D4f0d4F47353486a6",
    abi : [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address payable",
            "name": "relayerAddress",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bytes",
            "name": "functionSignature",
            "type": "bytes"
          }
        ],
        "name": "MetaTransactionExecuted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "pirate",
            "type": "address"
          }
        ],
        "name": "PirateReported",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "videoId",
            "type": "uint256"
          }
        ],
        "name": "VideoRegistered",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "creator",
            "type": "address"
          }
        ],
        "name": "creatorRegisteredConfirm",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "viewer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "creator",
            "type": "address"
          }
        ],
        "name": "viewerSubscribedCreator",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "creatorssubscribed",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "functionSignature",
            "type": "bytes"
          },
          {
            "internalType": "bytes32",
            "name": "sigR",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "sigS",
            "type": "bytes32"
          },
          {
            "internalType": "uint8",
            "name": "sigV",
            "type": "uint8"
          }
        ],
        "name": "executeMetaTransaction",
        "outputs": [
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "getNonce",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "requestcounter",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "vidcounter",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "livepeerlink",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "thumbnail",
            "type": "string"
          }
        ],
        "name": "registerVideo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "creator",
            "type": "address"
          }
        ],
        "name": "registerCreator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getAllRegisteredCreators",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "getCountOfAllRegisteredCreators",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          }
        ],
        "name": "checkIfAlreadyCreator",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "viewer",
            "type": "address"
          }
        ],
        "name": "checkIfAlreadyViewer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "viewer",
            "type": "address"
          }
        ],
        "name": "registerViewer",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      },
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "viewer",
            "type": "address"
          },
          {
            "internalType": "address payable",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "subscriptionenddate",
            "type": "string"
          }
        ],
        "name": "subscribeCreator",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "viewer",
            "type": "address"
          }
        ],
        "name": "getCreatorsforViewer",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "viewer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          }
        ],
        "name": "unsubscribeCreator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getVideoData",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "livepeerlink",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "thumbnail",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "creator",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "date",
                "type": "string"
              }
            ],
            "internalType": "struct VidShield.Video",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "viewer",
            "type": "address"
          }
        ],
        "name": "getUserData",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "viewer",
                "type": "address"
              },
              {
                "internalType": "address[]",
                "name": "allcreatorsubscribed",
                "type": "address[]"
              },
              {
                "internalType": "bool",
                "name": "block",
                "type": "bool"
              }
            ],
            "internalType": "struct VidShield.User",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "reporter",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "movielink",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "pirate",
            "type": "address"
          }
        ],
        "name": "addReporter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "requestid",
            "type": "uint256"
          }
        ],
        "name": "cancelRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "pirate",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "requestid",
            "type": "uint256"
          }
        ],
        "name": "blockUser",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      }
    ]
}


module.exports = {config}
