import { useContext, useInject } from '@midwayjs/hooks'

import { useHeader, usePath } from '../hooks/request'
import { UserService } from '../service/user'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
function useKoaContext() {
  return useContext()
}

export default async () => {
  return {
    message: 'Hello World',
    method: useKoaContext().method,
  }
}

export async function login(username: string, password: string) {
  console.log('hello', username, password)
  // const userService = await useInject(UserService)
  // const user = userService.create()
  // const user1 = await prisma.user.findMany()

  const user = await prisma.user.findFirst({
    where: {
      id: 1,
    },
    include: {
      role: true,
    },
  })
  // const roles = await prisma.role.findMany()
  // roles.forEach(async role => {
  //   await prisma.userRole.createMany({
  //     data: [
  //       {
  //         userId: user.id,
  //         roleId: role.id,
  //       },
  //     ],
  //   })
  // })

  return {
    msg: 'hello world, login successfully',
    ctx: useKoaContext(),
    header: useHeader(),
    path: usePath(),
    user,
  }
}

export async function post(name: string) {
  return 'post' + name
}
