const express = require('express');
const router = express.Router();
const tasks = [
  { id: 1, tarea: 'Hacer la compra', completada: true },
  { id: 2, tarea: 'Estudiar para el examen', completada: false },
];
const validarParametros = (req, res, next) => {
  const taskId = req.params.id;

  if (!taskId || isNaN(parseInt(taskId, 10))) {
    return next({ status: 400, message: 'Parámetro de ID inválido.' });
  }
  next();
};
router.get('/:id', validarParametros);

router.get('/completas', (req, res) => {
  const tareasCompletas = tasks.filter(task => task.completada);
  res.json(tareasCompletas);
});

router.get('/incompletas', (req, res) => {
  const tareasIncompletas = tasks.filter(task => !task.completada);
  res.json(tareasIncompletas);
});
router.get('/this-should-exist', (req, res) => {
  res.status(404).send('<h1>Error 404: Not found</h1>');
});

router.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(status).send(`<h1>Error ${status}: ${message}</h1>`);
});

module.exports = router;
