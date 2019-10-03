import React, {useState, useEffect} from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import api from '../../services/api'
const Dashboard = () =>{

    const [spots,setSpots] = useState([])

    useEffect(() => {

        async function loadSpots(){
            const user_id = localStorage.getItem('user')
             const response = await api.get('/dashboard', {
                 headers: { user_id }
             });
             setSpots(response.data)
        }
        loadSpots()
    }, [])


    return(
    <>
        <ul className="spot-list">
        {spots.map(spot=>(
            <li key={spot._id}>
                <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}/>
                <strong>{spot.title}</strong>
                <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
            </li>
        ))}
        </ul>
        <Link to="/new">
            <button className="btn">
                Cadastrar novo Spot
            </button>
        </Link>
    </>
    )
}
   


export default Dashboard