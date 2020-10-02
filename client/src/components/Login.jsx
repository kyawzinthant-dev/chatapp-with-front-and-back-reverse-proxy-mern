import React from 'react'
import './Login.css';

function Login() {
    return (
        <div id="login">
            <button onClick={()=>window.location.href="/auth/google"} id="google">Log in with Google</button>
            <button onClick={()=>window.location.href="/auth/facebook"} id="facebook">Log in with Facebook</button>
        </div>
    )
}

export default Login
