import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "./Context";
import axios from "axios";


function ChatPage(){

    const{user,setPage,url,user2}=useContext(Context)
    const[newMsg,setNewMsg]=useState()
    const [oldMsgArray,setOldMsgArray]=useState([])
    const myRef=useRef()
    const[status,setStatus]=useState()

    useEffect(()=>{
        axios.get(`${url}chats/${user.uid}/${user2.uid}`)
        .then(data=>{if(data.data){setOldMsgArray(data.data)}})
        .then(()=>myRef.current.scrollIntoView({ behavior: "smooth" }))
        .catch(er=>alert(er.message))

        axios.get(url+"users/"+user2.uid).then(data=>setStatus(data.data.status))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[oldMsgArray])

    return(
        <div className="chatPage">
            <div className="user2"><img src={user2.photoURL} />{user2.displayName}{status==="online"?<span style={{color:"green"}}>{status}</span>:<span style={{color:"red"}}>{status}</span>}</div>
            <div className="chatContainer">
                {oldMsgArray && oldMsgArray.map((chat,index)=> <div key={index}>
                    {chat.p1==user.uid ? <pre className="p1">{chat.txt}</pre> : <pre className="p2">{chat.txt}</pre>}
                </div> )}

                <div ref={myRef} style={{ float: "left", height: "70px" }}></div>
            </div>
            <form className="chatInput" onSubmit={(e)=>{
                e.preventDefault();
                axios.post(url+'addchat',{p1:user.uid,p2:user2.uid,id:Date.now().toString(),txt:newMsg})
                .then(()=>{e.target.reset();setNewMsg('');myRef.current.scrollIntoView({ behavior: "smooth" })})
                .catch(er=>alert(er.message))
            }}> 
                <button onClick={()=>setPage('home')} type="reset">↩️</button>
                <textarea onChange={(e)=>{setNewMsg(e.target.value)}}></textarea>
                {newMsg?<button type="submit">➡️</button>:<button disabled>➡️</button>}
            </form>
        </div>
    )
}

export default ChatPage
