const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
const viewRouter = require('./list-view-router');
const editRouter = require('./list-edit-router');

dotenv.config();

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

app.use(express.json());
app.use('/list-view', viewRouter);
app.use('/list-edit', editRouter);

const validarMetodoHTTP = (req, res, next) => {
  const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!metodosValidos.includes(req.method)) {
    return res.status(405).json({ error: 'Método HTTP no permitido.' });
  }
  next();
};

app.use(validarMetodoHTTP);

//Lista de tareas 
let tasks = [
  { id: 1, title: 'Hacer la compra', completed: false },
  { id: 2, title: 'Estudiar para el examen', completed: true },
];

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// Obtener tareas completas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.completed);
  res.status(200).json(completedTasks);
});

//Obtener tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  res.status(200).json(incompleteTasks);
});

//Obtener una sola tarea por su ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

//Crear nueva tarea
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

//Actualizar tarea
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].title = req.body.title || tasks[taskIndex].title;
    tasks[taskIndex].completed = req.body.completed || tasks[taskIndex].completed;

    res.status(200).json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

//Eliminar tarea
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página de inicio nuevo!');
});
app.get('/ruta-protegida', verificarToken, (req, res) => {
  res.json({ mensaje: 'Ruta protegida exitosamente', usuario: req.user });
});
function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
}
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
