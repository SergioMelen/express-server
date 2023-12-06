const express = require('express');
const router = express.Router();

const tasks = [
  { id: 1, tarea: 'Hacer la compra', completada: true },
  { id: 2, tarea: 'Estudiar para el examen', completada: false },
  
];


router.get('/completas', (req, res) => {
  const tareasCompletas = tasks.filter(task => task.completada);
  res.json(tareasCompletas);
});

router.get('/incompletas', (req, res) => {
  const tareasIncompletas = tasks.filter(task => !task.completada);
  res.json(tareasIncompletas);
});

module.exports = router;
