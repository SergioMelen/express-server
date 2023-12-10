const express = require('express');
const app = express();
const viewRouter = require('./list-view-router');
const editRouter = require('./list-edit-router');

app.use(express.json());
app.use('/list-view',viewRouter);
app.use('/list-edit',editRouter);

const validarMetodoHTTP = (req, res, next) => {
  const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!metodosValidos.includes(req.method)) {
    return res.status(405).json({ error: 'Método HTTP no permitido.' });
  }
next();
};
app.use(validarMetodoHTTP);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
