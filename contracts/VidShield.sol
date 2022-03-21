// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./EIP712MetaTransaction.sol";

contract VidShield is EIP712MetaTransaction("VidShield","1")
{
    struct Video
    {
        uint id;
        string livepeerlink;
        string thumbnail;
        string title;
        address creator;
        string date;
    }

    struct User
    {
        address viewer;
        address[] allcreatorsubscribed;
        bool block;
    }
    mapping (address=>mapping(address=>string)) public creatorssubscribed;

    mapping(address=>User) userdata;

    mapping(uint=>Video) creatorvideos;
    address[] registeredCreatorslist;
    //uint public registeredCreators=0;
    mapping(address=>bool) creatorpresence;

    mapping(address=>bool) viewerpresence;
    
    struct Request
    {
        address reporter;
        address pirate;
        string movielink;
        bool fulfill;
    }
    uint public requestcounter=0;
    mapping(uint=>Request) reporterrequests;
    
    event VideoRegistered(uint videoId);
    event creatorRegisteredConfirm(address creator);
    event viewerSubscribedCreator(address viewer,address creator);
    event PirateReported(address pirate);

    uint public vidcounter=0;
    address payable admin;
    constructor()
    {
        admin = payable(msg.sender);
    }
    function registerVideo(string memory title, string memory livepeerlink,address payable creator,string memory date,string memory thumbnail)public
    {
        require(creatorpresence[creator]==true);
        Video memory vid;
        vidcounter+=1;
        vid.id = vidcounter;
        vid.title = title;
        vid.livepeerlink = livepeerlink;
        vid.thumbnail = thumbnail;
        vid.creator = creator;
        vid.date = date;
        creatorvideos[vid.id] = vid; 
        emit VideoRegistered(vid.id);
    }

    function registerCreator(address payable creator)public
    {
        require(creatorpresence[creator]==false);
        registeredCreatorslist.push(creator);
        creatorpresence[creator] = true;
        emit creatorRegisteredConfirm(creator);
    }

    function getAllRegisteredCreators() public view returns(address[] memory)
    {
        return registeredCreatorslist;
    }

    function getCountOfAllRegisteredCreators()public view returns(uint)
    {
        return registeredCreatorslist.length;
    }

    function checkIfAlreadyCreator(address creator)public view returns(bool)
    {
        return creatorpresence[creator];
    }

    function checkIfAlreadyViewer(address viewer)public view returns(bool)
    {
        return viewerpresence[viewer];
    }

    function registerViewer(address payable viewer)public payable
    {
        require(viewerpresence[viewer]==false);
        viewerpresence[viewer] = true;
        payable(admin).transfer(msg.value);
    }

    function subscribeCreator(address payable viewer,address payable creator,string memory subscriptionenddate)public payable
    {
        User storage getdata= userdata[viewer];
        address[] storage allcreators = getdata.allcreatorsubscribed;
        allcreators.push(creator);
        User memory user=User(viewer,allcreators,false);
        uint payToAdmin = (msg.value)/5;
        uint payToCreator = (msg.value*4)/5;
        payable(admin).transfer(payToAdmin);
        payable(creator).transfer(payToCreator);
        //user.viewer = viewer;
        //user.allcreatorsubscribed.push(creator);
        //user.creatorssubscribed[creator]=subscriptionenddate;
        creatorssubscribed[viewer][creator]=subscriptionenddate;
        userdata[viewer] = user;
        emit viewerSubscribedCreator(viewer,creator);
    }

    function getCreatorsforViewer(address viewer)public view returns(address[] memory)
    {
        return userdata[viewer].allcreatorsubscribed;
    }

    function unsubscribeCreator(address viewer,address creator)public
    {
        User storage user = userdata[viewer];
        creatorssubscribed[viewer][creator] = "NA";
        userdata[viewer] = user;
    }

    function getVideoData(uint id) public view returns(Video memory)
    {
        return creatorvideos[id];
    }

    function getUserData(address viewer) public view returns(User memory)
    {
        return userdata[viewer];
    }

    function addReporter(address reporter,string memory movielink,address pirate)public
    {
        //address[] storage array=reporters[id];
        //array.push(reporter);
        //reporters[id]=array;
        Request memory r;
        r.reporter=reporter;
        r.pirate = pirate;
        //r.id=id;
        r.movielink=movielink;
        r.fulfill=false;
        
        requestcounter++;
        reporterrequests[requestcounter]=r;
    }
   
    function cancelRequest(uint requestid)public
    {
        Request memory req=reporterrequests[requestid];
        req.fulfill=true;
        reporterrequests[requestid] = req;
    }

    function blockUser(address pirate,uint requestid)public
    {
        User memory data = userdata[pirate];
        data.block=true;
        userdata[pirate]=data;
        Request memory req=reporterrequests[requestid];
        req.fulfill=true;
        reporterrequests[requestid] = req;
        emit PirateReported(pirate);
    }
}