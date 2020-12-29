/**
 * @description: 是否为泛对象类型
 * @param {any} arg
 * @return {boolean}
 */
const isObject = arg => {
    const type = typeof arg;
    return arg != null && (type === 'function' || type === 'object')
}

export default isObject