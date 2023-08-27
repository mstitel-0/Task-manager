import React, { useState } from 'react';
import './StartDialogWindow.css';
import axios from '../../api/axiosConfig'
import { useParams } from 'react-router-dom';

function StartDialogWindow( { setOpenStartDialogWindow, getTask } ) {
    const [taskStarted, setTaskStarted] = useState(false);
    const [endDate, setEndDate] = useState("");
    const { taskId } = useParams();
    const currentDate = new Date().toISOString().split("T")[0];


    const startTask = async () => {
        axios.post(`/api/tasks/update/${taskId}/start`, {
            endDate: endDate
        },{headers:{
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }}).then(() => {
            getTask();
        },fail => {
            console.log(fail);
        })
    }

  return (
    <>
        {!taskStarted && (
            <div className='modal-container'>
                <label>Due: </label>
                    <input type="date" className="modal-input"  placeholder="Date" min={currentDate}required value={endDate} 
                        onChange={(event) => {
                            setEndDate(event.target.value);
                        }}
                    />
            <div className='modal-button-container'>
                <button id='back-button' className='btn btn-primary' onClick={() => {
                    setOpenStartDialogWindow(false);
                }}>Back</button>
                <button className='btn btn-primary' id="submit" onClick={() => {
                    startTask();
                    setOpenStartDialogWindow(false);
                }}>Submit</button>
            </div>
        </div>
        )}
    </>
  )
}

export default StartDialogWindow