import { config } from '../config/Constants'
import { Request, response, Response } from 'express'
import shortId from 'shortid'


export class URLController {
    public async shorten(req: Request, response: Response): Promise<void>{
        //Verificar existencia da URL
        //Criar o hash para a URL
        const { originURL } = req.body
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        //Salvar a url no banco de dados
        //Retornar a url encurtada
        response.json({ originURL, hash, shortURL })
    }

    public async redirect(req: Request, response: Response): Promise<void>{
        //Pegar o hash
        const { hash } = req.params
        //Encontrar a URL original do hash
        const url = {
            originURL: "https://www.google.com/search?q=banana+frita&oq=banana+frita&aqs=chrome..69i57.3571j0j15&sourceid=chrome&ie=UTF-8",
            hash: "CVR82optx",
            shortURL: "http://localhost:5000/CVR82optx"
        }        
        //Redirecionar para a URL original   
        response.redirect(url.originURL)     
    }
}