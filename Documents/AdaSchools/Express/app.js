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

// Nueva ruta para la raíz de la aplicación
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página de inicio!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

const verificarToken = (req, res, next) => {
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
};

app.get('/ruta-protegida', verificarToken, (req, res) => {
  res.json({ mensaje: 'Ruta protegida exitosamente', usuario: req.user });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
