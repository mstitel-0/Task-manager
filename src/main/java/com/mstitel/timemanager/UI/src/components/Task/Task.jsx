import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
function Task() {
  const jwt = sessionStorage.getItem("token"); 
  const navigate = useNavigate();
  const { taskId } = useAppContext();
  const [name, setName] = useState("");
  const [timeToComplete, setTimeToComplete] = useState('');


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
        console.log(data);
        setName(data.name);
        setTimeToComplete(data.timeToComplete);
      },
       fail => {
        console.log(fail);
       })
    console.log(taskId);
}

  useEffect(() => { 
    getTask();
  })

  return (
    <div>
      <button onClick={ () => {navigate('/home')}}>Back</button>
        <h3>Name: {name}</h3>
        <h4>TIme to complete: {timeToComplete}</h4>
    </div>
  )
}

export default Task