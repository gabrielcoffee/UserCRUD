import React, { useEffect, useState } from "react";

const DataList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      <h1 className="title">Listando Usuários</h1>
      <ul className="list">
        {data.map((item) => (
          <li key={item.id} className="li-list">
            Nome: {item.nome}<br />
            Idade: {item.idade}<br />
            CPF: {item.cpf}<br />
            <button className="btn-list" onClick={() => props.clicked(item)}>
              Mais detalhes
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;