const express = require("express");
const cors = require("cors");

const app = express(); //Criação do servidor

const port = 3000; //Será executado na porta 3000

app.use(express.json()); //Permite receber json nas requisições
app.use(cors());

//Array
const tasks = [
  {
    id: 1,
    titulo: "Planejar Sprint",
    descricao: "Definir as proximas atividades do time de desenvolvimento",
    concluida: false,
  },
  {
    id: 2,
    titulo: "Criar o layout",
    descricao: "Desenvolver o layout",
    concluida: true,
  },
  {
    id: 3,
    titulo: "Desenvolver a API",
    descricao: "Construir um serve.js com node, express e cors",
    concluida: false,
  },
  {
    id: 4,
    titulo: "Testar a aplicação",
    descricao: "Executar testes unitários e de integração",
    concluida: false,
  },
  {
    id: 5,
    titulo: "Documentar endpoints",
    descricao: "Criar documentação da API para o time de front-end",
    concluida: false,
  },
  {
    id: 6,
    titulo: "Deploy no servidor",
    descricao: "Publicar a aplicação em ambiente de produção",
    concluida: false,
  },
];


let nextId = 4;

//Faço um get de tarefas
app.get("/tasks", (req, response) => {
  response.json(tasks);
});

function addTask(tasks, newTask) {

  tasks.push({
    id: newTask.id,
    titulo: newTask.titulo,
    descricao: newTask.descricao,
    concluida: false
  });

}

//Post para adicionar novas tasks
app.post("/tasks", (req, response) => {

  const { titulo, descricao } = req.body;

  const newTask = {
    "id": nextId,
    "titulo": titulo,
    "descricao": descricao,
    "concluida": false
  }

  addTask(tasks, newTask); //Adiciono a task em taks

  nextId++;
  response.status(201).json({ message: "Tarefa adicionada com sucesso!", task: newTask });

});

//Patch para atualizar a tarefa como concluida
app.patch("/tasks/:id/concluir", (req, response) => {
  const idTask = parseInt(req.params.id);

  const task = tasks.find((task) => task.id == idTask);

  if (task) {
    task.concluida = true;
    return response.status(200).send(task);
  }

  response.status(404).send("Task nao encontrada.");

});

//Deletar Tarefas
app.delete("/tasks/:id", (req, response) => {
  const idTask = parseInt(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === idTask);
  if (taskIndex === -1) {
    return response.status(404).json({ error: "Tarefa não encontrada" });
  }

  //Se encontrar
  const deletedTask = tasks.splice(taskIndex, 1);

  return response.status(200).json({ message: "Tarefa Deletada", task: deletedTask[0] });

});


app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
