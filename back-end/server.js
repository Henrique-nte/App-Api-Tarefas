const express = require("express");
const cors = require("cors");

const app = express(); //Criação do servidor

const port = 3000; //Será executado na porta 3000

app.use(express.json()); //Permite receber json nas requisições
app.use(cors({
  origin: ['http://127.0.0.1:5500'],
  methods: '*',
  allowedHeaders: '*'
}));

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
];

let nextId = 4;

//Faço um get de tarefas
app.get("/tasks", (req, response) => {
  response.send(tasks);
});

//Post para adicionar novas tasks
app.post("/tasks", (req, response) => {


  const { title, desc } = req.body;
  console.log(req.body);


  tasks.push({
    id: nextId,
    titulo: title,
    descricao: desc,
    concluida: false
  });

  nextId++;
  response.status(201);
});

//Patch para atualizar a tarefa como concluida
app.patch("/tasks/:id/concluir", (req, response) => {
  const idTask = parseInt(req.params.id);

  const task = tasks.find((task) => task.id == idTask);

  if (task) {
    task.concluida = true;
    response.status(200).send(task);
  }

  response.status(404).send("Task nao encontrada.");
});

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
