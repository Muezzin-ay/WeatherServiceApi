const moment = require('moment');


module.exports = {
    calculateBin : function(data, binSize){
        /**
         * data : response of the data 
         * binSize : 
         */

        let start = moment(data[0].timestamp).unix()
        let len = data.length - 1
        let end = moment(data[len].timestamp).unix()

        let differenceLength = end - start
        binCount = parseInt(differenceLength / binSize)+1;

        let emptyArray = [];
        for(let i = 0; i<binCount; i++){
            emptyArray.push({
                x: start + i*binSize, 
                x_as_isotime: moment((start + i*binSize)*1000),
                values: null
            });
        }


        console.log('BinGroups: ' + binCount);




        //finalData = this.calculateData(data,bin)









        return emptyArray
    }, 

    calculateData : function(data,bin){
        let finalData = []
        
           

        return findalData
    }
}