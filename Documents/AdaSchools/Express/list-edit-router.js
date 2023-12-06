const express = require('express');
const router = express.Router();
let tasks = [
  { id: 1, tarea: 'Hacer la compra', completada: false },
  { id: 2, tarea: 'Estudiar para el examen', completada: true },
];

router.post('/crear', (req, res) => {
  const { tarea, completada } = req.body;

  if (!tarea || typeof completada !== 'boolean') {
    return res.status(400).json({ error: 'Los datos de la tarea son inválidos.' });
  }

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
