Vue.component("current-sensor-data",{
    props : [],
    data : ()=>{
        return{
            sensorData : []
        }
    },
    methods : {
        loadSensorData : function(){
            let vm = this;
            $.ajax({
                method: "GET",
                url: "/api/"
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
    <div>
        <h1>available sensor data</h1>
        <table class = "table">
            <thead>
                <tr>
                    <th>timestamp</th>
                    <th>temperature</th>
                    <th>humidity</th>
                    <th>pressure</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in sensorData">
                    <td>{{data.timestamp}}</td>
                    <td>{{data.temperature1}}</td>
                    <td>{{data.humidity}}</td>
                    <td>{{data.pressure}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    `
})