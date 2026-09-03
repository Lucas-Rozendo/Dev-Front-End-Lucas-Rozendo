export async function carregarTarefas() {
    const resposta = await fetch("./dados.json");

    if (!resposta.ok) {
        const erro = new Error(`Falha de protocolo: status ${resposta.status}.`);
        erro.name = "ErroHTTP";
        erro.status = resposta.status;
        throw erro;
    }

    const dados = await resposta.json();

    if (!dados || !Array.isArray(dados.tarefas)) {
        throw new SyntaxError("O JSON precisa ter uma chave tarefas contendo um array.");
    }

    const camposObrigatorios = ["id", "titulo", "status", "prioridade", "prazo"];
    const formatoValido = dados.tarefas.every((tarefa) =>
        camposObrigatorios.every((campo) => campo in tarefa),
    );

    if (!formatoValido) {
        throw new SyntaxError("Uma ou mais tarefas não possuem todos os campos obrigatórios.");
    }

    return dados.tarefas;
}
