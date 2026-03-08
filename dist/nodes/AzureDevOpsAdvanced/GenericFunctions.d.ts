import { IExecuteFunctions, ILoadOptionsFunctions } from 'n8n-workflow';
export declare function azureApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions, method: string, endpoint: string, body?: any, query?: any): Promise<any>;
