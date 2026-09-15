import pool from "../db.js";

class EquipamentoService {
    async listarTodos() {
        const resultado = await pool.query(
            `SELECT id, equipamentos, categoria, condicao, disponivel
             FROM equipamentos
             ORDER BY id`
        );

        return resultado.rows;
    }

    async buscarPorId(id) {
        const resultado = await pool.query(
            `SELECT id, equipamentos, categoria, condicao, disponivel
             FROM equipamentos
             WHERE id = $1`,
            [id]
        );

        return resultado.rows[0] ?? null;
    }

    async cadastrar({ equipamentos, categoria, condicao, disponivel = true }) {
        const resultado = await pool.query(
            `INSERT INTO equipamentos (equipamentos, categoria, condicao, disponivel)
             VALUES ($1, $2, $3, $4)
             RETURNING id, equipamentos, categoria, condicao, disponivel`,
            [equipamentos, categoria, condicao, disponivel]
        );

        return resultado.rows[0];
    }

    async alterarDisponibilidade(id, disponivel) {
        const resultado = await pool.query(
            `UPDATE equipamentos
             SET disponivel = $1
             WHERE id = $2
             RETURNING id, equipamentos, categoria, condicao, disponivel`,
            [disponivel, id]
        );

        return resultado.rows[0] ?? null;
    }
}

export default EquipamentoService;
