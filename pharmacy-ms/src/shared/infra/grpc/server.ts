import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { PharmacyService } from '../../../application/pharmacy-service';
import { PharmacyRepository } from '../../../infra/pharmacy-repository';
import { ProtoGrpcType } from './proto/pharmacy';
import { PharmacyServiceHandlers } from './proto/pharmacy/PharmacyService';

const protoFilePath = path.resolve(__dirname, './pharmacy.proto');

const packageDefinition = protoLoader.loadSync(protoFilePath);
const proto = grpc.loadPackageDefinition(
  packageDefinition,
) as unknown as ProtoGrpcType;

const pharmacyRepository = new PharmacyRepository();
const pharmacyService = new PharmacyService(pharmacyRepository);

const handlers: PharmacyServiceHandlers = {
  FindById: async (call, callback) => {
    const { id } = call.request;
    try {
      const pharmacy = await pharmacyService.getById(id);
      callback(null, pharmacy);
    } catch (error) {
      const err = error as Error;
      callback(
        {
          message: err.message,
          name: err.name,
          stack: err.stack,
          code: 5,
        },
        null,
      );
    }
  },
};

const server = new grpc.Server();

server.addService(proto.pharmacy.PharmacyService.service, handlers);

server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.log('gPRC Server started');
  },
);
