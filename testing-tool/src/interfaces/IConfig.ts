// SPDX-License-Identifier: Apache-2.0

export interface IConfig { 
    port: number; 
    apmLogging: boolean;
    apmServiceName: string;
    apmSecretToken: string;
    apmURL: string; 
}
