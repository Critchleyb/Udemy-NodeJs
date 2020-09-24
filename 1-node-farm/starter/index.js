const fs = require('fs'); //fs is used for file system interaction
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//READ TEMPLATES
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

//USING NPM Slugify
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  switch (pathname) {
    case '/':
    case '/overview':
      const cardsHtml = dataObj.map((el) => replaceTemplate(templateCard, el)).join('');
      const overviewHtml = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
      res.writeHead(200, {
        'content-type': 'text/html',
      });
      res.end(overviewHtml);
      break;
    case '/product':
      const product = dataObj[query.id];
      const productHtml = replaceTemplate(templateProduct, product);
      res.writeHead(200, {
        'content-type': 'text/html',
      });
      res.end(productHtml);
      break;
    case '/api':
      res.end(data);
      break;
    default:
      res.writeHead(404, {
        'content-type': 'text/html',
        message: 'PAGE_DOES_NOT_EXIST',
      });
      res.end('<h1>404 Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to rquests on port 8000');
});
