module.exports.skipState = (initialValue = false) => {
  let _value = initialValue;
  return {
    set: value => {
      _value = value;
    },
    get: () => {
      return _value;
    }
  };
};
