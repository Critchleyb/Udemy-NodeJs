const fs = require('fs'); //fs is used for file system interaction
const http = require('http');
const url = require('url');

////////////////////////////////////////////
/////////FILES

//SYNCHRONUS CODE
/*

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
const textOut = `The Text output is: ${textIn}`;

fs.writeFileSync('./txt/output.txt', textOut);
*/

//ASYNC CODE
/*
fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
        fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', error => {
                console.log('file written');
            })
        });
    });
});
*/

////////////////////////////////////////////
/////////SERVER

//HTTP Server

const server = http.createServer((req,res) => {
    // res.end('Hello from the server!');

    const pathName = req.url;

    switch(pathName) {
        case '/':
        case '/overview':
            res.end('this is the overview');
        case '/product':
            res.end('this is the product')
        default:
            res.writeHead(404, {
                'content-type': 'text/html',
                'message': 'PAGE_DOES_NOT_EXIST'
            });
            res.end('<h1>404 Page not found!</h1>');
    }
});

server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to rquests on port 8000');
});
