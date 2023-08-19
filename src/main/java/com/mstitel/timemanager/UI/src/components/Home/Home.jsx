import { useEffect, useState } from "react";
import './Home.css';
import { Modal } from "../AddDialogWindow/AddDialogWindow";
import Tasks from "../TasksList/TasksList"

function Home() {
    const [openModal, setOpenModal] = useState(false);
   
    return(
        <div> 
            <div className="containeros">
                <button id="submitbtn" className="btn btn-primary" 
                onClick={() => {
                    setOpenModal(true);
                }}>Add task</button>
                {openModal && 
                    <div className="modal-overlay">
                        <Modal openModal={openModal} setOpenModal={setOpenModal} />
                    </div>
                } 
            </div>
            <div>
                <Tasks/>
            </div>       
        </div>
    )
}

export default Home;