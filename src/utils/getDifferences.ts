const getDifferences = (
    object1: { [key: string]: any },
    object2: { [key: string]: any }
  ): { [key: string]: any } => {
    const differences: { [key: string]: any } = {};
  
    for (const key in object1) {
      if (Object.prototype.hasOwnProperty.call(object1, key) && object2.hasOwnProperty(key)) {
        if (object1[key] !== object2[key]) {
          differences[key] = object1[key];
        }
      } else {
        differences[key] = object1[key];
      }
    }
  
    for (const key in object2) {
      if (Object.prototype.hasOwnProperty.call(object2, key) && !Object.prototype.hasOwnProperty.call(object1, key)) {
        differences[key] = object2[key];
      }
    }
  
    return differences;
  };
  
  export default getDifferences;
  