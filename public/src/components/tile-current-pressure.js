Vue.component("tile-current-pressure",{
    props : [],
    data : ()=>{
        return{
            sensorData : [],
            title: "Pressure"
        }
    },
    methods : {
        loadSensorData : function(){
            let vm = this;
            $.ajax({
                method: "GET",
                url: "./api"
              })
                .done(function(data) {
                  vm.sensorData = data
                });
        }
    },
    computed : {
        pressure_final: function(){
            return (this.sensorData.pressure/100).toFixed(2)
        }
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

        <p class="sensorData">{{pressure_final}} hPa</p>

    </div>
    `
})