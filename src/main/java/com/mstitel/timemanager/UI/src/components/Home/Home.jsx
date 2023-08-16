import { useEffect, useState } from "react";
import './Home.css';
import axios from '../../api/axiosConfig';

function Home() {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const jwt = localStorage.getItem("token");
    const auth = "Bearer " + jwt;

    // async function addTask(event){
    //     event.preventDefault();
    //     try{
    //         const timeAmount = Number(time);
    //         await axios.post(
    //             "/api/tasks/add",{
    //                 name: name,
    //                 time: timeAmount,
    //                 user: localStorage.getItem("id")
    //             }
    //         ).then((response) => {console.log(response)}, fail => {console.log(fail); alert(fail)});
    //     }
    //     catch (err) {
    //         alert(err);
    //     }
    // }
        function addTask(){
            fetch("http://localhost:8080/api/tasks/add",{
                headers: {
                "Content-type": "application/json",
                Authorization: auth,
            },
            method: "POST",
            }).then((response) => {
                if(response.status === 200 ) return response.json();
            }).then((data) => {
                console.log(data);
            }, fail => {
                console.log(fail);
            } )
        }

            // const [taskName, setTaskName] = useState('');
            // const [taskDescription, setTaskDescription] = useState('');
          
            // const addTask = async () => {
            //   const addTaskRequest = {
            //     taskName: taskName,
            //     taskDescription: taskDescription
            //   };
          
            //   try {
            //     const response = await fetch('http://localhost:8080/api/tasks/add', {
            //       headers: {
            //         'Content-Type': 'application/json'
            //       },
            //       method: 'POST',
            //       body: JSON.stringify(addTaskRequest)
            //     });
          
            //     if (response.ok) {
            //       console.log('Task added successfully');
            //       // Optionally, you can perform further actions here after a successful request.
            //     } else {
            //       console.error('Failed to add task');
            //     }
            //   } catch (error) {
            //     console.error('Error occurred:', error);
            //   }
            // }
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