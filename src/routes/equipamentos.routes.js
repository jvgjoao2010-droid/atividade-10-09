import { Router } from "express";
import EquipamentoService from "../services/EquipamentoService.js";

const router = Router();
const service = new EquipamentoService();

function idValido(id) {
    return Number.isSafeInteger(Number(id)) && Number(id) > 0;
}

router.get("/equipamentos", async (req, res, next) => {
    try {
        res.status(200).json(await service.listarTodos());
    } catch (erro) {
        next(erro);
    }
});

router.get("/equipamentos/:id", async (req, res, next) => {
    if (!idValido(req.params.id)) {
        return res.status(400).json({ erro: "O id deve ser um número inteiro positivo." });
    }

    try {
        const equipamento = await service.buscarPorId(Number(req.params.id));

        if (!equipamento) {
            return res.status(404).json({ erro: "Equipamento não encontrado." });
        }

        return res.status(200).json(equipamento);
    } catch (erro) {
        return next(erro);
    }
});

router.post("/equipamentos", async (req, res, next) => {
    const { equipamentos, categoria, condicao, disponivel = true } = req.body;

    if (
        typeof equipamentos !== "string" || !equipamentos.trim() ||
        typeof categoria !== "string" || !categoria.trim() ||
        typeof condicao !== "string" || !condicao.trim() ||
        typeof disponivel !== "boolean"
    ) {
        return res.status(400).json({
            erro: "Envie equipamentos, categoria e condicao como texto e disponivel como booleano."
        });
    }

    try {
        const equipamento = await service.cadastrar({
            equipamentos: equipamentos.trim(),
            categoria: categoria.trim(),
            condicao: condicao.trim(),
            disponivel
        });

        return res.status(201).json(equipamento);
    } catch (erro) {
        return next(erro);
    }
});

router.patch("/equipamentos/:id/disponibilidade", async (req, res, next) => {
    if (!idValido(req.params.id)) {
        return res.status(400).json({ erro: "O id deve ser um número inteiro positivo." });
    }

    if (typeof req.body.disponivel !== "boolean") {
        return res.status(400).json({ erro: "O campo disponivel deve ser booleano." });
    }

    try {
        const equipamento = await service.alterarDisponibilidade(
            Number(req.params.id),
            req.body.disponivel
        );

        if (!equipamento) {
            return res.status(404).json({ erro: "Equipamento não encontrado." });
        }

        return res.status(200).json(equipamento);
    } catch (erro) {
        return next(erro);
    }
});

export default router;
