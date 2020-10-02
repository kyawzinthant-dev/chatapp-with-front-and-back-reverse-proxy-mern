import React, { useState, useEffect} from "react";
import "./Chat.css";
import ChatPanel from './ChatPanel';
import {useLocation,Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {getUser, getContacts, getAllusers, getRequest, getResponse} from '../actions';
import io from "socket.io-client";
import {acceptReq, denyReq, doReq} from '../api';

function Chat() {
  const search = useLocation().search;
  const room = new URLSearchParams(search).get('room');


  const [sidebar, setSidebar] = useState("");
  const userstate = useSelector(state => state.auth);
  const contactstate = useSelector(state => state.contact);
  const allstate = useSelector(state => state.all);
  const reqstate = useSelector(state => state.req);
  const resstate = useSelector(state => state.res);

  const dispatch = useDispatch();

  const [user,setUser] = useState({});
  const [contacts,setContacts] = useState([]);
  const [all,setAll] = useState([]);
  const [req,setReq] = useState([]);
  const [res,setRes] = useState([]);

  useEffect(()=>{
      if(userstate)
      setUser(userstate[0])
      if(contactstate)
      setContacts(contactstate)
      if(allstate)
      setAll(allstate)
      if(reqstate)
      setReq(reqstate)
      if(resstate)
      setRes(resstate)
  },[userstate,contactstate,allstate,reqstate,resstate])

  const [online, setOnline]= useState([]);

  const ENDPOINT = "/";
  const ENDPOINT2 = "/online";

  const socket2 = io(ENDPOINT);

  const [arriveMessage,setArriveMessage] = useState([]);

  const [searchinput, setSearchinput] = useState('');
  const [searchResult, setSearchResult] = useState([]);



  useEffect(()=>{
    function setsearch(){
        setSearchResult([]);
    }
    if(searchResult.length !=0){
    window.addEventListener('click',setsearch)
    }
    return () => window.removeEventListener('click',setsearch)
  },[searchResult])
  useEffect(()=>{
    const result = all.filter(e=>{
      return e.name.toLowerCase().includes(searchinput);
    });
    setSearchResult(result);
    if(!searchinput)
    setSearchResult([]);

  },[searchinput])
  useEffect(()=>{
  
    if(contacts.length != 0){

      socket2.on('arrivemessage', message => {
        if (message.uid != user._id) {
          setArriveMessage([{
            message: message.message,
            from: message.uid
          }])
        }
      });
   
    contacts.map((e)=>{
      socket2.emit('join',{
        uid:user._id,
        room:e.room
      })
    })
  }
  },[contacts])
  
  const sendMsg = (value, guestId,uuid) => {
    if (value) {
      socket2.emit('sendMessage', {
        uid:user._id,
        message: value,
        to: guestId,
        uuid
      }); 
    }
  }

  useEffect(()=>{
    if(user._id){
    let socket = io(ENDPOINT2);
    socket.emit('join',{uid:user._id});
    socket.on('updateOnline',data=>{
      var onlineArr = data.map(e=>e.uid)
      setOnline(onlineArr);
    })
    }
  },[user._id])
  
  useEffect(()=>{
    dispatch(getUser());
    dispatch(getContacts());
    dispatch(getAllusers());
    dispatch(getRequest());
    dispatch(getResponse());

  },[dispatch])

  const acceptRequest = (event) => {
    if(event.target){
    const userid = event.target.id.substring(1);
    acceptReq(userid).then(()=>{
      dispatch(getContacts());
    });
    window.location.reload();
    }
  }

  const denyRequest = (event) => {
    
    if(event.target){
      const userid = event.target.id.substring(1);
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    denyReq(userid).then(()=>{

    });
    window.location.reload();
  }
 
  }
  const doRequest = (event) => {
      const userid = event.target.id.substring(1);
      doReq(userid).then(()=>{
        setSearchResult([]);
      });
      window.location.reload();
  }


  return (
    <>
      <div className='wrapper d-flex align-items-stretch'>
        <nav id='sidebar' className={sidebar}>
          <div className='custom-menu'>
            <button
              type='button'
              id='sidebarCollapse'
              className='btn btn-primary'
              onClick={() => (sidebar ? setSidebar("") : setSidebar("active"))}>
              <i
                className='fa fa-outdent'
                aria-hidden='true'
                style={{ marginTop: "5px" }}></i>
              <span className='sr-only'>Toggle Menu</span>
            </button>
          </div>
          <div className='p-4 pt-5'>
            <h1>
              <a className='logo'>
                MyChat
              </a>
            </h1>
            <ul className='list-unstyled components mb-5'>
              <li><img style={{width:'30px',borderRadius:'50%',marginRight:'20px'}} src={user.pic}/>{user.name}</li>
              <hr style={{ backgroundColor: "white" }} />
              <li>Contact Lists</li>
              {contacts.map((e,i)=>{
                return <Link key={i}  to={`/chat?room=${e.room}`}><li className='users'>
                <span className={online.includes(e.id) ? 'connect':'disconnect'}></span>{e.name}
              </li></Link>
              })}
              
              <hr style={{ backgroundColor: "white" }} />
              {res.length > 0 && <><li>To Response</li>
                {
                  res.map((e,i)=>{
                    return <li key={i} className="rusers"><img src={e.pic}/><span>{e.name}</span><i id={`a${e.id}`} title="Accept" className="fa fa-comment" onClick={acceptRequest}></i><i id={`d${e.id}`} title="Deny" className="fa fa-minus-square" onClick={denyRequest}></i></li>
                  })
                }

              <hr style={{ backgroundColor: "white" }} /></>}
              

              {req.length > 0 && <><li>Request Lists</li>

                {
                  req.map((e,i)=>{
                    return <li key={i} className="rusers"><img src={e.pic}/><span>{e.name}</span></li>
                  })
                }

              <hr style={{ backgroundColor: "white" }} /></>}

              <li>Search Users</li>
              <input
                className='search form-control'
                style={{ color: "white" }}
                value={searchinput}
                onChange={(e)=>setSearchinput(e.target.value)}
              />
              <div className="searchResult">
                {searchResult.map((e,i)=>{
                  return <li key={i} onClick={(event)=>{
                    event.stopPropagation();
                  }}><img src={e.pic}/>{e.name}<i id={`z${e._id}`} onClick={doRequest}  title="Request" className="fa fa-commenting" aria-hidden="true"></i></li>
                })}
              </div>
              <li className='logout'>Log out</li>
            </ul>
          </div>
        </nav>
        {room && <ChatPanel online={online} arriveMessage={arriveMessage} sendMsg={sendMsg} room={room} other={contacts.filter(contact=>contact.room === room)} uid={user._id}/>}
      </div>
    </>
  );
}

export default Chat;
