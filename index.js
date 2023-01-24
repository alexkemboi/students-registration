const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

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
  }
  console.log("MySql Connected");
});
const app = express();

// enable cors
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

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

//delete record
app.get("/delete", (req, res) => {
  let sql = "DELETE FROM `studentdetails` WHERE id=1";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Data deleted successfully");
  });
});

// Create table

app.get("/createemployee", (req, res) => {
  let sql =
    "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
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
    const { id, firstname, lastname, age, dob, countries, gender } = req.body;

    db.query(
      "INSERT INTO studentdetails (id, firstname, lastname, age, dob,countries,gender) values (?, ?, ?, ?, ?,?,?)",
      [id, firstname, lastname, age, dob, countries, gender],
      function (error) {
        if (error) console.log(error);

        res.status(200).send({ message: "Data inserted successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// fetch all users
app.get("/", (req, res) => {
  db.query("SELECT * FROM studentdetails", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(rows);
    }
  });
});

//search all users
app.get("/search", (req, res) => {
  const id = req.query.searchTerm;
  console.log(id);
  db.query(`SELECT * FROM studentdetails WHERE id='${id}'`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(rows);
      console.log(rows);
    }
  });
});

app.delete("/delete", (req, res) => {
  const { searchTerm } = req.query;
  db.query(
    `DELETE FROM studentdetails WHERE id= '${searchTerm}'`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting search term from the database.");
      } else {
        console.log(`Search term ${searchTerm} deleted successfully.`);
        res.sendStatus(200);
      }
    }
  );
});

//api to update record in database
app.post("/update", (req, res) => {
  try {
    const { id, firstname, lastname, age, dob, countries, gender } = req.body;

    db.query(
      `UPDATE studentdetails 
      SET firstname='${firstname}', lastname='${lastname}', age='${age}', dob='${dob}',countries='${countries}',gender='${gender}'
      WHERE id = ${id}
      `,
      [id, firstname, lastname, age, dob, countries, gender],
      function (error) {
        if (error) console.log(error);

        res.status(200).send({ message: "Data updated successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.post("/signUp", (req, res) => {
  try {
    const {
      signUpFirstname,
      signUpLastname,
      signUpEmail,
      signUpUsername,
      signUpPassword,
    } = req.body;
    console.log(req.body);
    db.query(
      "INSERT INTO users (firstname,lastname,email,username,password) values (?,?,?,?,?)",
      [
        signUpFirstname,
        signUpLastname,
        signUpEmail,
        signUpUsername,
        signUpPassword,
      ],
      function (error) {
        if (error) {
          console.log(error);
        } else {
          res
            .status(200)
            .send({ message: "Sign up data inserted succesfully" });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", (req, res) => {
  const username = req.query.username;
  console.log(username);
  db.query(`SELECT * FROM users WHERE username='${username}'`, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(rows);
      console.log(rows);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
