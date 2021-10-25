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

  randomSetOfNumbers(count, maxValue, numbers){
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

  uniqueRandomSetOfValuesFromList(count, list){
    let _result = []
    let _count = count > list.length? list.length : count
    for(let i=0; i<_count; i++){
      let _value
      do {
        _value = list[this.randomNumber(list.length)]
      } while (_result.find(elem => elem == _value)){
        _result.push(_value)
      }
    }
    return _result
  }
}



module.exports = new MathUtil()
