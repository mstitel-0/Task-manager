import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext';
import EditDialogWIndow  from '../EditDealogWindow/EditDialogWindow'
import NavBar from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom';
import './Task.css';
import imgEdit from '../../resources/edit.png';
import imgDelete from '../../resources/delete-button.svg';
import axios from '../../api/axiosConfig';

function Task({}) {
  const jwt = sessionStorage.getItem("token"); 
  const { taskId } = useAppContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [openEditDialogWindow, setOpenEditDialogWindow] = useState(false);
  const navigate = useNavigate();
  const searchVisible = true;

  const getTask = async () => {
     axios.get(`/api/tasks/${taskId}`,
     ).then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setEndDate(res.data.endDate);
        setStatus(res.data.status);
      },fail => {
          console.log(fail);
      })
  }

  const deleteTask = async() => {
    axios.post(`/api/tasks/delete/${taskId}`,
    ).then(() => {
        navigate('/home');
      },fail => {
          console.log(fail);
      })
  }

  useEffect(() => { 
    getTask();
  })

  return (
    <>
      <div className="main-page">
        {openEditDialogWindow && 
          <div className='modal-overlay'/>
        }
        <div className="content-box glass-effect">
          <div className="navBar">
            <NavBar searchVisible={searchVisible}/>
          </div>
          <div className="main-content">
            <div className="task-container">
              <h2 className="task-name">Name:{name}</h2>
              <p className="task-hours">Description: {description}</p>
              <p className="task-hours">Due: {endDate}</p>
              <p className="task-hours">Status: {status}</p>
            </div>
          </div>
        </div>
          <div className="button-container">
            <div className="button" 
              onClick={()=> {
                setOpenEditDialogWindow(true); 
              }}>
              <img src={imgEdit}  width="50" height="50"/>
            </div>
            <div className="button" id="delete" 
              onClick={ deleteTask }>
                <img src={imgDelete} width="35" height="35"/>
            </div>
          </div>
            {openEditDialogWindow && 
              <div className="modal-overlay">
                <EditDialogWIndow setOpenEditDialogWindow={setOpenEditDialogWindow} getTask={getTask} />
              </div>
            }        
      </div>
    </>
  )
}

export default Task