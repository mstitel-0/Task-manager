import React, { useEffect, useState } from 'react'
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

function NavBar({ setTasks, searchVisible, getTasks }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const jwt = sessionStorage.getItem("token");
  const [profileId, setProfileId] = useState("");
  const visible = searchVisible == null? false : true; 
  const authenticated = sessionStorage.getItem("token") == null? false : true;

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
    axios.get(`/api/tasks/search/${name}`,{headers:{
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }}
      ).then((res) => {
          if(res.data != null){
            setTasks(res.data);
          }  
        },fail => {
            console.log(fail);
          })
  }
  const getProfile = async() => {
    axios.get("/profile/get",{headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }}
    )
    .then((res) => {
      setProfileId(res.data.id);
    },fail => {
      console.log(fail);
    })
  }

  useEffect(() => {
    {authenticated &&
      getProfile();
    }
    
  },[])

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className='navbar-grid'>
        {authenticated &&
        <>
        <div className='home-bar'>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link"onClick={() => {
                navigate('/home');
              }}>Home</a>
            </li>
          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link"onClick={() => {
                getProfile();
                navigate(`/home/profile/${profileId}`);
              }}>Profile</a>
            </li>
          </ul>
        </div>
      <form className="form-inline">
        <div className="input-group">
          {!visible &&
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
            />
          }
        </div>      
      </form>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" onClick={logout}>Logout</a>
        </li>
      </ul>
      </>
    }
    {!authenticated &&
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" onClick={() => {
            navigate('/login');
          }}>Login</a>
        </li>
      </ul>
    }
    </div>
    
  </nav>
  )
}

export default NavBar