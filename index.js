const mysql = require('mysql');
const axios = require('axios');
const _ = require('lodash');

const category = ["btc_idr","bch_idr","eth_idr","etc_idr","ltc_idr","waves_idr","xrp_idr","xzc_idr","bts_btc","doge_btc","eth_btc","ltc_btc","nxt_btc","xlm_btc","xem_btc","xrp_btc"];

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "code1234",
    database: "mydb"
});

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

function fetchNstore(category) {
    console.log("[fetch start] __ " + category);
        axios.get("https://vip.bitcoin.co.id/api/"+category+"/trades").then(res => {
            const data = res.data;
            const data_values = _.reduce(data,function(result,item){
                result.push(_.values(item));
                return result;
            },[]);
            con.query("INSERT INTO "+category+" (date,price,amount,tid,type) VALUES?",[data_values],function(err,result) {
                if(err) {
                    console.log("!!! error while inserting");
                } else {
                    console.log("... succesfully inserted");
                }
                console.log("[store end]");

            });
        });
};

const intervalObj = setInterval( () => { _.map(category,fetchNstore) }, 60 * 1000);
