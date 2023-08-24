import React from 'react'
import { useEffect, useState } from "react";
import "./TasksList.css"
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../../AppContext";

function TasksList({ getTasks , tasks}) {
    const { updateTaskId } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        getTasks();
    },[])

  return (
    <>
        {tasks.map(task => (    
            <div key={task.id} className="task-card" onClick={ () => {
                updateTaskId(task.id);
                navigate('/home/task');
            }}>
                <h3>{task.name}</h3>
            </div>
        ))
        }   
    </>
  )
}

export default TasksList