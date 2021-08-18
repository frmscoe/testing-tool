 
import { ClientOptions, Transport } from '@nestjs/microservices';

import { credentials } from 'grpc';
import { join } from 'path';

// Same options object used by microservice server
export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'org.apache.nifi.processors.grpc',
    protoPath: join(__dirname, '../../../src/GrpcApiTests/CRSP/proto/app.proto'),
    url: 'off-channel-router-setup-processor.frm-meshed:50051',
    credentials: credentials.createInsecure()
  },
};

