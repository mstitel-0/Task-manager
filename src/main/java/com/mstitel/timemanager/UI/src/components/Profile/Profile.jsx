import React, { useEffect, useRef, useState } from 'react'
import imgEdit from '../../resources/edit.png'
import imgTick from '../../resources/tick.png'
import NavBar from '../NavBar/NavBar'
import './Profile.css'
import axios from '../../api/axiosConfig'

import { useNavigate, useParams } from 'react-router-dom'
function Profile() {
    const { profileId } = useParams();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [bio, setBio] = useState("");
    const [amountOfCompletedTasks, setAmountOfcompletedTasks] = useState();
    const [isHovered, setIsHovered] = useState(false);
    const [completedTasks, setCompletedTasks] = useState([]);
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    var selectedFile;
    const fileInputRef = useRef(null);
    const [img, setImg] = useState();
    const authenticated = sessionStorage.getItem("token") == null? false : true;
    
  const getCompletedTasks = async() => {
      axios.get(`/profile/tasks/${profileId}`)
      .then((res) => {
        setCompletedTasks(res.data);
      }, fail => {
        console.log(fail);
      })
  }

  const getProfile = async() => {
    axios.get(`/profile/${profileId}`)
    .then((res) => {
      setName(res.data.name);
      setSurname(res.data.surname);
      setBio(res.data.bio);
      setAmountOfcompletedTasks(res.data.amountOfCompletedTasks);
      import(
        `../../resources/ProfilePictures/${res.data.profilePictureUrl? profileId : "null-avatar"}.png`
      ).then((image) => setImg(image.default));
    }, fail => {
      console.log(fail);
    })
  }

  const editProfile = async() => {
    axios.post(`/profile/edit/${profileId}`,{
      name: name,
      surname: surname,
      bio: bio
    },{
      headers:{
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
    .then((res) => {
       
    }, fail => {
      console.log(fail);
    })
  }
   

  const uploadProfilePhoto = async(file) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        await axios.post(`/profile/${profileId}/picture`, formData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          },
        });
        alert('Image uploaded successfully.');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      alert('Please select an image file.');
    }

  }

  useEffect(() => {
    getProfile();
  },[])

  useEffect(() => {
    getCompletedTasks();
  },[])

  return (
    <div className="main-page">
        <div className="content-box">
          <div className="navBar">
              <NavBar searchVisible={false}/>
          </div>
          <div className="main-container">
            <div className='left-panel'> 
              <h1>Name: {!edit ? 
                (
                  <>
                    {name}
                  </>
                ) : (
                  <>
                    <input
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                    />
                  </>
                )  
              }</h1>
              <h2>Surname:{!edit ? (
                <>
                  {surname}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </>
              )} </h2>
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
                        <div className="hover-overlay" onClick={() => {
                          fileInputRef.current.click();
                        }}>
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={(event) => {
                              selectedFile = event.target.files[0];
                              if (selectedFile) {
                                uploadProfilePhoto(selectedFile);
                              }
                            }}
                          />
                            Edit
                        </div>
                    )}
                    <img
                        src={img}
                        alt='not found'
                        className="profile-picture"
                    />
                </div>
                <div className='text-container'>
                  <h1>BIO {!edit? (
                    <>
                      <p>{bio}</p>
                    </>
                  ) : (
                    <>
                      <input
                        type='text'
                        className='bio-input'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    </>
                  )}</h1>
                </div>
            </div>
          </div>
        </div>
        {authenticated &&
          <>
            {!edit ? (
              <div className="add-button-container" onClick={() => {
                setEdit(true);
                  }}>    
              <img src={imgEdit} width="50" height="50"  />
              </div>
            ) : (
              <div className="add-button-container" onClick={() => {
                editProfile();
                setEdit(false);
              }}>    
              <img src={imgTick} width="30" height="30"/>
              </div>
            )} 
          </>
        }     
    </div>
  )
}

export default Profile