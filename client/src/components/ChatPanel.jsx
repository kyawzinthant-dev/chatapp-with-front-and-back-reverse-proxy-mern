import React, { useEffect, useState, useRef } from 'react'
import "./Chat.css"
import Message from './Message';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages } from '../actions';
import FlipMove from 'react-flip-move';
import { v4 as uuidv4 } from 'uuid';
import { deleteMsgDb } from '../api';

function ChatPanel({ online, other, room, sendMsg,uid,arriveMessage}) {

  const messagestate = useSelector(state => state.message);
  const dispatch = useDispatch();
  const messages = messagestate || [];
  const [msgCount, setMsgCount] = useState(15);
  const [loading, setLoading] = useState("init");

  const [newmessages, setNewmessages] = useState([]);
  const [allmessages, setAllmessages] = useState([]);
  const [danimation, setDanimation] = useState(true);

  const inputRef = useRef(null);
  const guest = other[0] || {};
  const guestId = guest.id || 0;


  useEffect(()=>{
    setAllmessages([...newmessages, ...messages].reverse())
  },[messages, newmessages,arriveMessage])

  useEffect(()=>{

    if(arriveMessage.length > 0){
      setDanimation(false);
      setNewmessages([...arriveMessage,...newmessages])
    }
  },[arriveMessage])

  const deleteMsg = (index,uniqueid) => {
    deleteMsgDb(uniqueid);
    setDanimation(true);
    setAllmessages(allmessages.filter((e,i)=>i != index));
  }


  const sendMessage = () => {
    const uuid = uuidv4();
    setDanimation(false);
    setLoading('init');
    setNewmessages([{
      message: inputRef.current.value,
      from: uid,
      uuid
    }, ...newmessages])

    sendMsg(inputRef.current.value,guestId,uuid);

    inputRef.current.value = "";
    inputRef.current.focus();
  }

  useEffect(() => {
    dispatch(getMessages(room, msgCount));
  }, [msgCount])



  return (
    <div style={{ width: "100%" }}>
      <div className='chatpanel'>
        <div className='chatheader'>
          <div className='userimg'>
            <img
              className='uimg'
              src={guest.pic}
            />
          </div>
          <p className='username'>{guest.name}</p>
        </div>
        <div className='status'>
          <span className={online.includes(guestId) ? 'useronline':'useroffline'}></span>
          <span className='userstatus'>{online.includes(guestId) ? 'Online':'Offline'}</span>
        </div>

        {/* chat massages */}

        <Message setMsgCount={setMsgCount} loading={loading} setLoading={setLoading}>
          <FlipMove disableAllAnimations={danimation}>
            {allmessages.map((e, i) => {
              return <div key={i} className={e.from === guestId ? 'other' : 'self'}>
                <div key={i} className={e.from === guestId ? 'othermessage' : 'selfmessage'}>
                  {e.from !== guestId && <span className="deleteMsg" onClick={()=>deleteMsg(i,e.uuid)}>x</span>}
                  {e.message}
                </div>
              </div>
            })}
          </FlipMove>
        </Message>

        {/* chat messages end */}
      </div>
      <div className='inputbox'>
        <input ref={inputRef} className='messageinput' onKeyDown={(e) => {
          if (e.keyCode === 13) {
            sendMessage();
          }
        }} />
        <span className='sendbtn' onClick={sendMessage}>
          <li className='fa fa-send'></li>
        </span>
      </div>
    </div>
  )
}

export default ChatPanel
