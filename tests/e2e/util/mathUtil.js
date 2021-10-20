class MathUtil {
  getRoundDegree(number){
    let _number = number
    let _degree = 1
    while(_number<=1){
      _degree=_degree*10
      _number=number*_degree
    }
    return _degree
  }

  randomNumber(maxValue){
    return Math.floor(Math.random() * maxValue)
  }

  randomSetOfNumbers(count, maxValue, exclude){
    console.log("count " + count + "maxValue " + maxValue )
    let _result = []
    for(let i = 0; i < count; i++){
      let _number
      do {
        _number = this.randomNumber(maxValue)
      }while(!!_result.find(elem => elem == _number) || exclude == _number)
      _result.push(_number)
    }
    return _result
  }
}

module.exports = new MathUtil()
