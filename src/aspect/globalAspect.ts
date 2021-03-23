import { Aspect, IMethodAspect, JoinPoint, Provide } from '@midwayjs/decorator';
import { UserController } from '../controller/user';

@Provide()
@Aspect(UserController)
export class GlobalAspect implements IMethodAspect {
    async after(joinPoint: JoinPoint, result: any, error: Error) {
        console.log('after');
        return await result;
    }
    async afterReturn(joinPoint: JoinPoint, result: any) {
        console.log('afterReturn');
        return await result;
    }
    async afterThrow(joinPoint: JoinPoint, error: Error) {
        console.log('afterThrow');
    }
    async before(joinPoint: JoinPoint) {
        console.log('before');
    }
    async around(joinPoint: JoinPoint) {
        console.log('around');
        return await joinPoint.proceed(...joinPoint.args);
    }
}
