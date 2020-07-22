console.log("hallo");

$(document).ready(()=>{
    var app = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!',
          timerange: 3600,
          binSize: 60,
        },
        methods:{
          reactOnTimeRangeChanged: function(data){
            this.timerange = data.value;
            this.binSize = data.binSize;
            //console.log('Timerange has changed to '+this.timerange+ ' seconds.');
          }
        }
      })
})
