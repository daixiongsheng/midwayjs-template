import { HttpCode } from '../common/enum';
import { Response } from '../typings/interface';
export function add(a: number, b: number): number {
    return a + b;
}

export function success<T>(data: T) {
    return {
        code: HttpCode.Success,
        msg: 'ok',
        data,
    };
}

export function error<T extends any = any>(
    msg: string,
    data: T = {} as T
): Response {
    return {
        code: HttpCode.Error,
        msg,
        data,
    };
}

export const toString = (object: any): string =>
    Object.prototype.toString.call(object);
export const isObject = (object: any): boolean =>
    toString(object) === '[object Object]';

/**
 * 自定义判断类型函数
 *
 * @export
 * @param {*} value
 * @return {*}  {string}
 */
export function typeOf(value: any): string {
    const type = typeof value;
    switch (type) {
        case 'string':
        case 'boolean':
        case 'bigint':
        case 'number':
        case 'symbol':
        case 'function':
        case 'undefined':
            /* eslint-disable no-self-compare */
            if (value !== value) {
                return 'NaN';
            }
            return type;
        case 'object':
            if (value === null) {
                return 'null';
            }
            if (isObject(value)) {
                return 'object';
            }
            if (Array.isArray(value)) {
                return 'Array';
            }
    }
    return '';
}

/**
 * 判断是否可以转成number
 *
 * @export
 * @param {(string | number)} value
 * @return {*}  {boolean}
 */
export function canConvertToNumber(value: string | number): boolean {
    const type = typeOf(value);
    if (type === 'number') {
        return true;
    }
    return parseInt(value as string, 10).toString() === value;
}

/**
 * 生成指定位数随机数
 * @export
 * @param {Number} len
 * @returns
 */
