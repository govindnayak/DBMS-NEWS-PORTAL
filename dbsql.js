var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chanakya@198",
  database: "news"

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * from category", function (err, result, fields) {
    if (err) throw err;
    console.log(fields);
  });
});

app.get('/', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.query('select * from category', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
})
