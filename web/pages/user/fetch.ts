import { ISSRContext } from 'ssr-types';
import { IndexData } from '@/interface';
interface IApiService {
    get: () => Promise<IndexData>;
}

export async function login(
    ctx: ISSRContext<{
        userController?: IApiService;
    }>,
    ...args: any[]
) {
    console.log(ctx, 'ctx', 'user');

    const data = __isBrowser__
        ? await (
              await window.fetch('/api/user/create', { method: 'POST' })
          ).json()
        : await ctx.userController?.get();

    return {
        // 建议根据模块给数据加上 namespace防止数据覆盖
        indexData: data,
    };
}
