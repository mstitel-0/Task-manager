import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Signup/Registration'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Task from './components/Task/Task'
import Test from '../src/Test';
import Profile from './components/Profile/Profile'

function App() {
    return(
      <div>
        <Routes>
          <Route path= "/home" 
            element={ 
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            } 
          >
          </Route>
          <Route path="/" element={ <Login/> }/>
          <Route path= "/login" element={ <Login/> }/>
          <Route path= "/signup" element= { <Registration/> }/>
          <Route path="/home/task/:taskId" element={<PrivateRoute> <Task /> </PrivateRoute>} />
          <Route path="/test" element={<Test/>}/>
          <Route path="/home/profile/:profileId" element={<Profile/>}></Route>
        </Routes>
      </div>
    )
}

export default App
