import { Router } from "express";
import { categoriaController } from "../../controllers/categoria";

const categoriaRouter = Router()

categoriaRouter.post('/', categoriaController.insertCategoria)
categoriaRouter.get('/', categoriaController.listCategoria);
categoriaRouter.get('/:id', categoriaController.getCategoria);
categoriaRouter.delete('/:id', categoriaController.deleteCategoria);
categoriaRouter.put('/:id', categoriaController.updateCategoria);

export { categoriaRouter }