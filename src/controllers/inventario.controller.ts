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
import { InventarioRepository } from '../data/repository/inventario.repository';
import * as mail from '../helpers/mail.helpler';

/**
 * @summary En este archivo van todos los metodos referentes a los inventarios
 * localhost:{{port}}/inventarios/...
 */ 
@JsonController('/inventario')
export class InventarioController {
    private repository: InventarioRepository;

    constructor(repository: InventarioRepository) {
        this.repository = repository;
    }

    // ************ Servicios GET ************
    @Get('/ServicioGet')
    ServicioGet(@Req() req: Request) {
        return this.repository.ServicioGet(req.query);
    }

    @Get('/get_porEmpAlm')
    get_porEmpAlm(@Req() req: Request) {
        return this.repository.get_porEmpAlm(req.query);
    }
    

    // ************ Servicios POST ************
    @Post('/post_insInvCta')
    post_insInvCta(@Body() body: Request) {
        return this.repository.post_insInvCta(body);
    }
    
    @Post('/post_updateCuenta')
    post_updateCuenta(@Body() body: Request) {
        return this.repository.post_updateCuenta(body); 
    }
    
    @Post('/post_finCuenta')
    post_finCuenta(@Body() body: Request) {
        return this.repository.post_finCuenta(body); 
    }
    // ************ Servicios PUT ************

    // ************ Servicios DELETE ************
    
}