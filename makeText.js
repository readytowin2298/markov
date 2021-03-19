/** Command-line tool to generate Markov text. */

const fs = require('fs');
const argv = process.argv;
const MarkovMachine = require('./markov.js');
const axios = require('axios');
const cheerio = require('cheerio');





async function getWebText(src){
    let text = ""
    await axios.get(src).then(response => {
        console.log("Status code: ", response.status)
        const html = response.data;
        const parsed = cheerio.load(html);
        text = parsed.text();
        // console.log("TEXT: ", text)
       
        
    }).catch(err =>{
        console.log("getWebText ERROR: ", err)
        process.exit(1)
    })
    return text
}
function getFileText(path){
    const text = fs.readFileSync(path, 'utf8')
    return text
}

async function wrapItUp(args){
    let text = ""
    if(args[2].indexOf("http") === 0 || args[2].indexOf("http") === 1){
        try{
            text = await getWebText(args[2])
        } catch (error){
            console.log("ERROR: ", error)
            process.exit(1)
        }
        
    }
    else{
        try{
            text = getFileText(args[2])
        } catch (err) {
            console.log("ERROR: ", err)
            process.exit(1)
        }
            
    }
    // console.log("Text: ", text)
    try{
        mach = await new MarkovMachine(text)
    let wordsLength = 100
    if(args.length > 3 && typeof args[3] === 'number'){
        wordsLength = args[3]
    }
    console.log(mach.makeText(numWords=wordsLength))
    } catch(err){
        console.log("My apologies, I couldn't understand that")
        process.exit(2)
    }
    

}

wrapItUp(argv)
// process.exit(0)