import nodemailer from 'nodemailer'

let mailTransporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "matheusgutisp@hotmail.com",
        pass: "ma102030"
    }
})

export default function enviarEmailVerficacao (email: string, link?: string) {
    if(!email){
        return "Email não informado"
    }
    try {
        
        let details = {
            from: "matheusgutisp@hotmail.com",
            to: email,
            subject: "Email de verificação - Projeto Mind Group",
            html: "<p> Professor, seja bem vindo a nossa plataforma! </p> <br> <a href='https://www.google.com.br/' target='_blank'> Clique aqui para confirmar seu email </a>"
        }
        
        mailTransporter.sendMail(details)

        return "Email enviado com sucesso!"

    } catch (error: any) {
        
        return error.message

    }
} 
