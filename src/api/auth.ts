import { Elysia, status, t } from 'elysia'
import { users } from '#lib/server/db/schema.ts'
import { eq } from 'drizzle-orm'
import { db } from '#lib/server/db/index.ts'
import bcrypt from 'bcryptjs'
import { authPlugin, type JWTPayload } from '#lib/server/auth.ts'

export const authRoutes = new Elysia({ prefix: '/auth' })
    .use(authPlugin)
    .derive(async ({ jwt, headers }): Promise<{ user: JWTPayload | null }> => {
        const cookieHeader = headers.cookie || '';
        const match = cookieHeader.match(/auth_access=([^;]+)/);
        const access = match?.[1];
        if (!access) return { user: null };
        const user = await jwt.verify(access) as JWTPayload | false;
        return { user: user === false ? null : user };
    })

    .post('/register', async ({ body, jwt, jwtRefresh, cookie }) => {
        const existing = await db.select().from(users).where(eq(users.email, body.email)).limit(1)
        if (existing[0]) return status(409, 'Email already registered')

        const passwordHash = await bcrypt.hash(body.password, 10)
        const [user] = await db.insert(users).values({
            name: body.name,
            email: body.email,
            passwordHash,
            role: 'user',
        }).returning()

        const access = await jwt.sign({ id: user.id, role: user.role })
        const refresh = await jwtRefresh.sign({ id: user.id })

        cookie.auth_access.set({
            value: access,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 15 * 60,
            path: '/'
        })
        cookie.auth_refresh.set({
            value: refresh,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/'
        })

        return {
            user:
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }, { body: t.Object({ name: t.String({ minLength: 2 }), email: t.String({ format: 'email' }), password: t.String({ minLength: 8 }) }) })

    .post('/login', async ({ body, jwt, jwtRefresh, cookie }) => {
        const [user] = await db.select().from(users).where(eq(users.email, body.email)).limit(1)
        if (!user) return status(401, 'Invalid email or password')

        const valid = await bcrypt.compare(body.password, user.passwordHash)
        if (!valid) return status(401, 'Invalid email or password')

        const access = await jwt.sign({ id: user.id, role: user.role })
        const refresh = await jwtRefresh.sign({ id: user.id })

        cookie.auth_access.set({
            value: access,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 15 * 60,
            path: '/'
        })
        cookie.auth_refresh.set({
            value: refresh,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/'
        })

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email, role: user.role
            }
        }
    }, {
        body: t.Object({
            email: t.String({ format: 'email' }),
            password: t.String()
        })
    })

    .post('/logout', async ({ cookie }) => {
        cookie.auth_access.remove()
        cookie.auth_refresh.remove()
        return { message: 'Logged out successfully' }
    })

    .get('/me', async ({ user }) => {
        if (!user) return status(401, 'Not authenticated')
        return { user }
    })

    .post('/refresh', async ({ jwt, jwtRefresh, cookie }) => {
        const refresh = cookie.auth_refresh?.value
        if (typeof refresh !== 'string') return status(401, 'No refresh token provided')

        const payload = await jwtRefresh.verify(refresh)
        if (!payload) return status(401, 'Invalid refresh token')

        const [foundUser] = await db.select({
            id: users.id,
            role: users.role
        })
            .from(users)
            .where(eq(users.id, Number(payload.id)))
            .limit(1)
        if (!foundUser) return status(401, 'Invalid refresh token')

        const access = await jwt.sign({
            id: foundUser.id,
            role: foundUser.role
        })

        cookie.auth_access.set({
            value: access,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 15 * 60,
            path: '/'
        })

        return { message: 'Token refreshed successfully' }
    })