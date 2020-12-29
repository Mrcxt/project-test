import isType from './isType';

/**
 * @description: 判断是否仅是对象类型
 * @param {any} arg - 待检测数据
 * @return {boolean}
 */
const isObjectOnly = arg => isType(arg, 'Object');

export default isObjectOnly;