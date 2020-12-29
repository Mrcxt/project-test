/*
 * @LastEditTime: 2020-12-29 18:51:00
 * @Description: 
 * @Date: 2020-12-21 14:30:23
 * @Author: @虾哔哔
 */
export * as isType from './modules/isType'
export * as isObject from './modules/isObject'
export * as isObjectOnly from './modules/isObjectOnly'


/**
 * @description: 转换首字母大写
 * @param {String} str
 * @return {*}
 */
const FirstUpperCase = (str) => {

    if (typeof str !== 'string') {
        throw new Error(`${str} is not String`)
    }

    [first, ...rest] = str;

    return first.toUpperCase() + rest.join('');
}