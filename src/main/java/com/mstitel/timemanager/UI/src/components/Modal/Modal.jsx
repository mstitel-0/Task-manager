import React, { useState } from 'react'
import './Modal.css';
import imgAdded from "../../resources/undraw_confirmed_re_sef7.svg";

export const Modal = ( { openModal, setOpenModal} ) => {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const jwt = sessionStorage.getItem("token");
    const [taskAdded, setTaskAdded] = useState(false);

    const closeDialog = () =>{
        setOpenModal(false);
    }

    function addTask(){
        fetch("http://localhost:8080/api/tasks/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                name: name,
                time: time
            })
          }).then((response) => {
            if(response.status === 200 ) return response.json();
        }).then((data) => {
            setTaskAdded(true);
            setTimeout( () => {
                setOpenModal(false);
            }, 2000);
            console.log(data);
        }, fail => {
            console.log(fail);
        })
}

    return(
        <>
       {!taskAdded && ( 
        <div className='modal-container'>
            <input className="modal-input" placeholder="Task name"  value={name} 
                onChange={(event) => {
                    setName(event.target.value);
                }} 
            />
            <input className="modal-input"  placeholder="Hours to complete"  value={time} 
                onChange={(event) => {
                    setTime(event.target.value);
                }}
            />
            <div className="modal-button-container">
                <button id="send-button" className="btn btn-primary" onClick={closeDialog}>Cancel</button>
                <button className="btn btn-primary" onClick={addTask}>Submit</button>
            </div>
       </div>
       )}
       {taskAdded && (
            <div className="modal-task-added">
                <img className="modal-image" src={imgAdded} />
                <div className="modal-text">Task successfully addded</div>
            </div>
       )}
    </>
    )
}