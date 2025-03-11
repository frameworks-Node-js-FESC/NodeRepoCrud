const express = require("express");
const app = express()
var mysql = require("mysql")
var cors = require("cors")

var conn = mysql.createConnection({
    host:"b6jjaxkzutbd4pfc90tk-mysql.services.clever-cloud.com",
    database: "b6jjaxkzutbd4pfc90tk",
    user :"umhzlutvyfqoy8sc",
    password:"zUeSAODHJJiKFEYhgPif",
    port: 3306
});



app.use(cors())
app.get("/api" , (req,res) => {
    res.json({"hola":"pena", "gordos":"locos"})
})

app.get("/consulta",(req,res) => {
    var no = req.query.no;
    var results;
    var dinero;
    conn.connect(function(err) {
        conn.query("SELECT dinero FROM Clientes WHERE noCuenta = " + no + ";", function(err,result,fields){
            results = JSON.stringify(result);
            console.log(results)
            var json =  JSON.parse(results);
            res.json({"dinero":json[0].dinero})

        });


    });
    
})
app.get("/eliminar",(req,res) =>{
    var no = req.query.no;
    console.log("elimnando el " + no )
    conn.connect(function(err) {
        console.log("conectado")
        if (err) throw err;
        var sql = "DELETE FROM Clientes WHERE noCuenta = " + no + ";"
        conn.query(sql,function(err,result){
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
            res.json({"status":"eliminado"})


        })
    })

})
app.get("/crear",(req,res) =>{
    var no = req.query.no;
    var pin = req.query.pin;
    var dinero = req.query.din;
    conn.connect(function(err){
        var sql = "INSERT INTO Clientes (noCuenta, pin,dinero) VALUES (" + no + "," + pin + "," + dinero + ")" + ";"
        conn.query(sql,function(err,result){
            if(err) throw err;
            console.log("insertado")
            res.json({"status":"insertado"})

        })
    })


})

app.listen(8004,() => {
    console.log("servidor iniciado  puerto 8004")
})