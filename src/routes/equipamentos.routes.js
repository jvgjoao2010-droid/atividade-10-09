import { Router } from "express";
import equipamentoService from "../services/EquipamentoService.js";

const router = Router();

const service = new equipamentoService();

router.get("/equipamentos", async (req, res) => {
    const equipamentos = await service.listarTodos();

    res.json(equipamentos);
});

router.get("/equipamentos/:id", async (req, res) => {
    const equipamento = await service.buscarPorId(req.params.id);

    if (!equipamento) {
        return res.status(404).json({
            mensagem: "Equipamento não encontrado"
        });
    }

    res.json(equipamento);
});

router.post("/equipamentos", async (req, res) => {
    const { nome, descricao, disponivel } = req.body;

    const equipamento = await service.cadastrar(
        nome,
        descricao,
        disponivel
    );

    res.status(201).json(equipamento);
});

router.patch("/equipamentos/:id/disponibilidade", async (req, res) => {
    const { disponivel } = req.body;

    const equipamento = await service.alterarDisponibilidade(
        req.params.id,
        disponivel
    );

    if (!equipamento) {
        return res.status(404).json({
            mensagem: "Equipamento não encontrado"
        });
    }

    res.json(equipamento);
});

export default router;