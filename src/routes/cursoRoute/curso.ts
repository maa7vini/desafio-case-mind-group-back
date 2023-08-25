import { Router } from "express";
import { cursoController } from "../../controllers/curso";

const cursoRouter = Router();
cursoRouter.post('/', cursoController.insertCurso);
cursoRouter.get('/', cursoController.listCurso);
cursoRouter.get('/:id', cursoController.getCurso);
cursoRouter.delete('/:id', cursoController.deleteCurso);
cursoRouter.put('/:id', cursoController.updateCurso);


export { cursoRouter }