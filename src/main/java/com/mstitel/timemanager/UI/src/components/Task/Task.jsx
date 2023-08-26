import React, { useEffect, useState } from 'react'
import EditDialogWIndow  from '../EditDealogWindow/EditDialogWindow'
import NavBar from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom';
import './Task.css';
import imgEdit from '../../resources/edit.png';
import imgDelete from '../../resources/delete-button.svg';
import axios from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { faI } from '@fortawesome/free-solid-svg-icons';

function Task() {
  const { taskId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [openEditDialogWindow, setOpenEditDialogWindow] = useState(false);
  const navigate = useNavigate();
  const searchVisible = false;

  const getTask = async () => {
     axios.get(`/api/tasks/${taskId}`,
     ).then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setEndDate(new Date(res.data.endDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }));
        setStatus(res.data.status);
        setDaysLeft(Math.ceil((new Date(res.data.endDate) - new Date()) / (1000 * 60 * 60 * 24)) +1);
      },fail => {
          console.log(fail);
      })
  }

  const deleteTask = async() => {
    axios.post(`/api/tasks/delete/${taskId}`
    ).then(() => {
        navigate('/home');
      },fail => {
          console.log(fail);
      })
  }

  const updateStatus = async() => {
    axios.post(`/api/tasks/update/${taskId}/status`
    ).then(() => {
      getTask();
    },
      fail => {
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
              <h4 className="task-hours">Description: {description}</h4>
              <h5 className="task-hours">Days left: {daysLeft}</h5>
              <p className="task-hours">Due: {endDate}</p>
              <p className="task-hours">Status: {status}</p>
              {status != "DONE" &&
                <button className='done-button' onClick={updateStatus}>Done</button>
              } 
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