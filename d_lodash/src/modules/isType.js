// import capitalize from 'lodash/capitalize'

/**
 * @description: 判断是否为对应类型
 * @param {any} arg - 待检测数据
 * @param {string} type - 类型名称
 * @return {boolean}
 */
const isType = (arg, type) => {

    if (typeof type !== 'string') {
        throw new Error(`${type} not String`)
    }

    // const t = capitalize(type)
    const t = type
    return Object.prototype.toString.call(arg) === `[object ${t}]`
}

export default isType