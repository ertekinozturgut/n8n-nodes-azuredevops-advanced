import type { ClientOAuth2, ClientOAuth2Options } from './client-oauth2';
import type { ClientOAuth2Token } from './client-oauth2-token';
export declare class CodeFlow {
    private client;
    constructor(client: ClientOAuth2);
    getUri(opts?: Partial<ClientOAuth2Options>): string;
    getToken(urlString: string, opts?: Partial<ClientOAuth2Options>): Promise<ClientOAuth2Token>;
}
