import React, { useState } from 'react'
import './AddDialogWindow.css';
import imgAdded from "../../resources/undraw_confirmed_re_sef7.svg";
import imgDeclined from "../../resources/undraw_access_denied_re_awnf.svg";
import axios from "../../api/axiosConfig";

export const AddWIndow = ( { openModal, setOpenModal, getTasks, tasks} ) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const [taskAdded, setTaskAdded] = useState(false);
    const [taskDeclined, setTaskDeclined] = useState(false);
    const currentDate = new Date().toISOString().split("T")[0];
    const [failMsg, setFailMsg] = useState("");


    const closeDialog = () =>{
        setOpenModal(false);
    }

    const addTask = async() => {
        axios.post('/api/tasks/add', {
                name: name,
                description: description,
                endDate: endDate
        },{headers:{
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }} ).then((res) => {
            setTaskAdded(true);
            getTasks();
            setTimeout(() => {
                setOpenModal(false);
            }, 2000);
        }, fail => {
            console.log(fail.response.data);
            if(fail.response.data.message != null){   
                setFailMsg(fail.response.data.message);
            }
            else{
                setFailMsg("Something wetn wrong");
            }
            setTaskDeclined(true);
            setTimeout(() => {
                setOpenModal(false);
            }, 2000);
            
        });
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
             <input type="date" className="modal-input"  placeholder="Date" min={currentDate}required value={endDate} 
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
                <div className="modal-text">{failMsg}</div>
                </div>
            </div>
       )}
    </>
    )
}