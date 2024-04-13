import { isMatchPassword, createSession } from "@/utils/authHelpers"
import { PrismaClient } from "@prisma/client"
import { HTTP_ERROR_MESSAGES } from "@/utils/errorHelpers"

const prisma = new PrismaClient()

export async function POST(
  req: Request,
) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return new Response(
      HTTP_ERROR_MESSAGES.INVALID_LOGIN,
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({ where: { email } })

  if (!user?.email) {
    return new Response(
      HTTP_ERROR_MESSAGES.EMAIL_NOT_EXISTED,
      { status: 400 }
    );
  }

  if (!user.isActive) {
    return new Response(
      HTTP_ERROR_MESSAGES.INACTIVE_USER,
      { status: 400 }
    );
  }
  const isCorrectPass = await isMatchPassword(password, user.password);

  if (!isCorrectPass) {
    return new Response(
      HTTP_ERROR_MESSAGES.INVALID_LOGIN,
      { status: 400 }
    );
  }

  const data = await createSession(user)
  return Response.json({ data, success: true })
}