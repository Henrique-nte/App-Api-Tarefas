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
                <button class="btn-concluir" disabled>Marcar como Concluída</button>
                <button class="btn-excluir">Excluir</button>
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
                <button class="btn-concluir">Marcar como Concluída</button>
                <button class="btn-excluir">Excluir</button>
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
                <button class="btn-concluir">Marcar como Concluída</button>
                <button class="btn-excluir">Excluir</button>
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
                <button class="btn-concluir" disabled>Marcar como Concluída</button>
                <button class="btn-excluir">Excluir</button>
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

async function main() {
  const tasks = [];

  const data = await getData();
  addTasks(data, tasks);
  filtroTarefas(tasks);
  // console.log(tasks);

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

main();
