Vue.component("dropdown-aggregation",{
    props : [],
    data : ()=>{
        return{
            selectedOption: {
                label: 'all',
                value: null,
                binSize: 300,
            },
            options: [
                {
                    label: 'all',
                    value: 'all',
                },
                {
                    label: 'avg',
                    value: 'avg',
                },
                {
                    label: 'max',
                    value: 'max',
                },
                {
                    label: 'min',
                    value: 'min',
                },
            ]
        }
    },
    methods : {
        setAggregation: function (value, label){
            let vm = this;
            vm.selectedOption.label = label;
            vm.selectedOption.value = value;
            vm.$emit('aggregation-changed', vm.selectedOption);
        }
        
    },
    computed : {

    },
    mounted : function(){
        let vm = this;
        
    },
    template : 
    `
    <div>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{selectedOption.label}}
            </button>
            <div class="dropdown-menu">      
            <a class="dropdown-item clickable" v-for="o in options" v-on:click="setAggregation(o.value, o.label)" >{{o.label}}</a>
        </div>
        </div>
        



    </div>
    `
})