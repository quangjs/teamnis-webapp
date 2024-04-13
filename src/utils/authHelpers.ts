import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const secretKey = "secret"; // Load ENV
const key = new TextEncoder().encode(secretKey);
const expirationTime= 10 // minutes
const saltOrRounds = bcrypt.genSaltSync(10);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expirationTime} mins from now`)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function createSession(user: any) {
  const expires = new Date(Date.now() + expirationTime * 60 * 1000);
  const data = { user, expires };
  const session = await encrypt({ user, expires });
  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
  return data;
}

export async function destroySession() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSessionMiddleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + expirationTime * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltOrRounds)
}

export async function isMatchPassword(password: string, hashPassword: string) {
  return bcrypt.compare(password, hashPassword)
}