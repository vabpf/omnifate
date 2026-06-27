export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new ApiError(errJson.error || `Server error: ${response.status}`, response.status);
  }

  return response.json();
}
