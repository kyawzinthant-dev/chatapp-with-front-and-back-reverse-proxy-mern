import React, { useEffect, useState } from 'react'
import './Login.css';


function Login() {

    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    function click(evt) {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
        if (!supportsPWA) {
            return null;
        }
    }
    return (
        <div id="login">
            <img id="logo" src="images/logo.png" alt="logo" />
            <a id="google" href="/auth/google"><img src="images/google.png" alt="google" />Continue with Google</a>
            <a id="facebook" href="/auth/facebook"><img src="images/facebook.png" alt="facebook" />Continue with Facebook</a>
            <button id="pwa" onClick={click}>Install App</button>
        </div>
    )
}

export default Login
