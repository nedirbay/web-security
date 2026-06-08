/**
 * Janly backend bilen işleýän contract testleri üçin kömekçi funksiýalar.
 *
 * Bu testler MOCK ULANMAÝAR — göni `VITE_API_BASE_URL` (default
 * http://localhost:8000/api/) salgysyndaky işläp duran Django backend-e baglanýar.
 *
 * Backend-i işletmek (backend1 papkasynda):
 *   source venv/bin/activate
 *   python manage.py migrate
 *   python manage.py shell < seed_db.py     # admin@guardly.com / admin123
 *   python manage.py runserver 127.0.0.1:8000
 */
import { expect } from 'vitest'
import apiClient from '../../api/axios'

export const CREDENTIALS = {
  admin: { email: 'admin@guardly.com', password: 'admin123' },
  user: { email: 'user@guardly.com', password: 'user123' },
}

/** Backend login edip access tokeni gaýtarýar (göni JWT endpointi). */
export async function login(role: 'admin' | 'user' = 'admin'): Promise<string> {
  const { data } = await apiClient.post('/users/login/', CREDENTIALS[role])
  const token = data.access as string
  expect(token, 'login jogabynda `access` token bolmaly').toBeTruthy()
  // Frontend axios interceptor tokeni localStorage-dan okaýar
  localStorage.setItem('token', token)
  return token
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

/** Paginated ýa-da düz massiw jogapdan elementleriň massiwini alýar. */
export function asList<T = any>(data: any): T[] {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

/**
 * Bir obýektde frontend tipiniň talap edýän meýdanlarynyň barlygyny barlaýar.
 * Tapylmadyk her meýdan üçin düşnükli ýalňyş habary çykarýar — bu doly
 * "model uýgunsyzlygyny" görkezýär.
 */
export function expectFields(obj: any, fields: string[], label: string) {
  expect(obj, `${label}: jogap obýekt bolmaly`).toBeTypeOf('object')
  const missing = fields.filter((f) => !(f in (obj ?? {})))
  expect(
    missing,
    `${label}: backend jogabynda frontend tipiniň şu meýdanlary ýok: [${missing.join(', ')}]`,
  ).toEqual([])
}

/** Backend-iň gönümel işleýändigini barlamak üçin. */
export async function backendIsUp(): Promise<boolean> {
  try {
    await apiClient.get('/schema/')
    return true
  } catch {
    return false
  }
}
