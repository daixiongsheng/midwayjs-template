import { useContext, useInject } from '@midwayjs/hooks'

import { useHeader, usePath } from '../hooks/request'
import { UserService } from '../service/user'

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
  const userService = await useInject(UserService)
  const user = userService.create()

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
