/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map()
    for(let i=0; i<this.words.length; i++){
      let word = this.words[i]
      if(this.words[i+1]){
        if(!chains.has(word)){
          chains.set(word, [this.words[i+1]])
        }
        else{
          let arr = chains.get(word)
          arr.push(this.words[i+1])
          chains.set(word, arr)
        }
      }
      
    }
    return (chains)
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let story = ""
    let word = this.words[Math.floor(Math.random() * this.words.length)]
    story += word
    for(let i=0; i<numWords; i++){
      story += ' '
      let arr = this.chains.get(word)
      let newWord = arr[Math.floor(Math.random() * arr.length)]
      story += newWord
      word = newWord
    }
    return story
  }
}

module.exports = MarkovMachine
