import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from "path"
import { fileURLToPath } from "url";

const port = process.env.PORT;

const app = express();

import queryRoutes from './query.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/query', queryRoutes);

app.use(
  express.static(
    path.join(__dirname, "../../Frontend/dist")
  )
);

app.get(/.*/, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../Frontend/dist/index.html")
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

