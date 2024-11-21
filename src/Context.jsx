import { createContext, useEffect, useState } from "react";
import g from './googleicon.png'
import io from "socket.io-client"
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const Context=createContext('')

// eslint-disable-next-line react/prop-types
export function Provider({children}){
        const[page,setPage]=useState('login')
        const[lastUsers,setLastUsers]=useState()
        const [user,setUser]=useState({})
        const [user2,setUser2]=useState({})
        const[id,setId]=useState()
        const url="https://chatapp-vspu.onrender.com/";
        //const url="http://localhost:6060/"
        const [onlineUsers,setOnlineUsers]=useState([])
        const [MsgArray,setMsgArray]=useState([]);
        const [newMsgArray,setNewMsgArray]=useState([])

        
    useEffect(()=>{
        if(user){
           const socket=io(url,{auth:{id:user.id}})
              socket.on('connect',()=>{
              axios.put(url+"updatesocket/"+user.id,{sid:socket.id}).catch(er=>{alert(er.message)})
              socket.on('online-users',(data)=>{setOnlineUsers(data)})

               //receive msg from server
                socket.on('receive',(data)=>{
                setNewMsgArray((preMsg)=>[...preMsg,data])
                })
              //.........................
           })
        }
    },[user])

    return(
        <Context.Provider value={{MsgArray,setMsgArray,onlineUsers,id,setId,g,page,setPage,
        url,lastUsers,setLastUsers,setUser,user,user2,setUser2,newMsgArray,setNewMsgArray}}>
            {children}
        </Context.Provider>
    )
}
