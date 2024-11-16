import { useContext, useEffect} from "react"
import { Context } from "./Context"
import LoginPage from "./LoginPage"
import Header from "./Header"
import Home from "./Home"
import ChatPage from "./ChatPage"


function App() {
  
  const{id,page,setId}=useContext(Context)

  useEffect(()=>{
    setId(sessionStorage.getItem('id'))
  },[setId])

  return(
    <div className="app">
      {page!='chat' && <Header/>}
      {
      id ?
      <>
        {page==="home" && <Home/>}
        {page==='chat' && <ChatPage/>}
      </>
      :<LoginPage/>
      }
    </div>
  )
}

export default App
