import './shared/infra/grpc/server';
import { HttpRouter } from './shared/infra/http/router';
import { ExpressAdapter } from './shared/infra/http/express-adapter';
import { PharmacyController } from './infra/pharmacy-controller';
import { PharmacyService } from './application/pharmacy-service';
import { PharmacyRepository } from './infra/pharmacy-repository';

const http = new ExpressAdapter();

const pharmacyRepository = new PharmacyRepository();
const pharmacyService = new PharmacyService(pharmacyRepository);
const pharmacyController = new PharmacyController(pharmacyService);

const router = new HttpRouter(http, pharmacyController);
router.setup();

http.listen(3000);
