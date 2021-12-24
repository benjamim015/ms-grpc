import { HttpRouter } from './shared/infra/http/router';
import { ExpressAdapter } from './shared/infra/http/express-adapter';
import { ProductController } from './infra/product-controller';
import { ProductService } from './application/product-service';
import { ProductRepository } from './infra/product-repository';

import { PharmacyGRPCService } from './shared/infra/grpc/pharmacy-grpc-service';

const http = new ExpressAdapter();

const productDao = new ProductRepository();
const pharmacyGRPCService = new PharmacyGRPCService();
const productService = new ProductService(productDao, pharmacyGRPCService);
const productController = new ProductController(productService);

const router = new HttpRouter(http, productController);
router.setup();

http.listen(3000);
