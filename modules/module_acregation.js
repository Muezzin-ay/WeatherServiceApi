const moment = require('moment');


module.exports = {
    calculateBin : function(data, binSize, start, end){
        /**
         * data : response of the data 
         * binSize : 
         */

        //let start = moment(data[0].timestamp).unix()
        //let end = moment(data[data.length - 1].timestamp).unix()

        let differenceLength = end - start

        binCount = parseInt(differenceLength / binSize);
        if(moment(start*1000).minute() != 0){
            binCount++;
        }
        

        let groupArray = [];
        for(let i = 0; i<binCount; i++){
            groupArray.push({
                x: start + (i*binSize), 
                values: [],
                results :{
                }
            });
        }


        //console.log('BinGroups: ' + binCount);

        /**
         * Iteration over all data values and assign to matching group
         */

         for(d of data){
            let timestamp_unix = moment(d.timestamp).unix();

             for(group of groupArray){
                 if(timestamp_unix >= group.x && timestamp_unix < (group.x + binSize)){
                     group.values.push(d);
                 }
             }
         }

        /**
         * iteration over bin groups and min, max, avg and count calculation
         */

         let resultGroups = []

         for(group of groupArray){
            let temperatures = [];
            let pressures = [];
            let humidities = [];

            for(V of group.values){
                temperatures.push((V.temperature2 + V.temperature1)/2);
                pressures.push(V.pressure);
                humidities.push(V.humidity);
            }

            resultGroups.push({
                x: group.x,
                x_: moment((group.x)*1000).toISOString(), 
                countValues: group.values.length,
                values: {
                    temperature:{
                        avg: ((temperatures.reduce((a, b) => a + b, 0))/temperatures.length).toFixed(2),
                        min: Math.min(...temperatures).toFixed(2),
                        max: Math.max(...temperatures).toFixed(2)
                    },
                    humidity:{
                        avg: ((humidities.reduce((a, b) => a + b, 0))/humidities.length).toFixed(2),
                        min: Math.min(...humidities).toFixed(2),
                        max: Math.max(...humidities).toFixed(2)
                    },
                    pressure:{
                        avg: ((pressures.reduce((a, b) => a + b, 0))/pressures.length).toFixed(2),
                        min: Math.min(...pressures).toFixed(2),
                        max: Math.max(...pressures).toFixed(2)
                    }
                }
            })

            
            

         }

        return {binSize: binSize, groups: resultGroups.length,result:resultGroups}
    }, 

    calculateData : function(data,bin){
        let finalData = []
        
           

        return findalData
    }
}