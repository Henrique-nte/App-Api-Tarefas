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

function addTasks(data, tasks) {
  for (const task of data) {
    tasks.push({
      id: task.id,
      titulo: task.titulo,
      descricao: task.descricao,
      concluida: task.concluida,
    });
  }
}

function filtroTarefas(tasks) {
  document.addEventListener("click", (event) => {
    const button = event.target.id;


    if (button === "filtro-todas") {
      listaTasks.innerHTML = "";

      for (const task of tasks) {
        if (task.concluida) {
          listaTasks.innerHTML += `
            <li class="tarefa concluida">
              <div class="tarefa-info">
                <h3>${task.titulo}</h3>
                <p>${task.descricao}</p>
              </div>
              <div class="acoes">
                <button class="btn-concluir" data-id = "${task.id}" disabled>Marcar como Concluída</button>
                <button class="btn-excluir" data-id = "${task.id}">Excluir</button>
              </div>
            </li>
          `;
        } else {
          listaTasks.innerHTML += `
            <li class="tarefa">
              <div class="tarefa-info">
                <h3>${task.titulo}</h3>
                <p>${task.descricao}</p>
              </div>
              <div class="acoes">
                <button class="btn-concluir" data-id = "${task.id}">Marcar como Concluída</button>
                <button class="btn-excluir" data-id = "${task.id}">Excluir</button>
              </div>
            </li>
          `;
        }
      }
    }

    if (button === "filtro-pendentes") {
      listaTasks.innerHTML = "";

      for (const task of tasks) {
        if (!task.concluida) {
          listaTasks.innerHTML += `
            <li class="tarefa">
              <div class="tarefa-info">
                <h3>${task.titulo}</h3>
                <p>${task.descricao}</p>
              </div>
              <div class="acoes">
                <button class="btn-concluir" data-id = "${task.id}">Marcar como Concluída</button>
                <button class="btn-excluir" data-id = "${task.id}">Excluir</button>
              </div>
            </li>
          `;
        }
      }
    }

    if (button === "filtro-concluidas") {
      listaTasks.innerHTML = "";

      for (const task of tasks) {
        if (task.concluida) {
          listaTasks.innerHTML += `
            <li class="tarefa concluida">
              <div class="tarefa-info">
                <h3>${task.titulo}</h3>
                <p>${task.descricao}</p>
              </div>
              <div class="acoes">
                <button class="btn-concluir" disabled data-id = "${task.id}">Marcar como Concluída</button>
                <button class="btn-excluir" data-id = "${task.id}">Excluir</button>
              </div>
            </li>
          `;
        }
      }
    }

  });
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

function showMessage(message, cor) {

  const h2 = document.createElement("h2");
  h2.classList.add("mensagem-sucesso");
  h2.style.display = 'block';
  h2.style.backgroundColor = cor;
  h2.textContent = message;

  formTask.append(h2);

  setTimeout(() => {
    location.reload();
  }, 600)

}

function listenerTasks(tasks) {
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
  addEventListener("click", (event) => {
    const button = event.target;

    if (button.classList.contains("btn-concluir") || button.classList.contains("btn-excluir")) {
      const idTask = button.dataset.id;
      console.log(idTask);
      if (idTask) {
        return idTask;
      }

      return;

    }

  });
}


async function fixTask() {

  const idTask = getId();

  try {
    const response = await fetch(`${url}/${idTask}/concluir`, {
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

}



async function removeTask(url, id) {
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
}

async function main() {
  const tasks = [];
  // console.log(tasks);

  const data = await getData(); //Captura os dados do fetch
  filtroTarefas(tasks); //Filtra as tarefas por todas/pendentes/concluidas
  listenerTasks(tasks); // Funcão que adiciona Tarefas
  fixTask(); //Função que altera o status concluida para true

  addTasks(data, tasks); //Adiciona as tasks no array local

  addEventListener("click", (event) => {
    const button = event.target;

    if (button.classList.contains("btn-excluir")) {
      let idTask = button.dataset.id;

      removeTask(url, idTask);
      showMessage("Tarefa excluida!", "orange");

    }


  });

}

main();
