export const skipState = (initialValue = false) => {
  let _value = initialValue;
  return {
    set: (value: any) => {
      _value = value;
    },
    get: () => {
      return _value;
    },
  };
};
