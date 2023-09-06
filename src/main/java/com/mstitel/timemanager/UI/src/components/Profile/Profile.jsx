import React, { useEffect, useState } from 'react'
import imgEdit from '../../resources/edit.png'
import imgTick from '../../resources/tick.png'
import NavBar from '../NavBar/NavBar'
import './Profile.css'
import imgPro from '../../resources/null-avatar.png'
import axios from '../../api/axiosConfig'
import { useNavigate, useParams } from 'react-router-dom'
function Profile() {
    const [openModal, setOpenModal] = useState(false);
    const { profileId } = useParams();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [bio, setBio] = useState("");
    const [amountOfCompletedTasks, setAmountOfcompletedTasks] = useState();
    const [isHovered, setIsHovered] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);

  const getCompletedTasks = async() => {
      axios.get("/profile/tasks",{headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }}
      )
      .then((res) => {
        console.log(res);
        setCompletedTasks(res.data);
      }, fail => {
        console.log(fail);
      })
  }
  const getProfile = async() => {
    axios.get(`/profile/${profileId}`)
    .then((res) => {
      console.log(res);
      setName(res.data.name);
      setSurname(res.data.surname);
      setBio(res.data.bio);
      setAmountOfcompletedTasks(res.data.amountOfCompletedTasks);
    }, fail => {
      console.log(fail);
    })
  }

    useEffect(() => {
      getCompletedTasks();
      getProfile();
    },[])
  return (
    <div className="main-page">
        <div className="content-box">
          <div className="navBar">
              <NavBar searchVisible={false}/>
          </div>
          <hr/>
          <div className="main-container">
            <div className='left-panel'> 
            {!edit ? (
              <>
                <h1>Name: {name}</h1>
                <h2>Surname: {surname}</h2>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </>
            )}
                <h2>Amount of completed tasks: {amountOfCompletedTasks}</h2>
                <h2>Recently completed tasks:</h2>
                <div className='recent-container'>
                  <div>
                    {completedTasks.map(task => (    
                      <div key={task.id} className="task-recent-container" onClick={ () => {
                        navigate(`/home/task/${task.id}`);
                      }}>
                      <h3>{task.name}</h3>
                      </div>
                      ))
                    }   
                  </div>
                </div>
            </div>
            <div className='right-panel'>
                <div className={`profile-picture-container ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    >
                    {isHovered && (
                        <div className="hover-overlay" onClick={() => {console.log("ok")}}>
                            Edit
                        </div>
                    )}
                    <img
                        src={imgPro}
                        className="profile-picture"
                    />
                </div>
                <div className='text-container'>
                  {!edit ? ( 
                    <>
                      <h1>BIO</h1>
                      <p>{bio}</p>
                    </>
                  ) : (
                    <input
                      type='text'
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  )
                  }
                </div>
            </div>
          </div>
        </div>
        {!edit ? (
          <div className="add-button-container" onClick={() => {
            setEdit(true);
              }}>    
           <img src={imgEdit} width="50" height="50"  />
          </div>
        ) : (
          <div className="add-button-container" onClick={() => {
            setEdit(false);
              }}>    
           <img src={imgTick} width="30" height="30"  />
          </div>
        )}
          {openModal && 
            <div className="modal-overlay">
              
            </div>
          }        
    </div>
  )
}

export default Profile