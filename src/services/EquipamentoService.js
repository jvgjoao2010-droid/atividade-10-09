import pool from "../db.js";

class EquipamentoService {

    async listarTodos() {
        const resultado = await pool.query(
            "SELECT * FROM equipamentos ORDER BY id_equipamento"
        );

        return resultado.rows;
    }

    async buscarPorId(id) {
        const resultado = await pool.query(
            "SELECT * FROM equipamentos WHERE id_equipamento = $1",
            [id]
        );

        return resultado.rows[0] || null;
    }

    async cadastrar(nome, descricao, disponivel = true) {
        const resultado = await pool.query(
            `INSERT INTO equipamentos
                (nome, descricao, disponivel)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nome, descricao, disponivel]
        );

        return resultado.rows[0];
    }

    async alterarDisponibilidade(id, disponivel) {
        const resultado = await pool.query(
            `UPDATE equipamentos
             SET disponivel = $1
             WHERE id_equipamento = $2
             RETURNING *`,
            [disponivel, id]
        );

        return resultado.rows[0] || null;
    }
}

export default EquipamentoService;
