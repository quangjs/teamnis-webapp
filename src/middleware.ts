import { getSession, updateSessionMiddleware } from '@/utils/authHelper'
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = await getSession()
  if (request.nextUrl.pathname.startsWith('/login') && user !== null) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/dashboard') && user === null) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return await updateSessionMiddleware(request);
}