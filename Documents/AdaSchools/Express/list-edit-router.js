const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Cuerpo de la solicitud vacío.' });
    }
    const { tarea, completada } = req.body;
    if (!tarea || typeof completada !== 'boolean') {
      return res.status(400).json({ error: 'Los datos de la tarea son inválidos.' });
    }
  }
next();
});

router.post('/crear', (req, res) => {
  const { tarea, completada } = req.body;

  const newTask = { id: tasks.length + 1, tarea, completada };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.delete('/eliminar/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'ID de tarea inválido.' });
  }

  tasks = tasks.filter(task => task.id !== taskId);

  res.json({ message: 'Tarea eliminada exitosamente.' });
});

router.put('/actualizar/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'ID de tarea inválido.' });
  }

  const updatedTask = tasks.find(task => task.id === taskId);

  if (!updatedTask) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  const { tarea, completada } = req.body;

  if (tarea) {
    updatedTask.tarea = tarea;
  }

  if (typeof completada === 'boolean') {
    updatedTask.completada = completada;
  }

  res.json(updatedTask);
});

module.exports = router;
