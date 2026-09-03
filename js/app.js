import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";
import { instalarEventosDoQuadro } from "./renderizacao.js";

const quadro = document.querySelector("#quadro-tarefas");

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

async function iniciar() {
    renderizarEstado("carregando");

    try {
        const tarefas = await carregarTarefas();

        if (tarefas.length === 0) {
            renderizarEstado("vazio", tarefas);
            return;
        }

        renderizarEstado("sucesso", tarefas);
        instalarEventosDoQuadro(quadro, tarefas);
    } catch (erro) {
        renderizarEstado("erro", criarMensagemDeErro(erro));
    }
}

iniciar();
