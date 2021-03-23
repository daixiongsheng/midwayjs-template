import { HttpCode } from '../common/enum';


export interface Response<D extends any = any> {
    code: HttpCode;
    msg: string;
    data: D;
}
