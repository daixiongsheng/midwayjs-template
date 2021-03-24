import { useContext } from '@midwayjs/hooks';

export function useHeader() {
    const { request } = useContext();
    return request.headers;
}

export function usePath() {
    const { request } = useContext();
    return request.path;
}
