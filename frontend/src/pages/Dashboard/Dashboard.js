import React, { useState, useEffect, useMemo } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import api from "../../services/api";
import socketio from "socket.io-client";
import Slider from "react-slick";
import Experience from '../../components/Experience/Experience'
import Video from "../../components/Video/Video";

const Dashboard = () => {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id }
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/list", {
        headers: { user_id }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    setRequests(requests.filter(request => request._id !== id));
  }
  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
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
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
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

  return (
    <div className="containerDashboard">
      <Experience/>
      <div className="contentDashboard">
        <ul className="notifications">
          {requests.map(request => (
            <li key={request._id}>
              <p>
                <strong>{request.user.email}</strong> está solicitando uma
                reserva em <strong>{request.spot.title}</strong> para a data:{" "}
                <strong>{request.date}</strong>
              </p>

              <button
                className="accept"
                onClick={() => handleAccept(request._id)}
              >
                Aceitar
              </button>
              <button
                className="reject"
                onClick={() => handleReject(request._id)}
              >
                Rejeitar
              </button>
            </li>
          ))}
        </ul>

        <ul className="spot-list">
          <Slider {...settings}>
            {spots.map(spot => (
              <li key={spot._id}>
                <header
                  style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
                />
                <strong>{spot.title}</strong>
                <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
              </li>
            ))}
          </Slider>
        </ul>

        {/* <Video/> */}
        <Link to="/new">
          <button className="btn">Cadastrar novo Spot</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
