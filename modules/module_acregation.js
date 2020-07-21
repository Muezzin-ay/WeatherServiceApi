module.exports = {
    calculateBin : function(data, binSize){
        /**
         * data : response of the data 
         * binSize : 
         */

         binSize = binSize * 1000

        let start = moment(data[0].timestamp).unix()
        let len = data.length - 1
        let end = moment(data[len].timestamp).unix()

        let differenceLength = end - start
        bin = differenceLength / binSize
        finalData = this.calculateBin(data,bin)

        return finalData
    }, 

    calculateData : function(data,bin){
        let finalData = []
        
           

        return findalData
    }
}