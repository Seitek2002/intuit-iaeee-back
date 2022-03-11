const express = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // <== Will be created later
const middlewares = jsonServer.defaults();
const authRouter = require('./routes/auth.routes');
const corsMiddleware = require('./middleware/cors.middleware');
const app = express();
const port = process.env.PORT || 3200; // <== You can change the port

app.use(corsMiddleware);
app.use(express.json());
app.use('/api/auth', authRouter);

server.use(middlewares);
server.use(router);

server.listen(port, () => console.log("json-server running"));
app.listen(8080, () => console.log("nodemailer running"));
