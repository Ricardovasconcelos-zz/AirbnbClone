import React from "react";
import "./Experience.css";

import Estadias from "../../assets/quarto.png";
import Cozinha from "../../assets/cozinha.jpeg";
import Aventura from "../../assets/aventura.jpg";
import Comida from "../../assets/comida.jpeg";


export default function Experience() {

  const name = localStorage.getItem('name')

  return (
    <>
    <h2 className="User">O que você deseja encontrar, {name}?</h2>
    <div className="cardStyle">
    
      <div className="Experience">
        <img src={Estadias} alt="" className="img"/>
        <p>Estadias</p>
      </div>
   
      <div className="Experience">
        <img src={Cozinha} alt="" className="img"/>
          <p>Experiência</p>
      </div>

      <div className="Experience">
        <img src={Aventura} alt="" className="img"/>
          <p>Aventuras</p>
      </div>

      <div className="Experience">
        <img src={Comida} alt="" className="img"/>
          <p>Restaurantes</p>
      </div>

    </div>
    </>
  );
}
