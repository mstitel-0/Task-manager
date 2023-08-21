import { useEffect, useState } from "react";
import './Home.css';
import { Modal } from "../AddDialogWindow/AddDialogWindow";
import  TasksList  from "../TasksList/TasksList"
import { useNavigate } from 'react-router-dom';

function Home() {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const jwt = sessionStorage.getItem("token");

    const logout = () => {
        fetch('http://localhost:8080/api/auth/logout', {
          method: 'GET', 
          credentials: 'include',
        })
          .then((response) => {
            if (response.ok) {
              sessionStorage.setItem("token","");
              navigate('/login');
              console.log('Logout successful');
            } else {
              console.error('Logout failed');
            }
          })
          .catch((error) => {
            console.error('Logout error:', error);
          });
      }

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
            console.log(data);
            setTasks(data);
          },
           fail => {
            console.log(fail);
           })
    }
    
    return(
        <div> 
            <div className="containeros">
                <button id="submitbtn" className="btn btn-primary" 
                onClick={() => {
                    setOpenModal(true);
                }}>
                  Add task</button>
                {openModal && 
                    <div className="modal-overlay">
                        <Modal openModal={openModal} setOpenModal={setOpenModal} getTasks={getTasks} tasks={tasks} />
                    </div>
                  } 
                <button className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
            <div className="task-container">
                <TasksList getTasks={getTasks} tasks={tasks}/>
            </div>       
        </div>
    )
}

export default Home;