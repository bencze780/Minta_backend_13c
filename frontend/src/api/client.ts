const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '')

export class ApiConnectionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiConnectionError'
  }
}

export async function apiRequest<T = unknown>(
  path: string,
  method = 'GET',
  body?: unknown
): Promise<T> {
  const url = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`

  let response: Response
  try {
    response = await fetch(url, {
      method,
      mode: 'cors',
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body)
    })
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Ismeretlen hálózati hiba'
    throw new ApiConnectionError(
      `A frontend nem éri el a backendet (${url}). Ellenőrizd, hogy fut-e a Node.js szerver a 3000-es porton, ` +
      `a VITE_API_URL helyes-e, és a server.js-ben a CORS middleware az útvonalak előtt szerepel-e. ` +
      `Böngészőhiba: ${detail}`
    )
  }

  const contentType = response.headers.get('content-type') || ''
  const data: unknown = contentType.includes('application/json')
    ? await response.json().catch(() => ({ hiba: 'A szerver hibás JSON választ adott.' }))
    : await response.text().then(text => ({ hiba: text || `Üres válasz (HTTP ${response.status})` }))

  if (!response.ok) {
    const message = data && typeof data === 'object' && 'hiba' in data
      ? String((data as { hiba: unknown }).hiba)
      : `HTTP ${response.status}`
    throw new Error(message)
  }

  return data as T
}

export function getApiUrl() {
  return API_URL
}
