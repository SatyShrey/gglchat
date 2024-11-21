import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "./Context";
import axios from "axios";

function ChatPage(){
    const{user,setPage,url,user2,onlineUsers,MsgArray,setMsgArray,newMsgArray,setNewMsgArray}=useContext(Context)
    const[newMsg,setNewMsg]=useState()
    const [user2Sid,setUser2Sid]=useState()
    const myRef=useRef()

    useEffect(()=>{myRef.current.scrollIntoView({ behavior: "smooth" })},[newMsgArray])

    useEffect(()=>{
        axios.get(url+"users/"+user2.id).then(data=>{setUser2Sid(data.data.sid)})
        axios.get(url+"chats/"+user.id+"/"+user2.id).then(data=>{setMsgArray(data.data);myRef.current.scrollIntoView()})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div className="chatPage">
            <div className="user2"><img src={user2.pic} />{user2.name}
            {onlineUsers.includes(user2.id)?<span style={{color:"green"}}>online</span>:<span style={{color:"red"}}>offline</span>}</div>
            <div className="chatContainer">
                {MsgArray && MsgArray.map((chat,index)=> <div key={index}>
                    {chat.p1==user.id ? <pre className="p1">{chat.txt}</pre> : <pre className="p2">{chat.txt}</pre>}
                </div> )}

                {newMsgArray && newMsgArray.map((chat,index)=> <div key={index}>
                    {chat.p1==user.id ? <pre className="p1">{chat.txt}</pre> : <pre className="p2">{chat.txt}</pre>}
                </div> )}
                
                <div ref={myRef} style={{ float: "left", height: "70px" }}></div>
            </div>
            <form className="chatInput" onSubmit={(e)=>{
                e.preventDefault();
                
                //add new msg to container
                setNewMsgArray([...newMsgArray,{p1:user.id,p2:user2.id,txt:newMsg}])

                //add msg to database
                axios.post(url+'addchat/'+user2Sid,{p1:user.id,p2:user2.id,id:Date.now().toString(),txt:newMsg})
                .then(()=>{
                    e.target.reset();setNewMsg('');
                    myRef.current.scrollIntoView({ behavior: "smooth" })}).catch(er=>alert(er.message))
            }}> 
                <button onClick={()=>setPage('home')} type="reset">↩️</button>
                <textarea onChange={(e)=>{setNewMsg(e.target.value)}}></textarea>
                {newMsg?<button type="submit">➡️</button>:<button disabled>➡️</button>}
            </form>
        </div>
    )
}

export default ChatPage