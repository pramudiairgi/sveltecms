import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";

export interface JWTPayload {
    id: number;
    role: string;
}

const authPluginBase = new Elysia({ name: "auth" })
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!, exp: "15m" }))
    .use(jwt({ name: "jwtRefresh", secret: process.env.JWT_REFRESH_SECRET!, exp: "7d" }))
    .use(cookie({ secret: process.env.COOKIE_SECRET! }))
    .derive(async ({ jwt, headers }): Promise<{ user: JWTPayload | null }> => {
        const cookieHeader = headers.cookie || '';
        const match = cookieHeader.match(/auth_access=([^;]+)/);
        const access = match?.[1];
        if (!access) return { user: null };
        const user = await jwt.verify(access) as JWTPayload | false;
        return { user: user === false ? null : user };
    });

export const authPlugin = authPluginBase as typeof authPluginBase & {
    '~Ephemeral': { derive: { user: JWTPayload | null } }
};
