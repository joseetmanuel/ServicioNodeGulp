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
export class AlmacenRepository {
    
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

   // ************ Servicios POST ************

    /**
     *  Plantilla de ejemplo para un servicio Post
     * @summary Objetivo del metodo 
     * @param body { nombreVarible tipoVariable descripción }   
     * @returns { nombreVarible tipoVariable descripción }
     *  
     */
    ServicioPost(body: any): PromiseLike<{}> {
        return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
            var request = new sql.Request(dbConn);
            request
                .input('idunidad', body.idunidad)
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

    // ************ Servicios PUT ************

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
