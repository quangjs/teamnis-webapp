import {request, API_URL} from './request'

export async function emailLogin(params: {email: string, password: string}) {
  // login with email/pass
  const response = await request.post(`${API_URL}/auth/login`, { params })
  if (response.data?.length) {
    return response.data[0].data || []
  }
  return []
}

export async function verifySSO(params: { platform: string, token: string }) {
  // send to verifying SSO token
  const response = await request.post(`${API_URL}/auth/sso`, { params })
  if (response.data?.length) {
    return response.data[0].data || []
  }
  return []
}