import { login } from "@/utils/authHelper"

export async function POST(
  req: Request,
) {
  const { email, password } = await req.json()
  // TODO: Query DB to check
  const user = { email, name: "fake name", role: "admin" }

  // Create the session
  const data = await login(user)
  return Response.json({ data, success: true })
}