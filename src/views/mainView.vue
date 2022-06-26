<template>
<div class="outer">
    <main-view-header/>
    <main-view-aside/>
    <main-view-section/>
    <main-view-footer/>
</div>
</template>

<script>
import mainViewHeader from '../components/mainView/header.vue'
import mainViewSection from '../components/mainView/section.vue'
import mainViewAside from '../components/mainView/aside.vue'
import mainViewFooter from '../components/mainView/footer.vue'
export default {
    name:'mainView',
    components: { mainViewHeader,mainViewSection,mainViewAside,mainViewFooter},
    data(){
        return{

        }
    },
    methods:{

    },
    // mounted(){
    //     document.addEventListener("scroll",function(){
    //         console.log(window.pageYOffset)
    //     })
    // },
}
</script>

<style scoped>

</style>>
