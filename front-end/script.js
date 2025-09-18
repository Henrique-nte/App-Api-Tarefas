async function getData() {
  try {
    const response = await fetch("http://localhost:3000/tasks");

    if (!response.ok) {
      throw new Error(`Erro na response: ${response.status}`);
    }

    const data = response.json();

    return data;
  } catch (error) {
    console.error("Ocorreu um erro", error.message);
  }
}

getData();

const tasks = [];

function addTasks(data) {
  for (const task of data) {
    tasks.push({
      id: task.id,
      titulo: task.titulo,
      descricao: task.descricao,
      concluida: task.concluida,
    });
  }
}

function filtroTarefas() {
  document.addEventListener("click", (event) => {
    const button = event.target.id;
    let listaTasks = document.getElementById("lista-tarefas");

    if (button === "filtro-todas") {
      listaTasks.innerHTML = "";

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].concluida === true) {
          listaTasks.innerHTML += `
                 <li class="tarefa concluida">
                     <div class="tarefa-info">
                         <h3>${tasks[i].titulo}</h3>
                         <p>${tasks[i].descricao}</p>
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
                             <h3>${tasks[i].titulo}</h3>
                             <p>${tasks[i].descricao}</p>
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

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].concluida === false) {
          listaTasks.innerHTML += `
                 <li class="tarefa">
                     <div class="tarefa-info">
                         <h3>${tasks[i].titulo}</h3>
                         <p>${tasks[i].descricao}</p>
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

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].concluida === true) {
          listaTasks.innerHTML += `
                 <li class="tarefa concluida">
                     <div class="tarefa-info">
                         <h3>${tasks[i].titulo}</h3>
                         <p>${tasks[i].descricao}</p>
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

    console.log(response);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const resultado = await resposta.json();
    console.log("Sucesso:", resultado);

    return resultado;
  } catch (error) {
    console.error("Falha na requisição:", error.message);
  }
}

async function main() {
  const data = await getData();
  addTasks(data);
  filtroTarefas();
  // console.log(tasks);

  const formTask = document.getElementById("form-tarefa");
  const button = formTask.querySelector("button");

  let url = "http://localhost:3000/tasks";

  button.addEventListener("click", (event) => {
    event.preventDefault();

    const tituloTask = formTask.querySelector("input").value;
    const descTask = formTask.querySelector("textarea").value;

    let array = {
      title: tituloTask,
      desc: descTask
    };

    sendNewTask(url, array);
  });
}

main();
