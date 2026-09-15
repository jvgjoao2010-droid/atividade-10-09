import express from "express";
import equipamentosRoutes from "./routes/equipamentos.routes.js";

const app = express();

app.use(express.json());

app.use(equipamentosRoutes);

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada." });
});

app.use((erro, req, res, next) => {
    console.error(erro);
    res.status(500).json({ erro: "Erro interno do servidor." });
});

const porta = Number(process.env.PORT) || 3000;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
