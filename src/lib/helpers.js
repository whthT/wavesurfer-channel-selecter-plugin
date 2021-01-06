export function arrayFlatten(arr) {
  let concatArray = [];

  for(const item of arr) {
      if (Array.isArray(item)) {
          concatArray.push(...item)
      } else {
          concatArray.push(item)
      }
  }
  return concatArray
}
