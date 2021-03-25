export interface IApiDetailService {
    get: (id: string) => Promise<any>;
}
