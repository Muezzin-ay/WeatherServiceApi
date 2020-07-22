Vue.component("tile-current-temperature",{
    props : [],
    data : ()=>{
        return{
            sensorData : [],
            title: "Temperature"
        }
    },
    methods : {
        loadSensorData : function(){
            let vm = this;
            $.ajax({
                method: "GET",
                url: "/api"
              })
                .done(function(data) {
                  vm.sensorData = data
                });
        }
    },
    computed : {

    },
    mounted : function(){
        let vm = this;
        console.log("component has been mounted")
        vm.loadSensorData()
    },
    template : 
    `
    <div class="dashboard-tile">
        <h2 class="dashboard-tile-title">{{title}}</h2>
        <p class="sensorData">{{sensorData.temperature}} °C</p>

    </div>
    `
})