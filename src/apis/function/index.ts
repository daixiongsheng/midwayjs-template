import { Provide, Inject } from '@midwayjs/decorator'
import { UserService } from '../service/user'

// index.ts
@Provide()
export class IndexHandler {
  @Inject()
  userService: UserService

  async handler() {
    const user = await this.userService.create()
    console.log(user) // world
  }
}
