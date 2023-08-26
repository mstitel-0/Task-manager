import React, { useState } from 'react'
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

function NavBar({ setTasks, searchVisible, getTasks }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const jwt = sessionStorage.getItem("token");
  const visible = searchVisible == null? false : true; 

  const logout = async() => {
    axios.post('/api/auth/logout',
      ).then(() => {
          sessionStorage.setItem("token","");
          navigate('/login');
        }).catch((error) => {
            console.error('Logout error:', error);
        });
  }
  const search = async() => {
    axios.get(`/api/tasks/search/${name}`,
      ).then((res) => {
          if(res.data != null){
            setTasks(res.data);
          }  
        },fail => {
            console.log(fail);
          })
  }

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className='navbar-grid'>
        <div className='home-bar'>
      <ul className="navbar-nav ">
        <li className="nav-item">
          <a className="nav-link"onClick={() => {
            navigate('/home');
          }}>Home</a>
        </li>
      </ul>
      </div>
      <form className="form-inline">
          <div className="input-group">
            <input
              type="text"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              value={name}
              onChange={(event) => {
                if(event.target.value === ''){
                  setName(event.target.value);
                  getTasks();
                }
                else{
                  setName(event.target.value);
                  search(name);
                }
              }}
              disabled={visible}
            />
        </div>      
      </form>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" onClick={logout}>Logout</a>
        </li>
      </ul>
      </div>
    </nav>
  )
}

export default NavBar