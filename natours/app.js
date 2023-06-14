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

// getting a single tour using ID
// OPTIONAL PARAM(?) 
app.get('/api/v1/tours/:id',(req, res)=>{
    // converts the string to number
    const id = req.params.id * 1;

    if(!tour){
        // 404 - not found
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    const tour = tours.find(el => el.id === req.params.id * 1);
    res.status(200).json({
        status: 'success',

        data:{
            tour
        }
    })
})

// updating the specifci data 
app.patch('/api/v1/tours/:id', (req, res) =>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data:{
            tour: '<Updated tour here>'
        }
    })
})

// deleting the data
app.delete('/api/v1/tours/:id', (req, res) =>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    // 204 - no content presrnt
    res.status(204).json({
        status: 'success',
        data: null
    });
});


// starts the server
app.listen(port , () =>{
    console.log(`listening on port ${port}`)
})

