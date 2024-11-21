import { useContext, useEffect} from "react"
import { Context } from "./Context"
import LoginPage from "./LoginPage"
import Header from "./Header"
import Home from "./Home"
import ChatPage from "./ChatPage"


function App() {
  
  const{page,setPage}=useContext(Context)

  useEffect(()=>{
    if(sessionStorage.getItem('id')){
        setPage("home")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <div className="app">
      {page!='chat' && <Header/>}
      {page=="login" && <LoginPage/>}
      {page==="home" && <Home/>}
      {page==='chat' && <ChatPage/>}
    </div>
  )
}

export default App
