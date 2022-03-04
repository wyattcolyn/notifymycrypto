import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import database from './config/database';

const app = express();
const port = 8080; // default port to listen

// Serve all files in client
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

database();

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});