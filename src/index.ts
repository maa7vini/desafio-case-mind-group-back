import dotenv from 'dotenv'
dotenv.config();

import express, { Request, Response } from "express";
import { cursoUseRoutes } from './routes/cursoRoute';
import bodyParser from 'body-parser';
import { usuarioUseRoutes } from './routes/usuarioRoute';
import { categoriaUseRoutes } from './routes/categoriaRoute';
const PORT = process.env.PORT || 9000;

const app = express();

app.use(bodyParser.json())

cursoUseRoutes(app)
usuarioUseRoutes(app)
categoriaUseRoutes(app)

app.get('/', (req: Request, res: Response) => {
    res.json({
        mensagem: "ok"
    })
})

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT );
});

