const mysql = require('mysql');
const { promisify }= require('util');
const { database } = require('./keys'); //Importamos los datos de la base de datos

const pool = mysql.createPool(database); //Nos conectamos a la base de datos

pool.getConnection((err,connection) => {
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

// Promisify for Node.js async/await.
pool.query = promisify(pool.query);

module.exports = pool;