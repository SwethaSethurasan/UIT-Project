const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create MySQL connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'uiproject',
    port: 3306
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index3.html');
});
// Handle POST request to save form data
app.post('/saveData', (req, res) => {
    const { username, phoneNumber, otp } = req.body;

    const sql = "INSERT INTO users (username, phone_number, otp) VALUES (?, ?, ?)";
    con.query(sql, [username, phoneNumber, otp], (err, result) => {
        if (err) {
            console.error("Error saving data:", err);
            res.status(500).send("Error saving data");
        } else {
            console.log("Data saved successfully");
            res.redirect('/cart.html'); // Redirect to cart.html upon successful submission
        }
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
