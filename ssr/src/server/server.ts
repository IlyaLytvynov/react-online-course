import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import render from './render';

const app = express();
const PORT = process.env.PORT || 4000;
const pathName = path.resolve(__dirname, './lib/public');

app.use(express.static(pathName));
app.use(bodyParser.json());
app.use(cors());

const getPage = async (req: Request, res: Response) => {
  try {
    const reactDom = await render(req);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(reactDom);
  } catch (e) {
    console.error(e);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`${e}`);
  }
};

app.get('/', getPage);

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
