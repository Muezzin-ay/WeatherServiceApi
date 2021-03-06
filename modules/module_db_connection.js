const mariadb = require('mariadb');
const moment = require('moment');
const config = require('./readConfig')().init();

const pool = mariadb.createPool({host: config.dbHost, user: config.dbUser, connectionLimit: 5, password: config.dbPassword});

module.exports = {
  
    getAllMeasures: function(resolve){
    pool.getConnection()
    .then(conn => {
        conn.query("SELECT * FROM raspisensor.measures")
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
        conn.query("SELECT * FROM raspisensor.measures where timestamp > TIMESTAMP('"+from+"') AND timestamp < TIMESTAMP('"+to+"');")
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
  getCurrentMeasures: function(resolve){
    pool.getConnection()
    .then(conn => {
        conn.query("SELECT * FROM raspisensor.measures WHERE id like (SELECT max(id) from raspisensor.measures);")
        .then(res => { // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
            conn.release(); // release to pool
            resolve(res[0]);
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

