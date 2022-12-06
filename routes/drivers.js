const { response } = require('express');
var express = require('express');
var router = express.Router();

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '5.61.61.212',
  user: 'readonly',
  password: '123test123',
  database: 'f1'
})


const getDrivers = (request, response) => {
  console.log(request.query)
  if (Object.keys(request.query).length == 1) {
    var query = 'SELECT * FROM tDrivers where ';

    for (const [key, value] of Object.entries(request.query)) {
      query += `${key} = '${value}'`
    }

    connection.query(query, (error, results) => {
      if (error) {
        throw error
      }
      response.send(results)

    })
  } else {
    console.log("No params :(")
    connection.query('SELECT * FROM tDrivers', (error, results) => {
      if (error) {
        throw error
      }
      response.send(results)

    })
  }
  

  
}

/* GET tracks page. */
router.get('/', getDrivers);

module.exports = router;

