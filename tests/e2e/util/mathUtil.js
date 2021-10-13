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
}

module.exports = new MathUtil()
