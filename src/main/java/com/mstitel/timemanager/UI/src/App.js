import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Signup/Registration'
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

        <Routes>
          <Route path= "/home" element={ <Home/> } />
          <Route path= "/login" element={ <Login/> }/>
          <Route path= "/signup" element= { <Registration/> }/>
        </Routes>
      
    </div>
    )
}

export default App
