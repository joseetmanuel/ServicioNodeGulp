import { Request } from 'express';
import * as sql from 'mssql';
import { Inject } from 'typedi';
import {
    JsonController,
    UploadedFile,
    Body,
    Get,
    Post,
    Req,
   
} from 'routing-controllers';
import { ProductoRepository } from '../data/repository/producto.repository';
import * as mail from '../helpers/mail.helpler';

/**
 * @summary En este archivo van todos los metodos referentes a los productos en el sistema de inventarios
 * localhost:{{port}}/producto/...
 */

@JsonController('/producto')
export class ProductoController {
    private repository: ProductoRepository;

    constructor(repository: ProductoRepository) {
        this.repository = repository;
    }

    // ************ Servicios GET ************
    @Get('/get_porcodigo')
    get_porcodigo(@Req() req: Request) {
        return this.repository.get_porcodigo(req.query);
    }

    // ************ Servicios POST ************
    @Post('/post_insPordPag')
    post_insPordPag(@Body() body: Request) {
        return this.repository.post_insPordPag(body);
    }

    @Get('/get_porsku')
    get_porsku(@Req() req: Request){
        return this.repository.get_porsku(req.query);
    }
    
    // ************ Servicios PUT ************

    // ************ Servicios DELETE ************
    
}