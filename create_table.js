const mysql = require('mysql');
const _ = require('lodash');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'code1234',
    database: 'mydb'
});

const category = ["btc_idr","bch_idr","eth_idr","etc_idr","ltc_idr","waves_idr","xrp_idr","xzc_idr","bts_btc","doge_btc","eth_btc","ltc_btc","nxt_btc","xlm_btc","xem_btc","xrp_btc"];

function createTable(category) {
    console.log("[create table start]");
    con.query("CREATE TABLE "+category+" (tid INT(8) unsigned NOT NULL, amount FLOAT, price INT(10) unsigned NOT NULL, data INT(10) unsigned NOT NULL, type VARCHAR(5))",function(err,result) {
        if(err) {
            console.log("!!! error while creating table");
        } else {
            console.log("... succesfully inserted");
        }
    });
}

_.map(category,createTable);
