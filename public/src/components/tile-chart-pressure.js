Vue.component("tile-chart-pressure",{
    props : ['selectedTimerange', 'selectedBinSize'],
    data : ()=>{
        return{
            sensorHistoryData : [],
            title: "Pressure history",
            id_internal: 'pressure-history',
            chartLabel: 'Pressure',
            from: null,
            to: null,
            bin: null,
            //chart: null,
            timerange: this.selectedTimerange
        }
    },
    methods : {
        loadSensorData : function(from, to, bin){
            let vm = this;
            $.ajax({
                method: "GET",
                url: "/api/fromto?from="+moment(from*1000).toISOString()+"&to="+moment(to*1000).toISOString()+"&bin="+bin
              })
            .done(function(data) {
                  vm.sensorHistoryData = data;
                  
                  vm.calculateChartData();
            });
        },
        calculateChartData: function(){
            let vm = this;
            
            vm.chart.data.datasets[0].data = [];
            
            for(dataPoint of vm.sensorHistoryData.result){
                vm.chart.data.datasets[0].data.push({
                    x: dataPoint.x*1000,
                    y: dataPoint.values.pressure.avg/100
                });
            }

            vm.chart.update();
        }
    },
    watch:{
        selectedTimerange: function(){
            let vm = this;
            vm.to = moment().unix();
            vm.bin = vm.selectedBinSize;
            vm.from = vm.to - vm.selectedTimerange;
            vm.loadSensorData(vm.from, vm.to, vm.bin);
        }
        
        
    },
    computed : {
        id: function(){
            let vm = this;
            let chartCanvasId = vm.id_internal + '-chart';
            return chartCanvasId
        },
        
    },


    mounted : function(){
        let vm = this;
        vm.to = moment().unix();
        vm.from = vm.to - vm.selectedTimerange
        console.log("component has been mounted")
    
        vm.loadSensorData(vm.from, vm.to, vm.bin);

        var ctx = $('#'+vm.id);
        
        vm.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets:[
                    { fill: false, borderColor: '#cc65fe', data: [], pointRadius: 3, lineTension: 0, borderWidth: 3, label: vm.chartLabel},
                ]
            },
            
            options: {
                scales: {
                    xAxes: [{
                        scaleLabel:{
                            display: true,
                            labelString: 'Time'
                        },
                        stacked: true,
                        type: 'time',
                        distribution: 'linear',
                        time: {
                            tooltipFormat:'DD.MM.YYYY HH:mm',
                            displayFormats: {
                                millisecond: 'HH:mm:ss',
                                second: 'HH:mm',
                                minute: 'HH:mm',
                                hour: 'HH:mm',
                                day:'DD.MM.YY HH:mm',
                                week:'DD.MM.YY HH:mm'
                            }
                        },
                        ticks: {
                            display: true 
                        }
                    }],
                    yAxes: [{
                        
                    }]
                }
            }
        });


    },
    template : 
    `
    <div class="dashboard-tile">
        <h2 class="dashboard-tile-title">{{title}}</h2>
        
        <canvas v-bind:id=id width="400" height="400"></canvas>
    </div>
    `
})

