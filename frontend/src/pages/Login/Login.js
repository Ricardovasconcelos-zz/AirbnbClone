import React, { useState } from "react";
import api from "../../services/api";
import logosmall from "../../assets/logosmall.png";

import "./Login.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      return alert("Digite primeiro seu email");
    }

    const response = await api.post("/sessions", { email });
    const { _id } = response.data;

    localStorage.setItem("user", _id);
    localStorage.setItem("name", name);

    history.push("/dashboard");
  }

  return (
    
    <div className="login">
 <img src={logosmall} alt="" id="logo" />
      <div className="containerLogin">
     

        <div className="contentLogin">
          <p>Reserve lugares únicos para se hospedar e coisas para fazer.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Nome *</label>
            <input
              type="text"
              id="name"
              placeholder="Diga-nos seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="email">E-mail *</label>
            <input
              type="text"
              id="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <button type="submit" className="btn">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
