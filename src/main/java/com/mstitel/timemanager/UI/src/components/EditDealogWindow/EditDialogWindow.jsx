import React, { useState } from 'react';
import './EditDialogWindow.css';
import { useAppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function EditDialogWindow( { setOpenEditDialogWindow, getTask } ) {
    const jwt = sessionStorage.getItem("token");
    const [taskEdited, setTaskEdited] = useState(false);
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const { taskId } = useAppContext();

    const editTask = async () => {
        fetch("http://localhost:8080/api/tasks/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                id: taskId,
                name: name,
                timeToComplete: time
            })
          }).then((data) => {
            getTask();
          },
           fail => {
            console.log(fail);
           })
    }

    

  return (
    <>
        {!taskEdited && (
            <div className='modal-container'>
                <input placeholder='Enter name' className='modal-input' onChange={(event) => {
                    setName(event.target.value);
                }}/>
                <input placeholder='Enter time' className='modal-input' onChange={(event) => {
                    setTime(event.target.value);
                }}/>
                <div className='modal-button-container'>
                    <button id='back-button' className='btn btn-primary' onClick={() => {
                        setOpenEditDialogWindow(false);
                    }}>Back</button>
                    <button className='btn btn-primary' onClick={() => {
                        editTask();
                        setOpenEditDialogWindow(false);
                    }}>Submit</button>
                </div>
            </div>
        )}
    </>
  )
}

export default EditDialogWindow