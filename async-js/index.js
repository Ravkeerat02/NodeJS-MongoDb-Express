const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);

    // returns a promise - pending promise(no data returned)
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => {
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, err => {
                if (err) {
                    console.log('Error writing to file');
                    return;
                }
                console.log('Dog saved');
            });
        })
        // us3ed for returninh an error 
        .catch(err => {
            console.log(err.message);
        });
}); 

// Promise - a value that will occur(appear) in the future
// then - succesful - catch - unsuccessful
// returned prmose(also called resolved promise) - can either be accepted or reject3ed