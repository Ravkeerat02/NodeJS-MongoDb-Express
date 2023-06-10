const express = require('express'); 
const fs = require('fs'); // file system module
const app = express();
const port = 3000 ;

// // setting up route

// reding the file data - converting the file format
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
// should specify version of API(if being used)
app.get('/api/v1/tours',(req, res)=>{
    res.status(200).json({
        status: 'success',
        // makes sense with more data(multipe obj)
        results: tours.length,
        data: {
            // will conatin teh data
            tours: tours
        }
    })
})

// starts the server
app.listen(port , () =>{
    console.log(`listening on port${port}`)
})