export function randomString(len = 32): string {
    const $chars =
        'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

// 锁
export const Lock = {
    isLocked(key: string): boolean {
        return Boolean(this[`$$${key}`]);
    },
    unlock(key: string): void {
        if (`$$${key}` in this) {
            /* eslint-disable @typescript-eslint/no-dynamic-delete */
            delete this[`$$${key}`];
        }
    },
    lock(key: string): void {
        this[`$$${key}`] = true;
    },
};

/**
 * 将对象转成query串
 * @example object2QueryString({age:123}) => age=123
 * @param o{Object}
 * @param encode{Boolean}
 */
export function object2QueryString(o: any, encode = false): string {
    let s = '';
    Object.keys(o).forEach(key => {
        const value = o[key];
        const type = typeof value;
        switch (type) {
            case 'number':
                if (value === value) {
                    s += `${key}=${value}&`;
                }
                break;
            case 'object':
                if (value !== null) {
                    s += `${key}=${
                        encode
                            ? encodeURIComponent(
                                  object2QueryString(value, encode)
                              )
                            : object2QueryString(value, encode)
                    }&`;
                }
                break;
            case 'boolean':
                s += `${key}=${value}&`;
                break;
            case 'string':
                s += `${key}=${encode ? encodeURIComponent(value) : value}&`;
                break;
            default:
                break;
        }
    });
    return s.substr(0, s.length && s.length - 1);
}

/**
 *
 * @param path
 * @param pramsObject{Object} 参数对象
 * @param encode {boolean} 是否进行encodeURIComponent编码
 * @example dealPath('a/b', {id: 1, name: null}) => /a/b/?id=1
 * @return {string} 返回拼接好的字符串
 */
export function dealPath(
    path: string,
    pramsObject = {},
    encode = false
): string {
    if (!path || Object.keys(pramsObject).length === 0) {
        return path;
    }
    if (path[0] !== '/' && !path.includes('//')) {
        path = `/${path}`;
    }
    // 是否已经经过处理
    const isDealt = path.indexOf('?') !== -1;
    if (path[path.length - 1] === '/' && !isDealt) {
        path = path.substr(0, path.length - 1);
    }
    path = isDealt ? `${path}&` : `${path}?`;
    const queryString = object2QueryString(pramsObject, encode);
    path += queryString ? `${queryString}&` : '';
    return path.substr(0, path.length - 1);
}

/**
 *
 * @param queryString {string}  需要解析的url query 串
 * @param decode {boolean} 是否使用encodeURIComponent 进行解码
 * @example query2Obj('a=3&b=4&c=6') => {a:'3',b:'4'}
 * @return {Object}
 */
export function query2Obj(queryString = '', decode = false): any {
    if (queryString[0] === '?') {
        queryString = queryString.slice(1);
    }
    const o = {} as any;
    const qArr = queryString.split('&');
    qArr.forEach(item => {
        const [k, v] = item.split('=');
        if (k) {
            o[k] = v === void 0 ? '' : decode ? decodeURIComponent(v) : v;
        }
    });
    return o;
}

/**
 *
 * @param url {string} url 需要解析的url
 * @param decode {boolean} 是否使用encodeURIComponent 进行解码
 * @example parseUrl('https://a.b.com?a=123&b=456') => {a:'123',b:'456'}
 * @return {Object}
 */
export function parseUrl(url = '', decode = false): any {
    const queryString = url.split('?')[1];
    return query2Obj(queryString, decode);
}

/**
 * 处理参数对象的类型，默认的url里面的参数解析后是字符串类型，改方法将进行一些可能类型的转换
 * @param object
 * @example dealQueryObject({a:'3',b:'4',c:'null'}) => {a:3,b:4,c:null}
 * @return {any}
 */
export function dealQueryObject(object: any | unknown): any {
    const o = {} as any;
    if (!object) {
        return o;
    }
    Object.keys(object as any).forEach(key => {
        const value = (object as any)[key];
        switch (value) {
            case 'null':
                o[key] = null;
                return;
            case 'false':
                o[key] = false;
                return;
            case 'true':
                o[key] = true;
                return;
            case 'undefined':
                o[key] = void 0;
                return;
            default:
                break;
        }
        // value是number
        if (parseInt(value, 10).toString() === value) {
            o[key] = Number(value);
            return;
        }
        try {
            const result = JSON.parse(value);
            o[key] = dealQueryObject(result);
        } catch (e) {
            o[key] = value;
        }
    });
    return o;
}

// 空函数
export const loop = (): void => void 0;

/**
 * 驼峰转成下划线
 * @param string
 */
export function camelBak2Underline(string: string): string {
    return string.replace(/\B([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 下划线转成小驼峰
 * @param string
 */
export function underline2camelBak(string: string): string {
    return string.replace(/_(\w)/g, (_, letter) => letter.toUpperCase());
}

/**
 * 下划线转成大驼峰
 * @param string
 */
export function underline2CamelBak(string: string): string {
    string = string[0].toUpperCase() + string.substring(1, string.length);
    return string.replace(/_(\w)/g, (_, letter) => letter.toUpperCase());
}

/**
 * 获取指定范围的随机整数
 * @param lowerValue 最小值
 * @param upperValue 最大值
 */
export function getRandomValue(lowerValue = 0, upperValue = 100): number {
    return Math.round(Math.random() * (upperValue - lowerValue) + lowerValue);
}

/**
 * 将对象的值为 空吕,null,undefined, NaN 进行踢出
 * @example pureObject({name:'',age:null, a:123,d:undefined,e:NaN}) => {a:123}
 * @param object
 */
export function pureObject(object = {} as any): any {
    const o = {} as any;
    if (
        toString(object) === '[object Array]' ||
        typeof object !== 'object' ||
        object === null
    ) {
        return object;
    }
    Object.keys(object).forEach(key => {
        const value = object[key];
        const type = typeof value;
        switch (type) {
            case 'boolean':
            case 'number':
                o[key] = value;
                break;
            case 'object':
                if (value !== null) {
                    const v = pureObject(value);
                    if (Object.keys(v).length) {
                        o[key] = pureObject(value);
                    }
                }
                break;
            case 'string':
                if (value) {
                    o[key] = value;
                }
                break;
            default:
                break;
        }
    });
    return o;
}

/**
 * 深拷贝对象
 *
 * @export
 * @param {*} obj
 * @param {*} [map=new Map()]
 * @return {*}
 */
export function deepCopy<T = any>(object: any, map = new Map()): T {
    let copy: any;
    switch (typeof object) {
        case 'undefined':
            break;
        case 'number':
        case 'boolean':
            copy = object;
            break;
        case 'string':
            copy = `${object}`;
            break;
        case 'bigint':
            copy = BigInt(object);
            break;
        case 'object':
            if (object === null) {
                copy = null;
            } else {
                // 循环引用
                const clone = map.get(object);
                if (clone) {
                    return clone;
                }
                // new Boolean,Number 不处理
                if (typeOf(object) === 'Array') {
                    const len = (object as any[]).length;
                    copy = new Array(len);
                    map.set(object, copy);
                    for (let i = 0; i < len; i++) {
                        copy[i] = deepCopy(object[i], map);
                    }
                } else {
                    copy = {} as any;
                    map.set(object, copy);
                    Object.keys(object).forEach(key => {
                        copy[key] = deepCopy(object[key], map);
                    });
                }
            }
            break;
        case 'symbol':
            copy = Symbol((object as any).description);
            break;
        case 'function':
            copy = object;
            break;
    }
    return copy;
}

/**
 * 深度比较函数，不能比较有循环引用的对象
 *
 * @export
 * @param {*} value
 * @param {*} other
 * @return {*}  {boolean}
 */
export function deepEqual(value: any, other: any): boolean {
    if (value === other) {
        return true;
    }
    const typeA = typeOf(value);
    const typeB = typeOf(other);
    if (typeA !== typeB) {
        return false;
    }
    switch (typeA) {
        case 'Array':
            if (value.length !== other.length) {
                return false;
            }
            for (let i = 0, len = value.length; i < len; i++) {
                if (!deepEqual(value[i], other[i])) {
                    return false;
                }
            }
            return true;
        case 'object':
            for (const key of Object.keys(value)) {
                if (!deepEqual(value[key], other[key])) {
                    return false;
                }
            }
            return true;
    }
    return value === other;
}

/**
 * 将字节数转成文本形式 1024 --> 1KB
 *
 * @export
 * @param {number} bytes
 * @return {*}  {string}
 */
export function byteConvert(bytes: number): string {
    let ret = '';
    const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let exp = Math.floor(Math.log(bytes) / Math.log(2));
    if (exp < 1) {
        exp = 0;
    }
    const i = Math.floor(exp / 10);
    ret = `${bytes / Math.pow(2, 10 * i)}`;

    if (bytes.toString().length > bytes.toFixed(2).toString().length) {
        ret = bytes.toFixed(2);
    }
    return ret + symbols[i];
}

/**
 * 将尺寸大小由文本形式改为数字形式（将其他单位转换为B）
 * @param size 尺寸大小文本
 */
export function unitConversion(size: number | string): number | string {
    const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (canConvertToNumber(size)) {
        return size;
    }
    const length = parseInt(size as string, 10);
    const unit = (size as string)
        .substring(length.toString().length)
        .toUpperCase();
    const index = symbols.findIndex(i => i === unit);
    return length * Math.pow(2, 10 * index);
}

export function generateToken(key: string): string {
    return key;
}
