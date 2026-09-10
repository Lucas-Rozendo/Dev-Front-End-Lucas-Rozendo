import { carregarTarefas } from "./api.js";
import { estado, limparCriterios } from "./estado.js";
import { renderizarAplicacao } from "./estados.js";
import { instalarEventosDoQuadro } from "./renderizacao.js";

const quadro = document.querySelector("#quadro-tarefas");
const campoBusca = document.querySelector("#buscar-tarefa");
const controles = document.querySelector(".controles");
const campoOrdenacao = document.querySelector("#ordenacao");
const botaoLimpar = document.querySelector("#limpar-filtros");

function criarMensagemDeErro(erro) {
    if (erro.name === "TypeError") {
        return "Não foi possível acessar os dados. Verifique sua conexão com a rede.";
    }

    if (erro.name === "SyntaxError") {
        return "O arquivo dados.json possui um formato inválido.";
    }

    if (erro.name === "ErroHTTP") {
        return `O servidor respondeu com o erro ${erro.status} ao buscar as tarefas.`;
    }

    return "Ocorreu um erro inesperado ao carregar as tarefas.";
}

function instalarEventosDosControles() {
    campoBusca.addEventListener("input", (evento) => {
        estado.busca = evento.currentTarget.value;
        renderizarAplicacao(estado);
    });

    controles.addEventListener("change", (evento) => {
        if (!(evento.target instanceof HTMLInputElement)) return;

        if (evento.target.name === "status") {
            estado.status = evento.target.value;
        }

        if (evento.target.name === "prioridade") {
            estado.prioridade = evento.target.value;
        }

        renderizarAplicacao(estado);
    });

    campoOrdenacao.addEventListener("change", (evento) => {
        estado.ordenacao = evento.currentTarget.value;
        renderizarAplicacao(estado);
    });

    botaoLimpar.addEventListener("click", () => {
        limparCriterios(estado);
        renderizarAplicacao(estado);
    });
}

async function iniciar() {
    instalarEventosDosControles();
    renderizarAplicacao(estado);

    try {
        estado.tarefas = await carregarTarefas();
        estado.carregamento = "sucesso";
        estado.erro = null;
        renderizarAplicacao(estado);
        instalarEventosDoQuadro(quadro, estado.tarefas);
    } catch (erro) {
        estado.carregamento = "erro";
        estado.erro = criarMensagemDeErro(erro);
        renderizarAplicacao(estado);
    }
}

iniciar();
