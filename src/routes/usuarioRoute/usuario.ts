import { Router } from "express";
import { usuarioController } from "../../controllers/usuario";

const usuarioRouter = Router();

usuarioRouter.post('/', usuarioController.insertUsuario);
usuarioRouter.get('/', usuarioController.listUsuario);
usuarioRouter.get('/:id', usuarioController.getUsuario);
usuarioRouter.delete('/:id', usuarioController.deleteUsuario);
usuarioRouter.put('/:id', usuarioController.updateUsuario);

export default usuarioRouter