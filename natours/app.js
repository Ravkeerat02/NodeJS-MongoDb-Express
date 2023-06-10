const express = require('express'); 
const app = express();
const port = 3000 ;

// setting up route
app.get('/',(req , res) =>{
    res.status(200).json({message:'Welcome to the server'})
})

app.post('/',(req , res) =>{
    res.status(200).json({message:'Welcome to the server'})
})

// starts the server
app.listen(port , () =>{
    console.log(`listening on port${port}`)
})

