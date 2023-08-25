import { Application, Router } from "express";
import usuarioRouter from "./usuario";

export const usuarioUseRoutes = (app: Application) => {
    const usuarioApiRouter = Router();

    usuarioApiRouter.use('/usuario', usuarioRouter)

    app.use('/', usuarioApiRouter);
}