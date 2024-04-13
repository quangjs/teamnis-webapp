import {request, API_URL} from '@/utils/request'

export async function registerEmail(params: {name: string, email: string, password: string}) {
  const response = await request.post(`${API_URL}/api/users`, params)
  if (response.data) {
    return response.data || {}
  }
  return []
}

export async function loginEmail(params: {email: string, password: string}) {
  const response = await request.post(`${API_URL}/api/auth/login`, params)
  if (response.data) {
    return response.data || {}
  }
  return []
}

export async function firebaseGoogleLogin(params: { token: string }) {
  // send to verifying SSO token
  const response = await request.post(`${API_URL}/auth/google`, {
    headers: {
      'firebase-token': params.token
    }
  })
  if (response.data?.length) {
    return response.data[0].data || []
  }
  return []
}