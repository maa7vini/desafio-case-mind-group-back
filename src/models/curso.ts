import { dbQuery, dbQueryFirst } from "../services/db";

export type Curso = {
    id: number;
    titulo: string;
    professorId: number;
    categoriaId: number;
    descricao: string;
}

const insertCurso = async (curso: Curso) => {
    await dbQuery(`INSERT INTO cursos (titulo, professorId, categoriaId, descricao) VALUES(?, ?, ?, ?)`, 
    [curso.titulo, curso.professorId, curso.categoriaId, curso.descricao]);

    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'cursos'`);

    return getCurso(retorno[0].Id);
}

const updateCurso = async (curso: Curso) => {
    await dbQuery(`UPDATE cursos SET titulo = ?, professorId = ?, categoriaId = ?, descricao = ?, WHERE id = ?`, 
    [curso.titulo, curso.professorId, curso.categoriaId, curso.descricao])

    return getCurso(curso.id);
}

const listCurso = async () => {
    const retorno = await dbQuery(`SELECT * FROM cursos`);

    return retorno as Curso[];
}

const getCurso = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM cursos WHERE id = ?`, [id]);

    return retorno as Curso | undefined; 
}

const deleteCurso = async (id: number) => {
    await dbQueryFirst(`DELETE FROM cursos WHERE id = ?`, [id]);
}

export const cursoModel = {
    insertCurso,
    listCurso,
    getCurso,
    deleteCurso,
    updateCurso
}