const mysql = require('mysql');
const axios = require('axios');
const _ = require('lodash');

const category = ["btc_idr","bch_idr","eth_idr","etc_idr","ltc_idr","waves_idr","xrp_idr","xzc_idr","bts_btc","doge_btc","eth_btc","ltc_btc","nxt_btc","xrp_btc"];

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "code1234",
    database: "mydb"
});

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
                    console.log("!!! error while inserting... " + category);
                    console.log(err);
                } else {
                    console.log("... succesfully insert " + data_values.length + " items" );
                }
                console.log("[store end] __ " + category);

            });
        });
};

//_.map(category,fetchNstore);
const intervalObj = setInterval( () => { _.map(category,fetchNstore) }, 60 * 1000);
