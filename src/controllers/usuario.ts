import { Request, Response } from "express"
import { badRequest, internalServerError, notFound, ok } from "../services/util";
import { Usuario, usuarioModel } from './../models/usuario';
import enviarEmailVerficacao from "../services/email";
import { hash } from "bcrypt";
import { randomInt } from "crypto";
import { compare } from "bcrypt";

const insertUsuario = async (req: Request, res: Response) => {

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

    const randomSalt = randomInt(10, 16)
    const senhaHash = await hash(usuario.senha, randomSalt)

    usuario.senha = senhaHash

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

const loginUsuario = async (req: Request, res: Response) => {
    try {
        const {email, senha} = req.body

        const resultSenhaCrypt = await usuarioModel.verificarUsuarioSenha(email)

        const senhaString = String(senha) 

        const senhaValida = await compare(senhaString, resultSenhaCrypt.senha)

        if(senhaValida){
            res.send("Logado com sucesso!") 
        }else{
            res.send("Acesso negado")
        }
    } catch (error: any) {
        internalServerError(res, error)
        return error.message
    }
}

const verificarEmail = async (req: Request, res: Response) => {
    try {
        const email = req.params.email
        const result = await enviarEmailVerficacao(email)
        return result
    } catch (error: any) {
        internalServerError(res, error)
        return error.message
    }
}

export const usuarioController = {
    insertUsuario,
    updateUsuario,
    listUsuario,
    getUsuario,
    deleteUsuario,
    loginUsuario,
    verificarEmail
}