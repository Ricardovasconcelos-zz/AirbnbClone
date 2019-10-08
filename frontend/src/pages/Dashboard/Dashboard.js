import React, {useState, useEffect, useMemo} from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import socketio from 'socket.io-client'
import Slider from "react-slick";

import { Container} from 'react-bootstrap'
const Dashboard = () =>{

    const [spots,setSpots] = useState([])
    const [requests, setRequests] = useState([])

    const user_id = localStorage.getItem('user')
        const socket = useMemo(() => socketio('http://localhost:3333', {
            query: { user_id }
        }), [user_id])

    useEffect(()=>{
        socket.on('booking_request', data => {
            setRequests([...requests, data])
        })
    }, [requests, socket])

    useEffect(() => {

        async function loadSpots(){
            const user_id = localStorage.getItem('user')
             const response = await api.get('/list', {
                 headers: { user_id }
             });
             setSpots(response.data)
        }
        loadSpots()
    }, [])

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`)
        setRequests(requests.filter(request => request._id !== id))
    }
    async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`)
        setRequests(requests.filter(request => request._id !== id))
    }

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          }, {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          }, {
            breakpoint: 765,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return(
        <Container>
        <div className="spot-list">
          <Slider {...settings}>
            {spots.map(spot => (
              <div>
               
               <div key={spot._id}>
                <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}/>
                <strong>{spot.title}</strong>
                <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                </div>
                  


              </div>
            ))
            }

          </Slider>
        </div>
      </Container>
 
    )
}
   


export default Dashboard