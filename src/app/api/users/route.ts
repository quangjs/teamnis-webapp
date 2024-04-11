import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '@/utils/authHelpers';

const prisma = new PrismaClient()

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json() // { name, email, password }

    // check email
    const user = await prisma.user.findFirst({ where: { email: body.email } })
    if (user?.email) {
      return new Response(
        JSON.stringify({message: 'Email already exists'}),
        { status: 400 }
      );
    }
    // insert into db
    const verifyToken = uuidv4()
    const hashPass= await hashPassword(body.password)
    const data = {
      ...body,
      verifyToken,
      isActive: false,
      password: hashPass
    }
    const newUser = await prisma.user.create({ data })
    const { password, ...userInfo } = newUser
    // TODO: sent email with verify token
  
    return Response.json({ user: userInfo })
  } catch(error) {
    console.log('-----', error)
    return new Response('server error', { status: 500 });
  }
}