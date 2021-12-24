// Original file: src/shared/infra/grpc/pharmacy.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { FindByIdRequest as _pharmacy_FindByIdRequest, FindByIdRequest__Output as _pharmacy_FindByIdRequest__Output } from '../pharmacy/FindByIdRequest';
import type { Pharmacy as _pharmacy_Pharmacy, Pharmacy__Output as _pharmacy_Pharmacy__Output } from '../pharmacy/Pharmacy';

export interface PharmacyServiceClient extends grpc.Client {
  FindById(argument: _pharmacy_FindByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pharmacy_Pharmacy__Output>): grpc.ClientUnaryCall;
  FindById(argument: _pharmacy_FindByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_pharmacy_Pharmacy__Output>): grpc.ClientUnaryCall;
  FindById(argument: _pharmacy_FindByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_pharmacy_Pharmacy__Output>): grpc.ClientUnaryCall;
  FindById(argument: _pharmacy_FindByIdRequest, callback: grpc.requestCallback<_pharmacy_Pharmacy__Output>): grpc.ClientUnaryCall;
  findById(argument: _pharmacy_FindByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pharmacy_Pharmacy__Output>): grpc.ClientUnaryCall;
  findById(argument: _pharmacy_FindByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_pharmacy_Pharmacy__Output>): grpc.ClientUnaryCall;
  findById(argument: _pharmacy_FindByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_pharmacy_Pharmacy__Output>): grpc.ClientUnaryCall;
  findById(argument: _pharmacy_FindByIdRequest, callback: grpc.requestCallback<_pharmacy_Pharmacy__Output>): grpc.ClientUnaryCall;
  
}

export interface PharmacyServiceHandlers extends grpc.UntypedServiceImplementation {
  FindById: grpc.handleUnaryCall<_pharmacy_FindByIdRequest__Output, _pharmacy_Pharmacy>;
  
}

export interface PharmacyServiceDefinition extends grpc.ServiceDefinition {
  FindById: MethodDefinition<_pharmacy_FindByIdRequest, _pharmacy_Pharmacy, _pharmacy_FindByIdRequest__Output, _pharmacy_Pharmacy__Output>
}
