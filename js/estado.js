export const estado = {
    tarefas: [],
    busca: "",
    status: "todos",
    prioridade: "todas",
    ordenacao: "prazo-asc",
    carregamento: "carregando",
    erro: null,
};

export function selecionarTarefas(estadoAtual) {
    const termo = estadoAtual.busca.trim().toLocaleLowerCase("pt-BR");

    const tarefasFiltradas = estadoAtual.tarefas
        .filter((tarefa) =>
            tarefa.titulo.toLocaleLowerCase("pt-BR").includes(termo),
        )
        .filter((tarefa) =>
            estadoAtual.status === "todos" || tarefa.status === estadoAtual.status,
        )
        .filter((tarefa) =>
            estadoAtual.prioridade === "todas" ||
            tarefa.prioridade === estadoAtual.prioridade,
        );

    return [...tarefasFiltradas].sort((tarefaA, tarefaB) => {
        const comparacao = tarefaA.prazo.localeCompare(tarefaB.prazo);
        return estadoAtual.ordenacao === "prazo-desc" ? -comparacao : comparacao;
    });
}

export function limparCriterios(estadoAtual) {
    estadoAtual.busca = "";
    estadoAtual.status = "todos";
    estadoAtual.prioridade = "todas";
    estadoAtual.ordenacao = "prazo-asc";
}
