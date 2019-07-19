import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morganBody from 'morgan-body';
import { AddressInfo } from 'net';

import { enhanceResponse } from './middleware/auth/enhanceResponse';
import * as requestHandlers from './requestHandlers';
import { connectToDb, disconnectFromDb } from './store/connection';

const PORT = Number(process.env.PORT) || 8082;
const HOST = process.env.HOST || 'localhost';

export const app = express();

if (process.env.NODE_ENV !== 'test') {
  morganBody(app);
}

app.use(enhanceResponse);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// tslint:disable-next-line:no-commented-code, We're not generating swagger :c
// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from './swagger.json';
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (_, res) => {
  res.send(`Hello! 👋 ${new Date().toLocaleString()}`);
});

app.use(requestHandlers.accountsRouter);
app.use(requestHandlers.filesRouter);
app.use(requestHandlers.groupsRouter);
app.use(requestHandlers.usersRouter);
app.use(requestHandlers.gradesRouter);

let server: import('http').Server;

export const startServer = () => {
  connectToDb();
  server = app.listen(PORT, HOST, () => {
    console.log(
      `Your app is listening on port: ${(server.address() as AddressInfo).port}`
    );
  });
};

export const stopServer = () => {
  server.close();
  disconnectFromDb();
};
