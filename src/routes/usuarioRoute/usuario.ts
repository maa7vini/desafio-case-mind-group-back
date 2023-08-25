import { Router } from "express";
import { usuarioController } from "../../controllers/usuario";

const usuarioRouter = Router();

usuarioRouter.post('/cadastrar', usuarioController.insertUsuario);
usuarioRouter.get('/', usuarioController.listUsuario);
usuarioRouter.get('/:id', usuarioController.getUsuario);
usuarioRouter.delete('/:id', usuarioController.deleteUsuario);
usuarioRouter.put('/:id', usuarioController.updateUsuario);
usuarioRouter.post('/login', usuarioController.loginUsuario);
usuarioRouter.get('/verificar/:email',usuarioController.verificarEmail);

export default usuarioRouter