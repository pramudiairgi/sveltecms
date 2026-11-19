import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";
import bcrypt from "bcryptjs";

export const authPlugin = new Elysia({ name: "auth" })
    .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!, exp: '15m' }))
    .use(jwt({ name: "jwtRefresh", secret: process.env.JWT_REFRESH_SECRET!, exp: '7d' }))
    .use(cookie({ secret: process.env.COOKIE_SECRET! }))
    .derive(async ({ jwt, jwtRefresh, cookie }) => {
        // TODO: verivy access token, fallback to refresh token, and set new access token in cookie
        const access = cookie.auth_access?.value;
        const refresh = cookie.auth_refresh?.value;

        let user = null;
        if (typeof access === "string") user = await jwt.verify(access);
        if (!user && typeof refresh === "string")
            user = await jwtRefresh.verify(refresh);

        // return { user, jwt, jwtRefresh, cookie };
        return { user, jwt, jwtRefresh, cookie };
    })
