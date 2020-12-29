/*
 * @Description:自动化注册全局组件
 组件名格式：Base<Filename>,
 举个栗子：
 文件名为 abc，则组件名为 BaseAbc,
 文件名为 ABc，则组件名为 BaseABc
 即，Base+首字母大写的文件名！！！
 * @Author: @虾哔哔
 * @Date: 2019-08-19 15:28:27
 * @LastEditTime: 2019-12-11 18:01:51
 */
import Vue from "vue";
import upperFirst from "lodash/upperFirst"; //转换字符串string的首字母为大写。
import camelCase from "lodash/camelCase"; //转换字符串string为 驼峰写法。

const requireComponent = require.context(
    // 其组件目录的相对路径
    "../baseComponents",
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式，只匹配字母开头的组件
    /[A-Za-z]\w+\.(vue)$/
);

// console.log(requireComponent.keys());

requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            // 获取和目录深度无关的文件名
            "base-" +
            fileName
            .split("/")
            .pop()
            .replace(/\.\w+$/, "")
        )
    );
    // console.log("自注册全局组件：", componentName); //查看最终的组件名称

    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    );
});

console.log(
    "%c全局组件(Base开头的为项目自动注册)：",
    "color:green;",
    Vue.options.components
);