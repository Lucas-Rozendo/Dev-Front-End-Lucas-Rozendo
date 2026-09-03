const nomesDasPrioridades = {
    baixa: "Baixa",
    media: "Média",
    alta: "Alta",
};

function criarParagrafo(texto, classe) {
    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    if (classe) {
        paragrafo.classList.add(classe);
    }

    return paragrafo;
}

function formatarPrazo(prazo) {
    const [ano, mes, dia] = prazo.split("-");
    return `${dia}/${mes}/${ano}`;
}

export function criarCartao(tarefa) {
    const cartao = document.createElement("article");
    cartao.className = "cartao";
    cartao.dataset.tarefaId = tarefa.id;

    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;

    const prioridade = criarParagrafo(
        `Prioridade: ${nomesDasPrioridades[tarefa.prioridade]}`,
        "prioridade",
    );
    prioridade.classList.add(`prioridade-${tarefa.prioridade}`);

    const botao = document.createElement("button");
    const textoDoBotao = document.createElement("span");
    botao.type = "button";
    botao.dataset.acao = "ver-detalhes";
    textoDoBotao.textContent = "Ver detalhes";
    botao.append(textoDoBotao);

    cartao.append(
        titulo,
        criarParagrafo(`Projeto: ${tarefa.projeto}`),
        criarParagrafo(`Responsável: ${tarefa.responsavel}`),
        prioridade,
        criarParagrafo(`Prazo: ${formatarPrazo(tarefa.prazo)}`, "prazo"),
        botao,
    );

    return cartao;
}

export function renderizarTarefas(tarefas, quadro) {
    const listas = quadro.querySelectorAll("[data-lista-status]");

    listas.forEach((lista) => {
        const status = lista.dataset.listaStatus;
        const tarefasDoStatus = tarefas.filter((tarefa) => tarefa.status === status);
        const cartoes = tarefasDoStatus.map(criarCartao);
        const itens = cartoes.map((cartao) => {
            const item = document.createElement("li");
            item.append(cartao);
            return item;
        });

        if (itens.length === 0) {
            const mensagem = document.createElement("li");
            mensagem.className = "mensagem-coluna-vazia";
            mensagem.textContent = "Nenhuma tarefa neste status.";
            lista.replaceChildren(mensagem);
            return;
        }

        lista.replaceChildren(...itens);
    });
}

export function instalarEventosDoQuadro(quadro, tarefas) {
    quadro.addEventListener("click", (evento) => {
        if (!(evento.target instanceof Element)) return;

        const acionador = evento.target.closest('[data-acao="ver-detalhes"]');

        if (!acionador || !quadro.contains(acionador)) return;

        const cartao = acionador.closest(".cartao");

        if (!cartao) return;

        const tarefa = tarefas.find((item) => item.id === cartao.dataset.tarefaId);

        if (tarefa) {
            console.log(tarefa);
        }
    });
}
