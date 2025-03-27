import "./App.css"; // Importa os estilos da aplicação
import DataList from "./components/DataList";
import { useEffect, useState } from "react";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemClicked, setItemClicked] = useState(null);
  const [editUser, setEditUser] = useState(false);

  const [nome, setNome] = useState(null);
  const [idade, setIdade] = useState(null);
  const [cpf, setCpf] = useState(null);

  function clicked(item) {
    console.log("Clicou no item", item.id);
    setModalIsOpen(true);
    setItemClicked(item);
  }

  function closeModal() {
    setModalIsOpen(false);
    setEditUser(false);
    setItemClicked(null);
  }

  const deleteUser = async () => {
    try {
        const response = await fetch("http://localhost:8800/del", {
            method: "POST",  
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: itemClicked.id,  
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update user"); 
        }

        const data = await response.json();

        console.log("Usuario deletado com sucesso", data);

        setEditUser(false);
        closeModal();

        window.location.reload();
    } catch (error) {
        console.error("Error saving changes:", error);
    }
};

  const saveChanges = async () => {
    try {
        const response = await fetch("http://localhost:8800/edit/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: itemClicked.id,
                nome: nome,
                idade: idade,
                cpf: cpf
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        const data = await response.json();
        console.log("Usuario atualizado com sucesso", data);

        setEditUser(false);
        closeModal();

        window.location.reload();
    } catch (error) {
        console.error("Error saving changes:", error);
    }
};

  useEffect(() => {
    if (itemClicked) {
      setNome(itemClicked.nome);
      setIdade(itemClicked.idade);
      setCpf(itemClicked.cpf);
    }
  }, [editUser, itemClicked])

  return (
    <div>
      <DataList clicked={clicked} />
      
      {modalIsOpen && itemClicked && (
        <div className="modal">
          <div className="modal-content">
            {
              !editUser ?
              <>
                <h1>Detalhes do Usuário</h1>
                <p><strong>Nome:</strong> {itemClicked.nome}</p>
                <p><strong>Idade:</strong> {itemClicked.idade}</p>
                <p><strong>CPF:</strong> {itemClicked.cpf}</p>
                <div className="modal-buttons">
                  <button onClick={closeModal}>Fechar</button>
                  <button onClick={() => {setEditUser(true)}}>Editar</button>
                  <button className="deleteButton" onClick={deleteUser}>Deletar</button>
                </div>
              </>
              :
              <>
                <h1>Editar Usuário</h1>
                <p><strong>Nome:</strong> <input type="text" onChange={(e) => setNome(e.target.value)} value={nome || ""} ></input></p>
                <p><strong>Idade:</strong> <input type="text" onChange={(e) => setIdade(e.target.value)} value={idade || ""} ></input></p>
                <p><strong>CPF:</strong> <input type="text" onChange={(e) => setCpf(e.target.value)} value={cpf || ""} ></input></p>
                <div className="modal-buttons">
                  <button onClick={() => setEditUser(false)}>Cancelar</button>
                  <button onClick={saveChanges}>Confirmar</button>
                </div>
              </>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default App;