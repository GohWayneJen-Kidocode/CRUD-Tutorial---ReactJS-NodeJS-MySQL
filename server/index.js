const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")
const bodyParser = require("body-parser");


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CRUDDataBase'
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movieReviews";
    db.query(sqlInsert, [movieName, review], (err, result)=>{
        res.send(result);
    });
});

app.post('/api/insert' , (req, res) => {

    const movieName = req.body.movieName
    const review = req.body.review
    
    const sqlInsert = "INSERT INTO movieReviews (movieName, review) VALUES (?,?)";
    db.query(sqlInsert, [movieName, review], (err, result)=>{
        console.log(result);
    });
});

app.delete('api/delete/:movieName', (req, res) => {
    const name = req.params.movieName
    const sqlDel = "DELETE FROM movieReviews WHERE movieName = ?"
    db.query(sqlDel, name, (err, result) =>{
        if (err) console.log(err);
    });
});

app.put('api/update', (req, res) => {
    const name = req.params.movieName
    const review = req.params.review
    const sqlUpdate = "UPDATE movieReviews SET movieReviews review = ? WHERE movieName = ?"
    db.query(sqlUpdate, [review, name], name, (err, result) =>{
        if (err) console.log(err);
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});