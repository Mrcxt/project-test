<template>
    <div ref="refToc" :class="tocClass"></div>
</template>

<script>
import {ref,onMounted} from 'vue'
import TOC from './index'

export default {
    props:{
        target:{
            type:String,
            default: 'body'
        }, 
        tocClass:{
            type:String,
            default:'toc'
        }, 
        h2Class:{
            type:String,
            default:'toc-2'
        }, 
        h3Class:{
            type:String,
            default:'toc-3'
        }
    },
    setup (props) {
        const refToc = ref(null);

        onMounted(() => {
            const toc = new TOC(props)

            refToc.value.appendChild(toc);
        })

        return {
            refToc
        }
    }
}
</script>
