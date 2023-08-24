import express, { Request, Response } from "express";

const PORT = process.env.PORT || 9000;

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.json({
        mensagem: "ok"
    })
})

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta ' + PORT );
});

