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

const tasks = []

function addTasks(id, titulo, descricao, concluida) {
    tasks.push({ id: id, titulo: titulo, descricao: descricao, concluida: concluida });
}

async function main() {
    const data = await getData();

    for (const task of data) {
        addTasks(task.id, task.titulo, task.descricao, task.concluida);
    }
}

main();

console.log(tasks);