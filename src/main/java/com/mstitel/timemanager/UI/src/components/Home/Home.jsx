import { useEffect, useState } from "react";
import './Home.css';
import axios from '../../api/axiosConfig';

function Home() {
    const [name, setName] = useState("alibob");
    const [time, setTime] = useState("");
    const jwt = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

        function addTask(){
            fetch("http://localhost:8080/api/tasks/add", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    name: "kakapro",
                    time: "2"
                })
              }).then((response) => {
                if(response.status === 200 ) return response.json();
            }).then((data) => {
                console.log(data);
            }, fail => {
                console.log(fail);
            })
        }

    return(
        <div> 
            <p >Homeeee</p>
                <div className="containeros">
                    <input type="name" id="name" className="input"></input>
                 <button id="submitbtn" className="btn btn-primary" onClick={addTask}>Add task</button>
                </div>
        </div>
    )
}

export default Home;