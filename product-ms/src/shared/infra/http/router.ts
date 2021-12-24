import { ProductController } from '../../../infra/product-controller';
import { Http } from './http';

export class HttpRouter {
  constructor(
    private readonly http: Http,
    private readonly productController: ProductController,
  ) {}

  setup() {
    this.http.on('post', '/products', async (req) => {
      return this.productController.create(req);
    });

    this.http.on('delete', '/products/:id', async (req) => {
      return this.productController.delete(req);
    });

    this.http.on('put', '/products/:id', async (req) => {
      return this.productController.update(req);
    });

    this.http.on('get', '/products', async () => {
      return this.productController.getAll();
    });

    this.http.on('get', '/products/:id', async (req) => {
      return this.productController.getById(req);
    });

    this.http.on('post', '/products/:productId/:pharmacyId', async (req) => {
      return this.productController.clone(req);
    });
  }
}
