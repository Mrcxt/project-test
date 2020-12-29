import config from './rollup.config'
import { terser } from 'rollup-plugin-terser'


if (Array.isArray(config.output)) {
    config.output.forEach((item, i) => {
        config.output[i].sourcemap = false;
    })
} else {
    config.output.sourcemap = false;
}



config.plugins = [
    ...config.plugins,
    terser(), //压缩
]

export default {
    ...config
}