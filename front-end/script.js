const formTask = document.getElementById("form-tarefa");

const tituloTask = formTask.querySelector("input");
const descTask = formTask.querySelector("textarea");

const listaTasks = document.getElementById("lista-tarefas");

const url = "http://localhost:3000/tasks";

async function getData() {
  try {
    const response = await fetch("http://localhost:3000/tasks");

    if (!response.ok) {
      throw new Error(`Erro na response: ${response.status}`);
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Ocorreu um erro", error.message);
  }
}

getData();

function addToTasks(data, tasks) {
  for (const task of data) {
    tasks.push({
      id: task.id,
      titulo: task.titulo,
      descricao: task.descricao,
      concluida: task.concluida,
    });
  }
}


async function sendNewTask(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro no post: ${response.status}`);
    }

  } catch (error) {
    console.error("Falha na requisição:", error.message);
  }

}

function showMessage(message, color) {

  const h2 = document.createElement("h2");
  h2.classList.add("mensagem-sucesso");
  h2.style.display = 'block';
  h2.style.backgroundColor = color;
  h2.textContent = message;

  formTask.append(h2);

  setTimeout(() => {
    location.reload();
  }, 600)

}

function addTask(tasks) {
  const button = formTask.querySelector("button");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    if (!tituloTask.value) {
      showMessage("Titulo vazio!", "red");
      return;
    }

    for (const task of tasks) {
      if (task.titulo == tituloTask.value) {
        showMessage("Tarefa duplicada!", "red");
        return;
      }
    }

    let task = {
      titulo: tituloTask.value,
      descricao: descTask.value
    };

    sendNewTask(url, task)

    showMessage("Tarefa adicionada!", "green");

  });
}

function getId() {
  return new Promise((resolve) => {
    addEventListener("click", (event) => {
      const button = event.target;

      if (button.classList.contains("btn-concluir")) {
        const idTask = button.dataset.id;

        if (idTask) {
          resolve({ id: idTask, acao: "concluir" });
        }

      }
      if (button.classList.contains("btn-excluir")) {
        const idTask = button.dataset.id;

        if (idTask) {
          resolve({ id: idTask, acao: "excluir" });
        }
      }

      return;
    });

  });
}

async function fixTask() {

  const { id, acao } = await getId();
  if (acao === "concluir") {
    try {
      const response = await fetch(`${url}/${id}/concluir`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Erro ao concluir tarefa.");
      }

      const taskAtualizada = await response.json();
      console.log("Tarefa Concluida", taskAtualizada);


    } catch (error) {
      console.error("Erro:", error.message);
    }

    showMessage("Tarefa marcada como concluída!", "blue");
  }

  return;

}

async function removeTask() {
  const { id, acao } = await getId();

  if (acao === "excluir") {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir tarefa.");
      }

      const taskDeletada = await response.json();
      console.log("Tarefe excluida", taskDeletada);

    } catch (error) {
      console.error("Erro: ", error.message);
    }

    showMessage("Tarefa excluida!", "orange");

  }

  return;

}

async function main() {
  const tasks = [];
  // console.log(tasks);
  const data = await getData(); //Captura os dados do fetch get

  // filtroTasks(tasks); //Filtra as tarefas por todas/pendentes/concluidas
  addTask(tasks); // Funcão que adiciona Tarefas no server
  fixTask(); //Função que altera o status concluida para true
  removeTask(); //Função que permite remover as tasks
  addToTasks(data, tasks); //Adiciona as tasks no array local
  //Adicionar funcionalidade que atualiza meu front inves de atualizar a pagina inteira

  const buttonAll = document.getElementById("filtro-todas");
  const buttonPendents = document.getElementById("filtro-pendentes");
  const buttonFix = document.getElementById("filtro-concluidas");

  const buttons = [buttonAll, buttonPendents, buttonFix];

  buttons.forEach((botao) => {

    botao.addEventListener("click", () => {

      

      botao.classList.add("active");
    });

  });


}


main();
