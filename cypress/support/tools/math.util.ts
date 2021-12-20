export function getRoundDegree(number) {
  let _number = number;
  let _degree = 1;
  while (_number <= 1) {
    _degree = _degree * 10;
    _number = number * _degree;
  }
  return _degree;
}

export function randomNumber(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

export function randomSetOfNumbers(count, maxValue, numbers) {
  let _result = [];
  for (let i = 0; i < count; i++) {
    let _number;
    do {
      _number = this.randomNumber(maxValue);
    } while (!!_result.find((elem) => elem === _number));
    _result.push(_number);
  }
  return _result;
}
