import React, { useState } from 'react'
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom';

function NavBar({ setTasks, searchVisible, getTasks }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const jwt = sessionStorage.getItem("token");

  const logout = () => {
    fetch('http://localhost:8080/api/auth/logout', {
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          sessionStorage.setItem("token","");
          navigate('/login');
        } else {
        }
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }
  const search = () => {
    fetch(`http://localhost:8080/api/tasks/search/${name}` , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`
        }
      }).
        then((response) => {
          if(response.status === 200 ) return response.json();
        }).
          then((data) => {
            if(data != null){
            console.log(data);
            setTasks(data);
            }
            
          },
            fail => {
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
        {!searchVisible &&
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
                  console.log(event.target.value);
                  search(name);
                }
              }}
            />
        </div>
        }         
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