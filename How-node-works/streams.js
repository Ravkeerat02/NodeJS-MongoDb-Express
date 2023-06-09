const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // // Sol 1 - reading data from the text file 
    // fs.readFile('test-file.txt',(err , data ) =>{
    //     if(err) console.log(err);
    //     res.end(data)
    // })
    
    // // Sol 2 - using stream 
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk =>{
    //     // its a writable stream 
    //     res.write(chunk);
    // })
    // // helps in sending response to the client
    // readable.on('end', () =>{
    //     res.end();
    // })
    // readable.on('error', err =>{
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("File not found");
    // })
    // Solution 3 - pipe operator
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    // 
})

server.listen(8000, '127.0.0.1' , () =>{
    console.log('Listening ...')
})

  