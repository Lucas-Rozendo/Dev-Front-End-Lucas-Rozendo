import { renderizarTarefas } from "./renderizacao.js";
import { selecionarTarefas } from "./estado.js";

const regiaoDeStatus = document.querySelector("#status-tarefas");
const quadro = document.querySelector("#quadro-tarefas");
const campoBusca = document.querySelector("#buscar-tarefa");
const filtrosStatus = document.querySelectorAll('[name="status"]');
const filtrosPrioridade = document.querySelectorAll('[name="prioridade"]');
const campoOrdenacao = document.querySelector("#ordenacao");

function sincronizarControles(estadoAtual) {
    campoBusca.value = estadoAtual.busca;
    campoOrdenacao.value = estadoAtual.ordenacao;

    filtrosStatus.forEach((controle) => {
        controle.checked = controle.value === estadoAtual.status;
    });

    filtrosPrioridade.forEach((controle) => {
        controle.checked = controle.value === estadoAtual.prioridade;
    });
}

export function renderizarAplicacao(estadoAtual) {
    sincronizarControles(estadoAtual);
    regiaoDeStatus.dataset.estado = estadoAtual.carregamento;

    if (estadoAtual.carregamento === "carregando") {
        quadro.hidden = true;
        quadro.setAttribute("aria-busy", "true");
        regiaoDeStatus.textContent = "Carregando tarefas...";
        return;
    }

    quadro.setAttribute("aria-busy", "false");

    if (estadoAtual.carregamento === "erro") {
        regiaoDeStatus.dataset.estado = "erro";
        quadro.hidden = true;
        regiaoDeStatus.textContent = estadoAtual.erro;
        return;
    }

    if (estadoAtual.tarefas.length === 0) {
        regiaoDeStatus.dataset.estado = "vazio";
        renderizarTarefas([], quadro);
        quadro.hidden = false;
        regiaoDeStatus.textContent = "Nenhuma tarefa cadastrada ainda.";
        return;
    }

    const tarefasVisiveis = selecionarTarefas(estadoAtual);
    renderizarTarefas(tarefasVisiveis, quadro);
    quadro.hidden = false;

    if (tarefasVisiveis.length === 0) {
        regiaoDeStatus.dataset.estado = "sem-resultados";
        regiaoDeStatus.textContent =
            "Nenhuma tarefa corresponde aos critérios. Altere ou limpe os filtros.";
        return;
    }

    regiaoDeStatus.dataset.estado = "sucesso";
    regiaoDeStatus.textContent =
        `${tarefasVisiveis.length} de ${estadoAtual.tarefas.length} tarefas exibidas.`;
}
