import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
// function App() {

//   const [tasks, setTasks] = useState();

//   //better ux user experience 
//   const getTasks = async () =>{

//     try{

//       const response = await api.get("/api/tasks/all");

//       setTasks(response.data);

//     }
//     catch(err){
//         console.log(err);
//     }

    
//   } 

//   useEffect(() => {
//     getTasks();
//   },[]);

//   return (
//     <div className="App">
      
//     <Routes>
//       <Route path="/" element={<Layout/>}>
//         <Route path="/" element={<Home/>}></Route>

//       </Route>
//     </Routes>

//     </div>
//   );
// }


function App() {
    return(
      <div>
      <Login/>
    </div>
    )
}

export default App
