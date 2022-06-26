<template>
<div class="selectAnswer">
    <select-bar/>
</div>
</template>

<script>
import selectBar from '../components/selectView/selectBar'
export default {
    name:"selectAnswer",
    components:{selectBar},
    data(){
        return {
            name:"select",
        }
    },
}
</script>

<style scoped>
.selectAnswer{
    width: 80vw;
    margin: 0 auto;
}
</style>>
