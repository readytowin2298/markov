/** Command-line tool to generate Markov text. */

const fs = require('fs');
const argv = process.argv;
const MarkovMachine = require('./markov.js');
const axios = require('axios');
const cheerio = require('cheerio');

const web = argv[2].indexOf('http') === 0 ? true : false;

if(web){
    const url = argv[2]
    axios.get(url).then(data =>{

    })
} else{

}