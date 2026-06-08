import { beforeAll, describe, expect, it } from 'vitest'
import { backendIsUp, login } from './helpers/live'

describe('Backend baglanyşygy', () => {
  it('backend işläp dur we /schema/ jogap berýär', async () => {
    const up = await backendIsUp()
    expect(
      up,
      'Backend elýeterli däl. backend1-de `python manage.py runserver 127.0.0.1:8000` işlediň.',
    ).toBe(true)
  })

  it('admin we user login edip access token alyp bilýär', async () => {
    const adminToken = await login('admin')
    const userToken = await login('user')
    expect(adminToken.split('.')).toHaveLength(3) // JWT
    expect(userToken.split('.')).toHaveLength(3)
  })
})
