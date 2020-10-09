import { config } from '../config/Constants'
import { Request, response, Response } from 'express'
import shortId from 'shortid'
import { URLModel } from '../database/model/URL'


export class URLController {
    public async shorten(req: Request, response: Response): Promise<void>{
        //Verificar existencia da URL

        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })

        if (url) {
            response.json(url)
            return
        }

        //Criar o hash para a URL

        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        
        //Salvar a url no banco de dados

        const newURL = await URLModel.create({ hash, shortURL, originURL })

        //Retornar a url encurtada

        response.json(newURL)
    }

    public async redirect(req: Request, response: Response): Promise<void>{
        //Pegar o hash
        const { hash } = req.params        

        //Encontrar a URL original do hash
                
        const url = await URLModel.findOne({ hash })
        
        if(url) {
            response.redirect(url.originURL)
            return
        }
            
        //Redirecionar para a URL original   

        response.status(400).json({ error: 'URL not found' })    
    }
}