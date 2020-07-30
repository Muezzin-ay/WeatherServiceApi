console.log("hallo");

$(document).ready(()=>{
    var app = new Vue({
        el: '#app',
        data: {
          timerange : {
            message: 'Hello Vue!',
            timerange: 3600,
            binSize: 60,
          },

          aggregation : {
            aggregation : "all",
          }
          
        },
        methods:{
          reactOnTimeRangeChanged: function(data){
            this.timerange.timerange = data.value;
            this.timerange.binSize = data.binSize;
            //console.log('Timerange has changed to '+this.timerange+ ' seconds.');
          },
          reactOnAggregationChanged : function(data){
            this.aggregation.aggregation = data.value;
          }
        }
      })
})
