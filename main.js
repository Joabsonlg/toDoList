window.onload = (() => {
    montarTabela()
})

// localStorage persistence
const STORAGE_KEY = "todo-list";
const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach((todo, index) => {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

let data = todoStorage.fetch()

function adicionarTarefa() {
    let tarefa = {
        id: parseInt(document.getElementById("id").value),
        descricao: document.getElementById("descricao").value,
        executor: document.getElementById("executor").value,
        prazo: document.getElementById("prazo").value,
        status: document.getElementById("status").value
    }
    if (!tarefaValida(tarefa)) return
    if (tarefa.id !== "" && tarefa.id !== undefined && !isNaN(tarefa.id)) {
        let velhaTarefa = data.find(vt => vt.id === tarefa.id)
        data[data.indexOf(velhaTarefa)] = tarefa
        todoStorage.save(data)
        data = todoStorage.fetch()
    } else {
        tarefa.id = data.length + 1
        data.push(tarefa)
        todoStorage.save(data)
        data = todoStorage.fetch()
    }
    montarTabela()
    limparCampos()
}

function montarTabela() {
    let trs = ``
    if (data.length === 0) {
        const tr = `
        <tr>
        <td colspan="5" class="text-center">Nenhuma tarefa adicionada</td>
        </tr>
        `
        document.getElementById("tabelaTarefasBody").innerHTML = tr
        return
    }
    data.forEach(task => {
        const tr = `
        <tr>
            <td>${task.descricao}</td>
            <td>${task.executor}</td>
            <td>${task.prazo}</td>
            <td>${task.status}</td>
            <td class="text-center">
            <a class="btn btn-success btn-sm" onclick="editarTarefa(${task.id})"><i class="far fa-edit"></i></a>
                <a class="btn btn-danger btn-sm" onclick="removerTarefa(${task.id})"><i class="far fa-trash-alt"></i></a>
            </td>
        </tr>
        `
        trs += tr
    })
    document.getElementById("tabelaTarefasBody").innerHTML = trs
}

function removerTarefa(id) {
    let task = data.find(task => task.id === id)
    data.splice(data.indexOf(task), 1)
    todoStorage.save(data)
    data = todoStorage.fetch()
    montarTabela()
}

function editarTarefa(id) {
    let tarefa = data.find(tarefa => tarefa.id === id)
    document.getElementById("id").value = tarefa.id
    document.getElementById("descricao").value = tarefa.descricao
    document.getElementById("executor").value = tarefa.executor
    document.getElementById("prazo").value = tarefa.prazo
    document.getElementById("status").value = tarefa.status
}

function limparCampos() {
    document.getElementById("id").value = ''
    document.getElementById("descricao").value = ''
    document.getElementById("executor").value = ''
    document.getElementById("prazo").value = ''
    document.getElementById("status").value = ''
}

function tarefaValida(tarefa) {
    return tarefa.descricao !== "" && tarefa.executor !== "" && tarefa.prazo !== "" && tarefa.status !== ""
}