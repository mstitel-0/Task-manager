import React, { useState } from 'react';
import './EditDialogWindow.css';
import axios from '../../api/axiosConfig'
import { useParams } from 'react-router-dom';

function EditDialogWindow( { setOpenEditDialogWindow, getTask } ) {
    const [taskEdited, setTaskEdited] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const { taskId } = useParams();
    const currentDate = new Date().toISOString().split("T")[0];


    const editTask = async () => {
        axios.post('/api/tasks/update', {
            id: taskId,
            name: name,
            description: description,
            endDate: endDate
        },{headers:{
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }}).then((data) => {
            getTask();
        },fail => {
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
             <input type="date" className="modal-input"  placeholder="Date" min={currentDate}required value={endDate} 
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