import express from "express";
import equipamentosRoutes from "./routes/equipamentos.routes.js";

const app = express();

app.use(express.json());

app.use(equipamentosRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});