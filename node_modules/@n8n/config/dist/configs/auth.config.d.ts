import { z } from 'zod';
declare const samesiteSchema: z.ZodEnum<["strict", "lax", "none"]>;
type Samesite = z.infer<typeof samesiteSchema>;
declare class CookieConfig {
    secure: boolean;
    samesite: Samesite;
}
export declare class AuthConfig {
    cookie: CookieConfig;
}
export {};
