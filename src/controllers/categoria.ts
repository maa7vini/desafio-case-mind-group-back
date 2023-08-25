import { Response, Request } from "express";
import { badRequest, internalServerError, notFound, ok } from "../services/util";
import { Categoria, categoriaModel } from "../models/categoria";

const insertCategoria = (req: Request, res: Response) => {

    const categoria = req.body as Categoria

    {
        if(!categoria)
            return badRequest(res, "Categoria inválida");

        if(!categoria.nome)
            return badRequest(res, "Informe o nome da categoria");

        if(!categoria.codImg)
            return badRequest(res, "Informe o código de imagem da categoria");
    }

    categoriaModel.insertCategoria(categoria)
        .then(categoria => {
            res.json(categoria)
        })
        .catch(err => internalServerError(res, err))

}

const updateCategoria = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    const categoria = req.body as Categoria;

    {
        if(!categoria)
            return badRequest(res, "Categoria inválida");

        if(!categoria.nome)
            return badRequest(res, "Informe o nome da categoria");

        if(!categoria.codImg)
            return badRequest(res, "Informe o codigo de imagem da categoria");

        const categoriaSaved = await categoriaModel.getCategoria(id)
        if(!categoriaSaved)
            return notFound(res)
    }

    return categoriaModel.updateCategoria(categoria)
        .then(categoria => {
            res.json(categoria)
        })
        .catch(err => internalServerError(res, err))

}

const listCategoria = (req: Request, res: Response) => {
    categoriaModel.listCategoria()
        .then(categoria => {
            res.json(categoria)
        })
        .catch(err => internalServerError(res, err))
}

const getCategoria = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    categoriaModel.getCategoria(id)
        .then((categoria) => {
            if(categoria)
                return res.json(categoria)
            else
                return notFound(res)
        })
        .catch(err => internalServerError(res, err))
}

const deleteCategoria = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    categoriaModel.deleteCategoria(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err))
}

export const categoriaController = {
    insertCategoria,
    updateCategoria,
    listCategoria,
    getCategoria,
    deleteCategoria
}

