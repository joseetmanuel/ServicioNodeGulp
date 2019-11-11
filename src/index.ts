import 'reflect-metadata';
import { createExpressServer, useContainer, Action, UnauthorizedError } from 'routing-controllers';
import { Container, ContainerInstance } from 'typedi';

/**
 * @summary En este archivo van todos los metodos referentes a los almacenes en el sistema de inventarios
 * localhost:{{port}}/almacen/...
 */
import { AlmacenRepository } from './data/repository/almacen.repository';
import { AlmacenController } from './controllers/almacen.controller';
Container.get(AlmacenRepository)


/**
 * @summary En este archivo van todos los metodos referentes a las empresas en el sistema de inventarios
 * localhost:{{port}}/empresa/...
 */
import { EmpresaRepository } from './data/repository/empresa.repository';
import { EmpresaController } from './controllers/empresa.controller';
Container.get(EmpresaRepository);

/**
 * @summary En este archivo van todos los metodos referentes a la seguridad (logins) el sistema de inventarios
 * localhost:{{port}}/seguridad/...
 */
import { SeguridadRepository } from './data/repository/seguridad.repository';
import { SeguridadController, SeguridadMiddleware } from './controllers/seguridad.controller';
Container.get(SeguridadRepository);

/**
 * @summary En este archivo van todos los metodos referentes a los inventarios en el sistema 
 * localhost:{{port}}/inventario/...
 */
import { InventarioRepository } from './data/repository/inventario.repository';
import { InventarioController } from './controllers/inventario.controller';
Container.get(InventarioRepository);

/**
 * @summary En este archivo van todos los metodos referentes a los productos (piezas) el sistema de inventarios
 * localhost:{{port}}/seguridad/...
 */
import { ProductoRepository } from './data/repository/producto.repository';
import { ProductoController } from './controllers/producto.controller';
Container.get(ProductoRepository);

useContainer(Container);
// generamos el Express
const app = createExpressServer({
    cors: true,
    controllers: [ // Cada uno de los controlests de arriba
        AlmacenController,
        EmpresaController,
        SeguridadController,
        InventarioController,
        ProductoController
    ],
    middlewares: [SeguridadMiddleware]
});

// si no se asigna puerto desde el servidor de aplicación
const PORT = process.env.PORT || 4050;

app.listen(PORT);
console.log(`Running local server on http://localhost:${PORT}`);