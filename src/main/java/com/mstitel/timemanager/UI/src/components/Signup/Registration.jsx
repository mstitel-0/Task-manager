import axios from "../../api/axiosConfig";
import { useState, useEffect } from "react";
import './Registration.css'
import { useNavigate } from "react-router-dom";

function Registration() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    const signup = async () => {
        setIsLoading(true); 
        axios.post("/api/auth/signup", {
            username: username,
            email: email,
            password: password
        }).then(() => {
            alert("Confirm your email");
        }).catch((fail) => {
            console.log(fail);
            if (fail.response.data.message === "") {
                alert("Something went wrong");
            } else {
                alert(fail.response.data.message);
            }
        }).finally(() => {
            setIsLoading(false); 
        });
    }

    return (
        <div>
            <div className="containeros">
                <h3>Registration</h3>
                <label>Username</label>
                <input
                    type="username"
                    className="input"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <label>Email</label>
                <input
                    type="email"
                    className="input"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="input"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <button
                    id="signupbtn"
                    className={`btn btn-primary ${isLoading ? 'button--loading' : ''}`}
                    onClick={signup}
                    disabled={isLoading} 
                >
                <div className="button__text">Register</div>
                </button>
                <p>
                    Already have an account?
                    <span
                        onClick={() => {
                            navigate("/login");
                        }}
                        className="clickable-text"
                    >
                        Click here
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Registration;
