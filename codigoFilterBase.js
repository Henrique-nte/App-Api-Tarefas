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