export const parseObject = (data: { [key: string]: string[] }) => {
 const result = [];

 for (const key in data) {
  if (data[key].length > 0) {
   data[key].forEach((subBreed) => result.push(`${subBreed} ${key}`));
  } else {
   result.push(key);
  }
 }

 return result;
};
