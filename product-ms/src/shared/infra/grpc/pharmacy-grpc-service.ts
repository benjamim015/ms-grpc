/* eslint-disable camelcase */
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { IGRPCService } from '../../../application/contracts/grpc-service';
import { ProtoGrpcType } from './proto/pharmacy';
import { Pharmacy__Output } from './proto/pharmacy/Pharmacy';

const protoFilePath = path.resolve(__dirname, './pharmacy.proto');

const packageDefinition = protoLoader.loadSync(protoFilePath);
const proto = grpc.loadPackageDefinition(
  packageDefinition,
) as unknown as ProtoGrpcType;

export class PharmacyGRPCService implements IGRPCService {
  private grpcClient;

  constructor() {
    this.grpcClient = new proto.pharmacy.PharmacyService(
      'pharmacy-ms:50051',
      grpc.credentials.createInsecure(),
    );
  }

  async getPharmacyById(id: string): Promise<Pharmacy__Output | undefined> {
    const res = await new Promise<Pharmacy__Output | undefined>(
      (resolve, _) => {
        this.grpcClient.FindById({ id }, (err, response) => {
          if (err) return resolve(undefined);
          return resolve(response);
        });
      },
    );
    return res;
  }
}
