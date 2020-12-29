/*----------  自动注册modules  ----------*/
export default function() {
    const requireComponent = require.context(
        // 其组件目录的相对路径
        "./modules",
        // 是否查询其子目录
        true,
        // 匹配js文件
        /\.js$/
    );

    const modules = {};

    requireComponent.keys().forEach(fileName => {
        // 获取配置
        const componentConfig = requireComponent(fileName);

        // 获取命名
        const componentName = fileName
            .split("/")
            .pop()
            .split(".")
            .shift();

        modules[componentName] = componentConfig.default || componentConfig;
    });

    // console.log("modules:", modules);
    return modules;
}