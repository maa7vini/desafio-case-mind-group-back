import { dbQuery, dbQueryFirst } from "../services/db";

export type Usuario = {
    id: number;
    nome: string;
    email: string;
    senha: string;
    emailVerificado: number;
}

// Email não verificado = 0 \\
// Email verificado = 1 \\

const insertUsuario = async (usuario: Usuario) => {
    await dbQuery(`INSERT INTO usuarios (nome, email, senha) VALUES(?, ?, ?)`, 
    [usuario.nome, usuario.email, usuario.senha]);

    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE name = 'usuarios'`);

    return "Usuário cadastrado com sucesso";
}

const updateUsuario = async (usuario: Usuario) => {
    await dbQuery(`UPDATE usuarios SET nome = ?, email = ?, senha = ?`,
    [usuario.nome, usuario.email, usuario.senha])

    return getUsuario(usuario.id)
}

const listUsuario = async () => {
    const retorno = await dbQuery(`SELECT * FROM usuarios`);

    return retorno as Usuario[];
}

const getUsuario = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM usuarios WHERE id = ?`, [id]);

    return retorno as Usuario | undefined
}

const deleteUsuario = async (id: number) => {
    await dbQueryFirst(`DELETE FROM usuarios WHERE id = ?`, [id]);
}

const verificarUsuarioSenha = async (email: string) => {
    const retorno = await dbQueryFirst(`SELECT senha FROM usuarios WHERE email = ?`, [email]);

    return retorno
}

export const usuarioModel = {
    insertUsuario,
    updateUsuario,
    listUsuario,
    getUsuario,
    deleteUsuario,
    verificarUsuarioSenha
}