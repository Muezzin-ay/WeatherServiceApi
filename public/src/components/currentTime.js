Vue.component("current-time",{
    props : [],
    data : ()=>{
        return{
            date : moment().format('DD.MM.YYYY, HH:mm:ss')
        }
    },
    methods : {

    },
    computed : {
        
    },
    mounted : function(){
        let vm = this
        setInterval(()=>{
            vm.date = moment().format('DD.MM.YYYY, HH:mm:ss')
        },1000)
    },
    template : 
    `
    <h2>{{date}}</h2>
    `
})