import 'dotenv/config';
import express from 'express';

const port = process.env.PORT;

const app = express();

import queryRoutes from './query.js';

app.use('/query', queryRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

