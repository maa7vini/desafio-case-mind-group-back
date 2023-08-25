import { Request, Response } from "express"
import { badRequest, internalServerError, notFound, ok } from "../services/util";
import { Curso, cursoModel } from "../models/curso";

const insertCurso = (req: Request, res: Response) => {

    const curso = req.body as Curso;

    {
        if(!curso)
            return badRequest(res, "Curso inválido");

        if(!curso.titulo)
            return badRequest(res, "Informe o nome do curso");

        if(!curso.professorId)
            return badRequest(res, "Informe o professor responsável");

        if(!curso.categoriaId)
            return badRequest(res, "Informe a categoria do curso");

        if(!curso.descricao)
            return badRequest(res, "Descreva o curso");
    }

    cursoModel.insertCurso(curso)
        .then(curso => {
            res.json(curso)
        })
        .catch(err => internalServerError(res, err))

}

const updateCurso = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    const curso = req.body as Curso;

    {
        if(!curso)
            return badRequest(res, "Curso inválido");

        if(!curso.titulo)
            return badRequest(res, "Informe o nome do curso");

        if(!curso.professorId)
            return badRequest(res, "Informe o professor responsável");

        if(!curso.categoriaId)
            return badRequest(res, "Informe a categoria do curso");

        if(!curso.descricao)
            return badRequest(res, "Descreva o curso");

        const cursoSaved = await cursoModel.getCurso(id)
        if(!cursoSaved)
            return notFound(res)
    }

    return cursoModel.updateCurso(curso)
        .then(curso => {
            res.json(curso)
        })
        .catch(err => internalServerError(res, err))

}

const listCurso = (req: Request, res: Response) => {
    cursoModel.listCurso()
        .then(curso => {
            res.json(curso)
        })
        .catch(err => internalServerError(res, err))
}

const getCurso = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    cursoModel.getCurso(id)
        .then((curso) => {
            if(curso)
                return res.json(curso)
            else
                return notFound(res)
        })
        .catch(err => internalServerError(res, err))
}

const deleteCurso = (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    cursoModel.deleteCurso(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err))
}


export const cursoController = {
    insertCurso,
    listCurso,
    getCurso,
    deleteCurso,
    updateCurso
}