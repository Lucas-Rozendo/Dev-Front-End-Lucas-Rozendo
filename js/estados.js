import { renderizarTarefas } from "./renderizacao.js";

const regiaoDeStatus = document.querySelector("#status-tarefas");
const quadro = document.querySelector("#quadro-tarefas");

export function renderizarEstado(estado, dados = []) {
    regiaoDeStatus.dataset.estado = estado;

    if (estado === "carregando") {
        quadro.hidden = true;
        quadro.setAttribute("aria-busy", "true");
        regiaoDeStatus.textContent = "Carregando tarefas...";
        return;
    }

    quadro.setAttribute("aria-busy", "false");

    if (estado === "sucesso") {
        renderizarTarefas(dados, quadro);
        quadro.hidden = false;
        const quantidade = dados.length;
        regiaoDeStatus.textContent = `${quantidade} ${quantidade === 1 ? "tarefa carregada" : "tarefas carregadas"}.`;
        return;
    }

    if (estado === "vazio") {
        renderizarTarefas([], quadro);
        quadro.hidden = false;
        regiaoDeStatus.textContent = "Nenhuma tarefa cadastrada ainda.";
        return;
    }

    if (estado === "erro") {
        quadro.hidden = true;
        regiaoDeStatus.textContent = dados;
    }
}
