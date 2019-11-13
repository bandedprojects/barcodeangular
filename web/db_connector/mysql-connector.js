const mysql = require('mysql')
var con = null;

const connectDB = () =>  {
    con = mysql.createConnection({
        host            : process.env.DATABASE_HOST,
        port            : process.env.MYSQL_PORT,
        user            : process.env.MYSQL_USER,
        password        : process.env.MYSQL_PASSWORD,
        database        : process.env.MYSQL_DATABASE
    });
      
    con.connect((err)=> {
        if(err){
            console.log("Failed to connect DB",err);
            return process.exit(22);
        }
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