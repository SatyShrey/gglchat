import { useContext, useEffect, useState } from "react"
import { Context } from "./Context";
import axios from "axios";
import io from "socket.io-client"


function Home(){

    const {setPage,url,lastUsers,setLastUsers,user,id,setUser,setUser2}=useContext(Context)
    io(url,{auth:{id:sessionStorage.getItem('id')}})
    const[search,setSearch]=useState('')
    const regExp=/^[a-zA-Z][a-zA-Z0-9._-]+@gmail.com$/;
    

    useEffect(()=>{
        axios.get(url+"users/"+id).then((data)=>{setUser(data.data)})
    },[])

    useEffect(()=>{
        axios.get(url+'userlist/'+id)
        .then(data=>setLastUsers(data.data))
        .catch(er=>alert(er))
        axios.put(url+'updateuser/'+id,{status:"online"})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[lastUsers])

    return(
        <div className="home">
            <form className="inputBar" onSubmit={(e)=>{
                e.preventDefault();
                axios.get(url+'userbyemail/'+search).then(data=>{
                    if(data.data){
                        setUser2({
                            id:data.data.id,
                            name:data.data.name,
                            pic:data.data.pic,
                            email:data.data.email
                        })
                        setPage('chat')
                    }
                    else{alert('This user is not using gglChat')}
                }).catch(er=>alert(er.message))
            }}>
                <input type="text" placeholder="search or enter gmail for chat" onChange={(e)=>{
                    setSearch(e.target.value.toLowerCase())
                }}/>
                {regExp.test(search) && <>{search===user.email?<p>This is your own email.</p>:<button type="submit">Chat with {search}</button>}</> }
            </form>

                <ol className="lastUsers">
                    {
                     lastUsers && lastUsers.map((data,index)=> 
                     <li key={index} onClick={()=>{setUser2(data);setPage('chat')}}>
                          <img src={data.pic} />
                          <p>{data.name}<i>{data.email}</i></p>
                    </li> )
                    }
                </ol>
        </div>
    )
}

export default Home
