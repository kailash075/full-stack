const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"full_stack"

});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO contact(name, email, contact) VALUES('kailashkk','kumarkailash075+kk@gmail.com','9092398788')";
    db.query(sqlInsert, (err, result) => {
        console.log("error", err);
        console.log("result", result);
        res.send("Hello Kailash");
    });
    
});

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact LIMIT 1";
    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = "INSERT INTO contact(name, email, contact) VALUES(?,?,?)";
    db.query(sqlInsert, [name, email, contact], (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});