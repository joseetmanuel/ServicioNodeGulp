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
import { AlmacenRepository } from '../data/repository/almacen.repository';
import * as mail from '../helpers/mail.helpler';

/**
 * @summary En este archivo van todos los metodos referentes a los almacenes en el sistema de inventarios
 * localhost:{{port}}/almacen/...
 */

@JsonController('/almacen')
export class AlmacenController {
    private repository: AlmacenRepository;

    constructor(repository: AlmacenRepository) {
        this.repository = repository;
    }

    // ************ Servicios GET ************
    @Get('/ServicioGet')
    ServicioGet(@Req() req: Request) {
        
        return this.repository.ServicioGet(req.query);
    }

    // ************ Servicios POST ************
    @Post('/ServicioPost')
    ServicioPost(@Body() body: Request) {
        return this.repository.ServicioPost(body);
    }
    
    // ************ Servicios PUT ************

    // ************ Servicios DELETE ************
    
}