import { Service} from 'typedi';
import * as Q from 'q';
import * as sql from 'mssql';
import { default as confDB } from '../sql/db';
import * as http from 'http';
import { default as config } from '../../config';

/**
 * @summary En este archivo van todos los metodos referentes a los almacenes
 * 
 */

@Service()
export class InventarioRepository {
    
    // ************ Variables de clase ************
    private conf: any; // variabel para guardar la configuración

    constructor() {
        const env: string = process.env.NODE_ENV || 'development';
        this.conf = (config as any)[env]; // ejemplo de llamada al confg.js

    }

   // ************ Servicios GET ************

   /**
     * Plantilla de ejemplo para un servicio GET
     * @summary Objetivo del metodo 
     * @param query { nombreVarible tipoVariable descripción }   
     * @returns { nombreVarible tipoVariable descripción }
     *  
     */
    ServicioGet(query: any): PromiseLike<{}> {
        return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
            var request = new sql.Request(dbConn);
            request
                .input('idunidad', query.idunidad)
                .execute("[Operacion].[selUnidad]").then((recordSet: sql.IProcedureResult<any>) => {
                    var msj = recordSet.recordset;
                    dbConn.close();
                    deferred.resolve(msj[0]);
                }).catch((err) => {
                    dbConn.close();
                    deferred.reject(err);
                });
        });
    }

    /**
    * @summary Objetivo del metodo 
     * @param query { nombreVarible tipoVariable descripción }   
     * @returns { nombreVarible tipoVariable descripción }
     *  
     */
    get_porEmpAlm(query: any): PromiseLike<{}> {
        return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
            var error ="";
            var request = new sql.Request(dbConn);
            request
                .input('idEmpresa', query.idEmpresa)
                .input('idAlmacen', query.idAlmacen)
                .output('err',sql.NVarChar, error)
                .execute("[Inventario].[SEL_POR_EMP_SP]").then((recordSet: sql.IProcedureResult<any>) => {
                    var msj = recordSet.recordsets;
                    dbConn.close();
                    deferred.resolve(msj);
                }).catch((err) => {
                    dbConn.close();
                    deferred.reject(err);
                });
        });
    }

   // ************ Servicios POST ************

    /**
     * @summary Inserta un registro en el detalle del inventario 
     * @param body  { nombreVarible tipoVariable descripción } 
     *              { nombreVarible tipoVariable descripción }   
     * @returns { nombreVarible tipoVariable descripción }
     *  
     */
    post_insInvCta(body: any): PromiseLike<{}> {
         return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
            var error ="";
            var request = new sql.Request(dbConn);
            request
                .input('idEmpresa',sql.Int, body.idEmpresa)
                .input('idAlmacen',sql.Int, body.idAlmacen)
                .input('idUsuario',sql.Int, body.idUsuario)
                .input('codigoBarras',sql.NVarChar, body.codigoBarras)
                .input('noCuenta',sql.Int, body.noCuenta)
                .input('cuenta', body.cuenta)
                .input('idInventario',sql.Int, body.idInventario)
                .input('nueva',sql.Bit, body.nueva)
                .input('ubicacion',sql.NVarChar, body.ubicacion)
                .output('err',sql.NVarChar, error)
                .execute("[Inventario].[INS_INV_CTA_SP]").then((recordSet: sql.IProcedureResult<any>) => {
                    var msj = recordSet.recordset;
                    dbConn.close();
                    deferred.resolve(msj[0]);
                }).catch((err) => {
                    dbConn.close();
                    deferred.reject(err);
                });
        });
    }

    /**
     *  Plantilla de ejemplo para un servicio Post
     * @summary Objetivo del metodo 
     * @param body { nombreVarible tipoVariable descripción }   
     * @returns { nombreVarible tipoVariable descripción }
     *  
     */
    post_updateCuenta(body: any): PromiseLike<{}> {
        console.log("post_updateCuenta")
        return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
            var error ="";
            var request = new sql.Request(dbConn);
            request
                .input('idEmpresa',sql.Int, body.idEmpresa)
                .input('codigo',sql.NVarChar, body.codigo)
                .input('noCuenta',sql.Int, body.noCuenta)
                .input('cuenta', body.cuenta)
                .input('idInventario',sql.Int, body.idInventario)
                .input('ubicacion',sql.NVarChar, body.ubicacion)
                .input('idUsuario',sql.Int, body.idUsuario)
                .output('err',sql.NVarChar, error)
               .execute("[Inventario].[UPD_INV_CTA_SP]").then((recordSet: sql.IProcedureResult<any>) => {
                    
                    var msj = recordSet.recordset;
                    dbConn.close();
                    deferred.resolve(msj[0]);
                }).catch((err) => {
                    dbConn.close();
                    deferred.reject(err);
                });
        });
    }

    /**
     *  Plantilla de ejemplo para un servicio Post
     * @summary Objetivo del metodo 
     * @param body { nombreVarible tipoVariable descripción }   
     * @returns { nombreVarible tipoVariable descripción }
     *  
     */
    post_finCuenta(body: any): PromiseLike<{}> {
        console.log("post_finCuenta")
        return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
            var error ="";
            var request = new sql.Request(dbConn);
            request
                .input('idEmpresa',sql.Int, body.idEmpresa)
                .input('noCuenta',sql.Int, body.noCuenta)
                .input('idInventario',sql.Int, body.idInventario)
                .output('err',sql.NVarChar, error)
               .execute("[Inventario].[UPD_INV_CTA_ENC_SP]").then((recordSet: sql.IProcedureResult<any>) => {
                    var msj = recordSet.recordset;
                     dbConn.close();
                    deferred.resolve(msj[0]);
                }).catch((err) => {
                    dbConn.close();
                    deferred.reject(err);
                });
        });
    }
    

    // ************ Servicios DELETE ************

    // ************ Metodos Privados ************
    
    /**
     * @summary Función generica para conectarse a base de datos
     * @param callback Función de retorno
     * @returns Retorna la promesa, la ejecución del servicio, manda a llamar la calback
    */
    private dbConnect(callback: Function): Q.IPromise<{}> {
        const env: string = process.env.NODE_ENV || 'development';
        var deferred = Q.defer();
        var dbConn = new sql.ConnectionPool((confDB as any)[env]);
        dbConn.connect()
            .then(() => callback(dbConn, deferred))
            .catch(deferred.reject);

        return deferred.promise;
    }
}
