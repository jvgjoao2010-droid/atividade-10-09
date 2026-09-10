import pool from "./db.js";

async function testarConexao() {
    try {
        const resultado = await pool.query(
            "SELECT * FROM equipamentos"
        );

        console.log("Conexão realizada com sucesso!");

        console.log("Equipamentos encontrados:");

        console.table(resultado.rows);

    } catch (erro) {
        console.error("Erro ao conectar ao banco:", erro);
    } finally {
        await pool.end();
    }
}

testarConexao();