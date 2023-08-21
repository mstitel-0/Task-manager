import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import EditDialogWIndow  from '../EditDealogWindow/EditDialogWindow'

function Task() {
  const jwt = sessionStorage.getItem("token"); 
  const navigate = useNavigate();
  const { taskId } = useAppContext();
  const [name, setName] = useState("");
  const [timeToComplete, setTimeToComplete] = useState('');
  const [openEditDialogWindow, setOpenEditDialogWindow] = useState(false);

  const getTask = async () => {
    fetch(`http://localhost:8080/api/tasks/${taskId}` , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`
        }
      }).then((response) => {
        if(response.status === 200 ) return response.json();
        }).then((data) => {
        setName(data.name);
        setTimeToComplete(data.timeToComplete);
      },
       fail => {
        console.log(fail);
       })
    }

  const deleteTask = async() => {
    fetch(`http://localhost:8080/api/tasks/delete/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`
        }
      }).then((data) => {
        navigate('/home');
      },
       fail => {
        console.log(fail);
       })
    }

  useEffect(() => { 
    getTask();
  })

  return (
    <div>
      <button onClick={ () => {navigate('/home')}}>Back</button>
        <h3>Name: {name}</h3>
        <h4>TIme to complete: {timeToComplete}</h4>
        <button onClick={()=> {setOpenEditDialogWindow(true)}}>Edit</button>
        <button onClick={deleteTask}>DELETE</button>
        {openEditDialogWindow && 
          <div className='modal-overlay'>
            <EditDialogWIndow setOpenEditDialogWindow={setOpenEditDialogWindow} getTask={getTask} />
          </div>
        }
    </div>
  )
}

export default Task