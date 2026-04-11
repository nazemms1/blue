
export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('auth_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function createApiClient(baseURL: string) {
  async function request<T>(path: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = config

    const response = await fetch(`${baseURL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(
        (error as { message?: string }).message ?? `HTTP ${response.status}`
      )
    }

    return response.json() as Promise<T>
  }

  return {
    get: <T>(path: string) => request<T>(path),
    post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body }),
    put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body }),
    patch: <T>(path: string, body: unknown) => request<T>(path, { method: 'PATCH', body }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  }
}

export const api = createApiClient(import.meta.env.VITE_API_URL ?? '/api')
