import React, { useState } from 'react'
import './AddDialogWindow.css';
import imgAdded from "../../resources/undraw_confirmed_re_sef7.svg";
import imgDeclined from "../../resources/undraw_access_denied_re_awnf.svg";

export const AddWIndow = ( { openModal, setOpenModal, getTasks, tasks} ) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const jwt = sessionStorage.getItem("token");
    const [taskAdded, setTaskAdded] = useState(false);
    const [taskDeclined, setTaskDeclined] = useState(false);

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
                description: description,
                endDate: endDate
            })
          }).then((response) => {
            if(response.status === 200 ) return response.json();
        }).then((data) => {
            setTaskAdded(true);
            getTasks();
            setTimeout( () => {
                setOpenModal(false);
            }, 2000);
            console.log(data);

        }, fail => {
            setTaskDeclined(true);
            setTimeout( () => {
                setOpenModal(false);
            }, 2000);
            console.log(fail);
        })
}

    return(
        <>
       {!taskAdded && !taskDeclined && ( 
        <div className='modal-container'>
            <input className="modal-input" placeholder="Task name"  value={name} 
                onChange={(event) => {
                    setName(event.target.value);
                }} 
            />
            <input className="modal-input"  placeholder="Description"  value={description} 
                onChange={(event) => {
                    setDescription(event.target.value);
                }}
            />
             <input type="date" className="modal-input"  placeholder="Date"  value={endDate} 
                onChange={(event) => {
                    setEndDate(event.target.value);
                }}
            />
            <div className="modal-button-container">
                <button id="back-button" className="btn btn-primary" onClick={closeDialog}>Cancel</button>
                <button id="submit-button"className="btn btn-primary" onClick={addTask}>Submit</button>
            </div>
       </div>
       )}
       {taskAdded && (
            <div className="modal-task-added">
                <img className="modal-image" src={imgAdded} />
                <div className="modal-text">Task successfully addded</div>
            </div>
       )} 
       {taskDeclined && (
            <div>
                <div className="modal-task-added">
                <img className="modal-image" src={imgDeclined} />
                <div className="modal-text">Something went wrong</div>
                </div>
            </div>
       )}
    </>
    )
}