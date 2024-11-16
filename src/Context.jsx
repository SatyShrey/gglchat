import { createContext, useState } from "react";
import g from './googleicon.png'

// eslint-disable-next-line react-refresh/only-export-components
export const Context=createContext('')

// eslint-disable-next-line react/prop-types
export function Provider({children}){
        const[page,setPage]=useState('home')
        const[lastUsers,setLastUsers]=useState()
        const [user,setUser]=useState({})
        const [user2,setUser2]=useState({})
        const[id,setId]=useState()
        const url="https://chatapp-vspu.onrender.com/";

    return(
        <Context.Provider value={{id,setId,g,page,setPage,url,lastUsers,setLastUsers,setUser,user,user2,setUser2}}>
            {children}
        </Context.Provider>
    )
}