 
import { ClientOptions, Transport } from '@nestjs/microservices';

import { credentials } from 'grpc';
import { join } from 'path';

// Same options object used by microservice server
export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'tmsservice',
    protoPath: join(__dirname, '../../../src/GrpcApiTests/transaction monitoring service/proto/TMS.proto'),
    url: '0.0.0.0:50051',
    credentials: credentials.createInsecure()
  },
};

