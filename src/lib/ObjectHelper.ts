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

export const filterImagesByBreed = (
 images: string[],
 breed: string
): string[] => {
 const lowerCaseBreed = breed.toLowerCase();
 return images.filter((image) => image.toLowerCase().includes(lowerCaseBreed));
};

export const getRandomIndex = (arr: any[]): number => {
 return Math.floor(Math.random() * arr.length);
};

export const getRandomValue = <T>(arr: T[]): T => {
 return arr[getRandomIndex(arr)];
};
