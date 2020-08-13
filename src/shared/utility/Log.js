class Log {
  constructor(tag){
    this.tag = tag;
  }


  d(...args){
    console.log(`[${this.tag}]`, ...args);
  }

  i(...args){
    console.info(`[${this.tag}]`, ...args);
  }

}

export default {
  Log,
  create(tag){
    return new Log(tag);
  }
}