const express = require('express'); 
const fs = require('fs'); // file system module
const app = express();
const port = 3000 ;
// including middleware
app.use(express.json()); // middleware - modifies the incoming data

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

// taking post request - creates a new tour 
app.post('/api/v1/tours', (req , res) =>{
    // console.log(req.body);
    
    // creates the new id
    const newId = tours[tours.length - 1].id + 1;
    // creates the new tour
    const newTour = Object.assign({id: newId}, req.body);
    
    // adding new data to the array 
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        // new resource created
        res.status(201).json({
           status: 'New tour created',
           data:{
                tour: newTour
           }
        });     
    });
})

// starts the server
app.listen(port , () =>{
    console.log(`listening on port ${port}`)
})

