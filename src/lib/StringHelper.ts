export const capitalizeString = (str: string): string => {
 return str
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
};

export const getSecondWord = (str: string): string => {
 const words = str.split(" ");
 return words.length >= 2 ? words[1] : str;
};

export const getFirstWord = (sentence: string): string => {
 return sentence.split(" ")[0].toLowerCase();
};
