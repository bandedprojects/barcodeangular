const mysql = require('mysql')
var con = null;

const connectDB = () =>  {
    con = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'admin',
        database : 'kalliyath_db'
        });
      
    con.connect((err)=> {
        if(err)
            console.log("Failed to connect DB",err);
        else
            console.log("connection successfull..................");
    })
}

const executeQuery = (queryString, fnCallBack) => {
    console.log("Executing Query:"+queryString);
    con.query(queryString,fnCallBack)
}

module.exports = {
    connectDB,
    executeQuery
}