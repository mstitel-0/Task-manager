import { useEffect, useState } from "react";
import './Home.css';
import { Modal } from "../AddDialogWindow/AddDialogWindow";

function Home() {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [openModal, setOpenModal] = useState(false);
   
    return(
        <div classNmae="container"> 
            <div className="containeros">
                <button id="submitbtn" className="btn btn-primary" 
                onClick={() => {
                    setOpenModal(true);
                }}>Add task</button>
                {openModal && <Modal openModal={openModal} setOpenModal={setOpenModal} />}        
            </div>
        </div>
    )
}

export default Home;