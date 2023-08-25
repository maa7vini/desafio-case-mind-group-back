import { Application, Router } from "express";
import { categoriaRouter } from "./categoria";

export const categoriaUseRoutes = (app: Application) => {
    const categoriaApiRouter = Router()

    categoriaApiRouter.use('/categoria', categoriaRouter)

    app.use('/', categoriaApiRouter)
}