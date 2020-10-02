import React,{useEffect,useState, useRef} from 'react'
import "./Chat.css";

function Message({children,setMsgCount,loading,setLoading}) {
    const messageStartRef = useRef('');
    const messageEndRef = useRef('');
  

    const callMsg = (e) => {
        setMsgCount(prev=>prev*2)
        messageStartRef.current.style.opacity = '1';
        e.target.scrollTop = 1
        setLoading("top")
    }
    useEffect(()=>{
        if(loading === 'init'){
            messageEndRef.current.scrollIntoView();
            messageStartRef.current.style.opacity = "0";
        }
        else if(loading === "loading")
        messageStartRef.current.style.opacity = "1";
        else
        messageStartRef.current.style.opacity = "0";
     },[children,loading])


    return (
        
        <div id="message-wrapper" onScroll={(e)=>{
            if(e.target.scrollTop === 0){
            setLoading("loading");
            callMsg(e);
            }
        }}> 
            <div id='messages'>
                <div className="loader" ref={messageStartRef}></div>
                {children}
                <div style={{opacity:'0'}} ref={messageEndRef}>hello</div>
            </div>

        </div>
    )
}

export default Message
