const express = require("express");
const mysql = require("mysql");
const cors = require('cors');



// Create connection

const db = mysql.createConnection({
    host: "localhost",    
    user: "root",    
    password: "",    
    database: "student",
    
    });
    // Connect to MySQL

db.connect((err) => {
    if (err) {
        throw err; 
    }  console.log("MySql Connected");    
    });
const app = express();

// enable cors
app.use(cors({
    origin: '*'
})) 

app.use(express.json())


// Create DB

app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err) => {
    if (err) {
    throw err;
    }
    res.send("Database created");
    });
    });

// Create table

app.get("/createemployee", (req, res) => {
    let sql ="CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err) => {
        if (err) {
            throw err;
        }    
    res.send("Employee table created");
    });    
    });

// Insert data

app.post("/", (req, res) => {
  try {
    const {id, firstname, lastname, age, dob} = req.body;

    db.query('INSERT INTO studentdetails (id, firstname, lastname, age, dob) values (?, ?, ?, ?, ?)', [id,firstname,lastname, age, dob ], function (error) {

        if (error)  console.log(error); 
       
        res.status(200).send({message:'Data inserted successfully!'});
       
        }); 
    
  } catch (err) {
    console.log(err)
  }
});

// make to connection to the database.
// app.get("/select",(req,res)=> {
//     let sql = "SELECT * FROM students";
//     if (err) throw err;
//     // if connection is successful
//     let query = db.query(sql, post, (err) => { 
//         if (err) {
//           throw err;
//       }
//       res.send("student details fetched");
//       console.log(result);
//     });
// });


// fetch all users
app.get('/',(req, res)=> {
    db.query('SELECT * FROM studentdetails', (err,rows)=> {
      if (err) {
       console.log(err);
      } else {
        res.status(200).send(rows);
      }
    })
  })


app.listen(3000, () => {
    console.log("Server started on port 3000");
});