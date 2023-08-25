import { dbQuery, dbQueryFirst } from "../services/db";

export type Categoria = {
    id: number;
    nome: string;
    codImg: string;
}

const insertCategoria = async (categoria: Categoria) => {
    await dbQuery(`INSERT INTO categorias (nome, codImg) VALUES(?, ?)`, 
    [categoria.nome, categoria.codImg]);

    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'categorias'`);

    return retorno[0].Id as number | undefined;
}

const updateCategoria = async (categoria: Categoria) => {
    await dbQuery(`UPDATE categorias SET nome = ?, codImg = ?`,
    [categoria.nome, categoria.codImg])

    return getCategoria(categoria.id)
}

const listCategoria = async () => {
    const retorno = await dbQuery(`SELECT * FROM categorias`);

    return retorno as Categoria[];
}

const getCategoria = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM categorias WHERE id = ?`, [id]);

    return retorno as Categoria | undefined
}

const deleteCategoria = async (id: number) => {
    await dbQueryFirst(`DELETE FROM categorias WHERE id = ?`, [id]);
}

export const categoriaModel = {
    insertCategoria,
    updateCategoria,
    listCategoria,
    getCategoria,
    deleteCategoria
}