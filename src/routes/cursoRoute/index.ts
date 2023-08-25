import { Application, Router } from "express";
import { cursoRouter } from "./curso";

export const cursoUseRoutes = (app: Application) => {
    const apiRouter = Router();
    
    apiRouter.use('/curso', cursoRouter);

    app.use('/', apiRouter);
}