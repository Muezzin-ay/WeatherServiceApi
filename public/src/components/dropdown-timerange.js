Vue.component("dropdown-timerange",{
    props : [],
    data : ()=>{
        return{
            selectedOption: {
                label: 'Timerange',
                value: null,
                binSize: 300,
            },
            options: [
                {
                    label: 'last hour',
                    value: 3600,
                    defaultBin: 60
                },
                {
                    label: 'last 6 hours',
                    value: 21600,
                    defaultBin: 300
                },
                {
                    label: 'last 24 hours',
                    value: 86400,
                    defaultBin: 1800
                },
                {
                    label: 'last 48 hours',
                    value: 172800,
                    defaultBin: 3600
                }
            ]
        }
    },
    methods : {
        setTimerange: function (value, label, bin){
            let vm = this;
            vm.selectedOption.label = label;
            vm.selectedOption.value = value;
            vm.selectedOption.binSize = bin;
            vm.$emit('timerange-changed', vm.selectedOption);
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
            <a class="dropdown-item clickable" v-for="o in options" v-on:click="setTimerange(o.value, o.label, o.defaultBin)" >{{o.label}}</a>
        </div>
        </div>
        



    </div>
    `
})