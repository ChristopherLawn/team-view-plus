// Required dependency
const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Ru$$1anV0dka',
        database: 'company'
    },
    console.log('Connected to the company database.')
);

// Throw an error if an error exists
connection.connect((err) => {
    if (err) throw err
})

// Export connection data/info
module.exports = connection;