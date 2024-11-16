import { useContext } from "react"
import { Context } from "./Context"

function Header(){

    const{user,g}=useContext(Context)

    return(
        <header>
            <h2>GglChats</h2>{user && <><img src={user.photoURL || g} alt="profile-pic" /><p>{user.displayName}</p></>}
        </header>
    )
}

export default Header