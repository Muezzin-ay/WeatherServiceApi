Vue.component("tile-chart-pressure",{
    props : ['selectedTimerange', 'selectedBinSize','selectedAggregation'],
    data : ()=>{
        return{
            sensorHistoryData : [],
            title: "Pressure history",
            id_internal: 'pressure-history',
            chartLabel:[
                'Avg-Pressure',
                'Max-Pressure',
                'Min-Pressure'
            ],
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
                url: "./api/fromto?from="+moment(from*1000).toISOString()+"&to="+moment(to*1000).toISOString()+"&bin="+bin
              })
            .done(function(data) {
                  vm.sensorHistoryData = data;
                  
                  vm.calculateChartData();
            });
        },
        calculateChartData: function(){
            let vm = this;
            let max = -9000;
            let min = 9000;
            
            vm.chart.data.datasets[0].data = [];
            vm.chart.data.datasets[1].data = [];
            vm.chart.data.datasets[2].data = [];
            
            for(dataPoint of vm.sensorHistoryData.result){
                let tavg = parseFloat((dataPoint.values.pressure.avg / 100).toFixed(2))
                let tmax = parseFloat((dataPoint.values.pressure.max / 100).toFixed(2))
                let tmin = parseFloat((dataPoint.values.pressure.min / 100).toFixed(2))
                if (tmax > max){
                    max = tmax
                }
                if (tmin < min){
                    min = tmin
                }

                vm.chart.data.datasets[0].data.push({
                    x: dataPoint.x*1000,
                    y: tavg
                });
                vm.chart.data.datasets[1].data.push({
                    x: dataPoint.x*1000,
                    y: tmax
                });
                vm.chart.data.datasets[2].data.push({
                    x: dataPoint.x*1000,
                    y: tmin
                });
            }
            let tempDatasets = []
            if (vm.selectedAggregation == "all") {
                tempDatasets = [vm.chart.data.datasets[0], vm.chart.data.datasets[1], vm.chart.data.datasets[2]]
            }   
            else if (vm.selectedAggregation == "avg"){
                tempDatasets = [vm.chart.data.datasets[0], vm.chart.data.datasets[1], vm.chart.data.datasets[2]]
                vm.chart.data.datasets[1].data = []
                vm.chart.data.datasets[2].data = []
            }
            else if (vm.selectedAggregation == "max"){
                tempDatasets = [vm.chart.data.datasets[0], vm.chart.data.datasets[1], vm.chart.data.datasets[2]]
                vm.chart.data.datasets[0].data = []
                vm.chart.data.datasets[2].data = []
            }
            else if (vm.selectedAggregation == "min"){
                tempDatasets = [vm.chart.data.datasets[0], vm.chart.data.datasets[1], vm.chart.data.datasets[2]]
                vm.chart.data.datasets[0].data = []
                vm.chart.data.datasets[1].data = []
            }
            vm.chart.data.datasets = tempDatasets

            vm.chart.options.scales.yAxes[0].ticks.min = min - 1;
            vm.chart.options.scales.yAxes[0].ticks.max = max + 1;
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
        },
        selectedAggregation : function(){
            let vm = this;
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

        var ctx = $('#'+vm.id);
        
        vm.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets:[
                    { fill: false, borderColor: '#18a85b', data: [], pointRadius: 3, lineTension: 0, borderWidth: 3, label: vm.chartLabel[0]},
                    { fill: false, borderColor: '#0d5c32', data: [], pointRadius: 3, lineTension: 0, borderWidth: 3, label: vm.chartLabel[1]},
                    { fill: false, borderColor: '#20e87e', data: [], pointRadius: 3, lineTension: 0, borderWidth: 3, label: vm.chartLabel[2]},
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
                        display : true,
                        scaleLabel : {display : true, labelString : "pressure"},
                        ticks: {
                            display: true,
                            min: null,
                            max: null
                        },
                    }]
                }
            }
        });
        vm.loadSensorData(vm.from, vm.to, vm.bin);


    },
    template : 
    `
    <div class="dashboard-tile">
        <h2 class="dashboard-tile-title">{{title}}</h2>
        
        <canvas v-bind:id=id width="400" height="400"></canvas>
    </div>
    `
})

