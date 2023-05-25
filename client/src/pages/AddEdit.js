import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import "./Home.css";


function AddEdit() {
    const data = useParams();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const loadData = async () => {
        console.log(data.id);
        //return axios.get(`https://localhost:5000/api/users/${id}`).then(response => response.data).catch(error => console.log(error));

        const response = await axios.get(`http://localhost:5000/api/users/${data.id}`);
        //console.log(response.data.name);
        setName(response.name);
        setEmail(response.email)
     };

     useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = () => {
        
    }
    return(
        <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
        </form>
    );
}

export default AddEdit;