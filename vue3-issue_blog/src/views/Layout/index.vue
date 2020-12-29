<template>
    <div class="layout">
        <Header/>
        <div class="main">
            <router-view />
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header/index';
import Footer from '@/components/Footer/index'

export default {
    components:{
        Header,
        Footer
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
.layout{
    flex: 1;
    display: flex;
    flex-direction: column;

    .main{
        flex: 1;
    }
}
</style>