import { useEffect, useState } from "react";
import './Home.css';
import { AddWIndow } from "../AddDialogWindow/AddDialogWindow";
import  TasksList  from "../TasksList/TasksList"
import { useNavigate } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar/NavBar";
import Task from '../Task/Task'
import img from '../../resources/add-btn.svg'


function Home() {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const jwt = sessionStorage.getItem("token");
 
      const getTasks = async () => {
        fetch("http://localhost:8080/api/tasks/all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`
            }
          }).then((response) => {
            if(response.status === 200 ) return response.json();
        }).then((data) => {
            setTasks(data);
            console.log(data);
          },
           fail => {
            console.log(fail);
           })
    }
    
    return( 
      <div className="main-page">
        <div className="content-box glass-effect">
          <div className="navBar">
              <NavBar setTasks={setTasks} getTasks={getTasks}/>
          </div>
          <div className="main-content">
            <div className="tasks-container">
                <TasksList getTasks={getTasks} tasks={tasks} />
            </div>
          </div>
        </div>
          <div className="add-button-container" onClick={() => {
            setOpenModal(true);
              }}>    
           <img src={img} width="25" height="25"  />
          </div>
          {openModal && 
            <div className="modal-overlay">
              <AddWIndow openModal={openModal} setOpenModal={setOpenModal} getTasks={getTasks} tasks={tasks}/>
            </div>
          }        
    </div>
  )
}

export default Home;