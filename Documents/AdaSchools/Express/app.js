const express = require('express');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a la aplicación');
});

app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
