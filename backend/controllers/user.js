import {db} from '../db.js'

// Backend se comunica com o banco de dados pelos controlers
// Esse arquivo é o controller do usuário

// Query para buscar todos os usuários
export const getUsers = ( _ , res) => {
    const q = "SELECT * FROM usuarios";
    db.query(q, (error, data) => {
        if (error) return res.json(error)
        return res.status(200).json(data)
    })
}

// Query para deletar um usuário
export const deleteUser = (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ error: "Faltando id" });

    const q = "DELETE FROM usuarios WHERE id = ?;";  // Use `q` here

    db.query(q, [id], (error, data) => {  // Corrected to use `q`
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to delete user" });
        }

        if (data.affectedRows === 0) {  // Changed `result` to `data`
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "Usuário deletado com sucesso" });
    });
};


// Query para editar um usuário
export const editUser = ( req , res) => {
    const { id, nome, idade, cpf } = req.body; // Pega os dados do request do front end

    if (!id || !nome || !idade || !cpf) {
        return res.status(400).json({error: "Faltando id ou outros dados"});
    }

    const query = "UPDATE usuarios SET nome = ?, idade = ?, cpf = ? WHERE id = ?;";

    db.query(query, [nome, idade, cpf, id], (error, data) => {
        if (error) return res.json(error)
        return res.status(200).json({message: "Usuário editado com sucesso"})
    })
}