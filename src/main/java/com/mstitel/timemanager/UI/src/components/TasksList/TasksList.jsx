import React from 'react'
import { useEffect, useState } from "react";
import axios from "../../api/axiosConfig"
import "./TasksList.css"
function Tasks() {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try{
            const response = await axios.get("/api/tasks/all");
            setTasks(response.data);
            console.log(response);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getTasks();
    },[])

  return (
    <div className="task-container">
        {tasks.map(task => (    
            <div key={task.id} className="task-card">
                <h3>{task.name}</h3>
                <p>Date to Complete: {task.timeToComplete}</p>
            </div>
        ))}
    </div>
  )
}

export default Tasks