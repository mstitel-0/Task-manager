import React from 'react'
import { useEffect, useState } from "react";
import "./TasksList.css"
import { useNavigate } from 'react-router-dom';

function TasksList({ getTasks , tasks}) {
    const navigate = useNavigate();

    useEffect(() => {
        getTasks();
    },[])

  return (
    <>
        {tasks.map(task => (    
            <div key={task.id} className="task-card" onClick={ () => {
                navigate(`/home/task/${task.id}`);
            }}>
                <h3>{task.name}</h3>
            </div>
        ))
        }   
    </>
  )
}

export default TasksList