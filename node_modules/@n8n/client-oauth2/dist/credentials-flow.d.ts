import type { ClientOAuth2 } from './client-oauth2';
import type { ClientOAuth2Token } from './client-oauth2-token';
export declare class CredentialsFlow {
    private client;
    constructor(client: ClientOAuth2);
    getToken(): Promise<ClientOAuth2Token>;
}
