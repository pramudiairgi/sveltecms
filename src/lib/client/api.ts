import { treaty } from '@elysiajs/eden'
import type { App } from '../../server'

const baseUrl = import.meta.env.PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:3000'

export const api = treaty<App>(baseUrl)