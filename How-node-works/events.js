// listen to them and react accordingly
const EventEmitter = require('events');
const http = require('http');

// Sales inherit from eventEmitter
class Sales extends EventEmitter {
    // used for creating new objects
    constructor(){
        // access to all methods
        super();
    }
}
const myEmitter = new EventEmitter();

// multiple events can be set 
myEmitter.on('newSale' , () => {
    console.log("There was a new sale!");
}); 

myEmitter.on('newSale' , () => {
    console.log("Experiment");
}); 

// Emit - similar to click btn 
myEmitter.emit('newSale')


//  

const server = http.createServer();

// listening to different events that are being runned on the server
server.on('request',(req , res) => {
    console.log('Req received')
    res.end('Req received')
})

server.on('request',(req , res) => {
    console.log('Another request')
})


server.on('close',(req , res) => {
    console.log('Server closed')
})

server.listen(8000 , '127.0.0.1', () =>{
    console.log('Waiting for requests')
})
