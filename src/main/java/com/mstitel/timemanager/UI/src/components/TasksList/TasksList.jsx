import React from 'react'
import { useEffect, useState } from "react";
import "./TasksList.css"
function Tasks({ getTasks , tasks}) {
    const jwt = sessionStorage.getItem("token");

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