import axios from "axios";

export default axios.create(
    {
        baseURL: 'https://app-back-1f1x.onrender.com',
        //baseURL: 'http://localhost:8080',
        headers: {"ngrok-skip-browser-warning": "true"
                    }
    }
);