import React, { useState } from 'react';
import './EditDialogWindow.css';
import { useAppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';

function EditDialogWindow( { setOpenEditDialogWindow, getTask } ) {
    const jwt = sessionStorage.getItem("token");
    const [taskEdited, setTaskEdited] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
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
                description: description,
                endDate: endDate
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
                <div className='modal-button-container'>
                    <button id='back-button' className='btn btn-primary' onClick={() => {
                        setOpenEditDialogWindow(false);
                    }}>Back</button>
                    <button className='btn btn-primary' id="submit" onClick={() => {
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