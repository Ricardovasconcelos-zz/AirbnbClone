import React, { useState, useMemo } from "react";
import camera from "../../assets/camera.svg";
import airbnb from "../../assets/airbnb.png";

import "./New.css";

import api from "../../services/api";

const New = ({ history }) => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [itens, setItens] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("title", title);
    data.append("city", city);
    data.append("itens", itens);

    data.append("price", price);
    await api.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }

  return (
      <div className="background">
    <div className="containerNew">
      <img src={airbnb} alt="airbnb" id="logoAirbnb" />
      <div className="contentNew">
        <form onSubmit={handleSubmit}>
          <label
            id="thumbnail"
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? "has-thumbnail" : ""}
          >
            <input
              type="file"
              onChange={e => setThumbnail(e.target.files[0])}
            />
            <img src={camera} alt="Select img" />
          </label>

          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Nome de seu imóvel"
            onChange={e => setTitle(e.target.value)}
          />

          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            value={city}
            placeholder="Nome da cidade"
            onChange={e => setCity(e.target.value)}
          />

          <label htmlFor="itens">Contém</label>
          <input
            type="text"
            id="itens"
            value={itens}
            placeholder="O que o imóvel oferece?"
            onChange={e => setItens(e.target.value)}
          />

          <label htmlFor="price">Preço</label>
          <input
            type="text"
            id="price"
            value={price}
            placeholder="Valor cobrado por dia"
            onChange={e => setPrice(e.target.value)}
          />

          <button type="submit" className="btn">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default New;
