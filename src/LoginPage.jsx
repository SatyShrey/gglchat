import { useContext } from "react"
import { Context } from "./Context"

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import axios from "axios";

function LoginPage() {

    const firebaseConfig = {
        apiKey: "AIzaSyDQxve9EL2hSOdmZh-A7dXmazwi-MbZhVU",
        authDomain: "goldywebzone.firebaseapp.com",
        databaseURL: "https://goldywebzone-default-rtdb.firebaseio.com",
        projectId: "goldywebzone",
        storageBucket: "goldywebzone.firebasestorage.app",
        messagingSenderId: "462971610645",
        appId: "1:462971610645:web:68f7b407853c203901101c"
    };

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider()
    const { url,g,setPage} = useContext(Context)

    function login() {
        try{
            signInWithPopup(auth, provider)
            .then((result) => {
                sessionStorage.setItem('id',result.user.uid);
                const user=result.user;
                const newUser={id:user.uid,pic:user.photoURL,email:user.email,status:"online",name:user.displayName}
                axios.put(url+"updateuser/"+user.uid,newUser).then(data=>{
                    if(data.data.modifiedCount===0){
                        axios.post(url+"setuser",newUser).catch((error) => { console.log(error) })
                    }
                })
            }).then(()=>setPage('home'))
            .catch((error) => { console.log(error) });
        }catch(error){console.log(error)}
    }

    return (
        <div className="loginPage">
            <button onClick={login}>
                <img src={g} alt="icon" />
                Login with Google
            </button>
        </div>
    )
}

export default LoginPage