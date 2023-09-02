import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import './Login.css';

function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); 
 
    const login = async() => {
      setIsLoading(true);
      axios.post("/api/auth/login", {
        username: username,
        password: password
      }).then((res) => {
        sessionStorage.setItem("token",res.data.token);
        navigate('/home');
      }, fail => {
          alert("Incorrect login or password");
          console.error(fail);
      }).finally(() => {
        setIsLoading(false); 
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
                <button
                    id="loginbtn"
                    className={`btn btn-primary ${isLoading ? 'button--loading' : ''}`}
                    onClick={login}
                    disabled={isLoading} 
                >
                <div className="button__text">Login</div>
                </button>
                <p>Don't have an account?<span onClick={() => {
                  navigate('/signup'); 
                }} className="clickable-text">Sign up</span></p>
          </div>
        </div>
    )
}

export default Login