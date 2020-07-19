const mariadb = require('mariadb');
const moment = require('moment');
const config = require('./readConfig')().init();

const pool = mariadb.createPool({host: config.dbHost, user: config.dbUser, connectionLimit: 5, password: config.dbPassword});

module.exports = {
  writeToDB: function(sensorData){
    pool.getConnection()
    .then(conn => {
        conn.query("INSERT INTO raspisensor.measures (timestamp, temperature1, pressure) value (?, ?, ?)", [moment().format("YYYY-MM-DD hh:mm:ss"),sensorData.temperature,sensorData.pressure])
        .then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
            conn.release(); // release to pool
        })
        .catch(err => {
            console.log(err);
            conn.release(); // release to pool
        })
        
    }).catch(err => {
        console.log(err);
    });
    
  },
  getAllMeasures: function(resolve){
    pool.getConnection()
    .then(conn => {
        conn.query("SELECt * FROM raspisensor.measures")
        .then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
            conn.release(); // release to pool
            resolve(res);
        })
        .catch(err => {
            console.log(err);
            conn.release(); // release to pool
        })
        
    }).catch(err => {
        console.log(err);
    });
    
  },
  getFromToMeasures: function(from,to,resolve){
    pool.getConnection()
    .then(conn => {
        conn.query("SELECt * FROM raspisensor.measures where timestamp > TIMESTAMP('"+from+"') AND timestamp < TIMESTAMP('"+to+"');")
        .then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
            conn.release(); // release to pool
            resolve(res);
        })
        .catch(err => {
            console.log(err);
            conn.release(); // release to pool
        })
        
    }).catch(err => {
        console.log(err);
    });
    
  }
}

