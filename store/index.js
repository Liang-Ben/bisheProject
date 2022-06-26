import Vuex from 'vuex'
import Vue from 'vue'

const actions = {
    // func1(context,value){
    //     console.log('vuex actions func1')
    //     if(context.state.sum%2){
    //         context.commit('FUNC1',value)
    //     }else{
    //         console.log('能整除2,不更新sum')
    //     }
    // },
    // func2(context,value){
    //     console.log('vuex actions func2,延迟2S')
    //     setTimeout(()=>{
    //         console.log('vuex actions func2执行')
    //         context.commit('FUNC1',value)
    //     },2000)
    // }
}
//准备actions用于响应组件中的动作
const mutations = {
    changeInput(state,value){
        console.log('vuex mutations changeInput')
        state.input = value
        console.log(state.input)
    },
    changeSelectType(state,value){
        console.log('vuex mutations changeSelectType')
        state.selectType = value
        console.log(state.selectType)
    },
    changeBookType(state,value){
        state.type = value
    },
    changeTypeId(state,value){
        state.typeId = value
    },
    changeAdmin(state,value){
        state.admin = value
    }
}
//准备mutations用于操作数据（state中的数据）
const state = {
    token:localStorage.getItem("token")||null,
    input:'',
    selectType:'',
    type:'',
    typeId:'',
    admin:false,
}
//state为需要的数据
const getters = {
    bigSum(state){
        return state.sum*10
    }
}
//getters为需要计算的道德数据
Vue.use(Vuex)
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
})

//this.$store.state.xxx
//this.$store.dispatch('func1',this.age)
//this.$store.commit('FUNC1',this.age)
//    computed:{
//    ...mapState({computedsum:'sum'}),
//    ...mapGetters({computedbigsum:'bigSum'})
//},

// methods:{
// ...mapMutations(['FUNC1']),
// ...mapActions(['func1','func2'])
//   }