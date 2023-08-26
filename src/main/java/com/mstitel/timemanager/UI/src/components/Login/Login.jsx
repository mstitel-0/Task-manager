import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import './Login.css';

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
 
    const login = async() => {
      axios.post("/api/auth/signin", {
        username: username,
        password: password
      }).then((res) => {
        sessionStorage.setItem("token",res.data.token);
        navigate('/home');
      }, fail => {
          alert("Incorrect login or password");
          console.error(fail);
      });
    }

    return(
       <div>
          <div className="containeros">
            <h3>Login</h3>
                <label>Username</label>
                <input type="username"  className="input" id="username" placeholder="Enter username"          
                  value={username}
                  onChange={(event) => {
                  setUsername(event.target.value);
                  }}         
                />
                <label>Password</label>
                <input  type="password"  className="input" id="password" placeholder="Enter password"           
                  value={password}
                  onChange={(event) => {
                  setPassword(event.target.value);
                  }}
                />
                <button id="loginbtn" type="submit" className="btn btn-primary" onClick={login} >Login</button>
                <p>Don't have an account?<span onClick={() => {
                  navigate('/signup'); 
                }} className="clickable-text">Sign up</span></p>
          </div>
        </div>
    )
}

export default Login