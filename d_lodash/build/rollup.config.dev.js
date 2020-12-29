import config from './rollup.config'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'


config.plugins = [
    ...config.plugins,
    livereload(), //热更新
    serve({
        port: 3001,
        open: true,
        contentBase: ""
    })
]

export default {
    ...config
}