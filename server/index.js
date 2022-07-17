import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { TodoController } from './controllers/index.js';

mongoose
  .connect(
    'mongodb+srv://admin:325698147@cluster0.jjoay80.mongodb.net/todo?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('DB okay');
  })
  .catch((err) => {
    console.log('DB error', err);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/createInformation', TodoController.create);
app.get('/information', TodoController.getTodo);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server Ok');
});
