
import { IConfig } from './interfaces/IConfig';
export const configuration: IConfig = {
    port: parseInt(process.env.port!, 10),
    apmLogging: <boolean>(process.env.apmLogging === 'true'),
    apmServiceName: <string>process.env.apmServiceName,
    apmSecretToken: <string>process.env.apmSecretToken,
    apmURL: <string>process.env.apmURL,
};


export const SpanOptions = {
    serviceName: "Testing Tool apm",
    secretToken: configuration.apmSecretToken,
    serverUrl: configuration.apmURL,
}

