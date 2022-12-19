const { response } = require('express');
var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const dbConfig = require('../config/connection-config');
const connection = mysql.createConnection(dbConfig)


async function fetchImageUrl(url) {
  // const [imageUrl, setImageUrl] = useState(null);
  // console.log("Printing the IMGUrl for ", url)

  var result = url.split('/')
  result = result[result.length - 1]
  var fetchingUrl = "https://en.wikipedia.org/w/api.php?action=query&titles="+result+"&prop=pageimages&format=json&pithumbsize=500&redirects&origin=*"

  var imgUrl = ""
  return(
  fetch(fetchingUrl, {
      mode: 'cors', // Set the mode to 'no-cors' to fetch the data without CORS
      
  })
      .then(response => response.text())
      // .then(result => console.log("Result: ", result))
      .then(function(data) {
          data = data.split('source')[1]
          data = data.substring(3)
          // console.log("Data", data.split("\",\"width")[0])
          data = data.split("\",\"width")[0]
          // console.log("Data: ", data)
          return(data)
          // console.log("FetchingUrl is ", fetchingUrl)
          // console.log(data)
          // if (data.startsWith("https://")) {
          //   // console.log("Data, ", data)
          //       data
          // } else {
          //   // console.log("ImgUrl Not found! for ", url)
          // }
      })
      // .then(data => console.log("Data2: ", data))

  )
      
      // .catch(error => {
      //   // console.error(error);
      //   Error(error)
      // });
}


const getTracks = (request, response) => {
  // console.log(request.query)
  if (Object.keys(request.query).length == 1) {
    var query = 'SELECT * FROM tCircuits where ';

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
    // console.log("No params :(")
    connection.query('SELECT * FROM tCircuits', (error, results) => {
      if (error) {
        throw error
      }
      // response.send(results)
      // results = results[0]

      fetches=[];

      resultsWithImg = [];

      results.forEach(track => {
        fetches.push(
          fetchImageUrl(track.url)
          .then(result => {

            // console.log("Result: ", result)
            if (result.startsWith("https://")) {
              track.imgurl = result
            } else {
              track.imgurl = "no-data"
            }

            resultsWithImg.push(track)

            if (resultsWithImg.length == results.length) {
              response.send(resultsWithImg)
            }

            
          })
          .catch(
            // console.log("Error: ", error)
          )
        )

      });
        // .then(console.log(fetches))



      // response.send(results)

    })
  }  
}


/* GET tracks page. */
router.get('/', getTracks);

module.exports = router;

