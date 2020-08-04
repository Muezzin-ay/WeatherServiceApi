Vue.component("dropdown-timerange",{
    props : [],
    data : ()=>{
        return{
            selectedOption: {
                label: 'last hour',
                value: null,
                binSize: 300,
            },
            options: [
                {
                    label: 'last hour',
                    value: 3600,
                    defaultBin: 300
                },
                {
                    label: 'last 6 hours',
                    value: 21600,
                    defaultBin: 600
                },
                {
                    label: 'last 24 hours',
                    value: 86400,
                    defaultBin: 2400
                },
                {
                    label: 'last 48 hours',
                    value: 172800,
                    defaultBin: 4800
                },
                {
                    label: 'last 3 days',
                    value: 259200,
                    defaultBin: 7200
                },
                {
                    label: 'last 7 days',
                    value: 604800,
                    defaultBin: 86400
                },
                {
                    label: 'last 14 days',
                    value: 1209600,
                    defaultBin: 86400
                },
                {
                    label: 'last month',
                    value: 2592000,
                    defaultBin: 86400
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