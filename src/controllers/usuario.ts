import { Request, Response } from "express"
import { badRequest, internalServerError, notFound, ok } from "../services/util";
import { Usuario, usuarioModel } from './../models/usuario';

const insertUsuario = (req: Request, res: Response) => {

    const usuario = req.body as Usuario

    {
        if(!usuario)
            return badRequest(res, "Usuário inválido");

        if(!usuario.nome)
            return badRequest(res, "Informe o nome");

        if(!usuario.email)
            return badRequest(res, "Informe o email");

        if(!usuario.senha)
            return badRequest(res, "Informe a senha");

    }

    usuarioModel.insertUsuario(usuario)
        .then(usuario => {
            res.json(usuario)
        })
        .catch(err => internalServerError(res, err))

}

const updateUsuario = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    const usuario = req.body as Usuario;

    {
        if(!usuario)
            return badRequest(res, "Usuário inválido");

        if(!usuario.nome)
            return badRequest(res, "Informe o nome do usuário");

        if(!usuario.email)
            return badRequest(res, "Informe o email do usuário");

        if(!usuario.senha)
            return badRequest(res, "Informe a senha do usuário");

        const usuarioSaved = await usuarioModel.getUsuario(id)
        if(!usuarioSaved)
            return notFound(res)
    }

    return usuarioModel.updateUsuario(usuario)
        .then(usuario => {
            res.json(usuario)
        })
        .catch(err => internalServerError(res, err))

}

const listUsuario = (req: Request, res: Response) => {
    usuarioModel.listUsuario()
        .then(usuario => {
            res.json(usuario)
        })
        .catch(err => internalServerError(res, err))
}

const getUsuario = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    usuarioModel.getUsuario(id)
        .then((usuario) => {
            if(usuario)
                return res.json(usuario)
            else
                return notFound(res)
        })
        .catch(err => internalServerError(res, err))
}

const deleteUsuario = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    usuarioModel.deleteUsuario(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err))
}

export const usuarioController = {
    insertUsuario,
    updateUsuario,
    listUsuario,
    getUsuario,
    deleteUsuario
}