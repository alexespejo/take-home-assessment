export const saveToLocalStorage = (key: string, value: string): void => {
 localStorage.setItem(key, value);
};

// Function to read data from local storage
export const readFromLocalStorage = (key: string): string | null => {
 return localStorage.getItem(key);
};

export const storageWriteDelete = (dogoName: string) => {
 let value: string | null = readFromLocalStorage("favs");
 if (value === null) {
  saveToLocalStorage("favs", dogoName);
 } else {
  let lstDogos: string[] = value?.split(";");
  if (!lstDogos.includes(dogoName)) {
   saveToLocalStorage("favs", value + ";" + dogoName);
  } else {
   const idx = lstDogos.indexOf(dogoName);
   if (idx !== -1) {
    saveToLocalStorage(
     "favs",
     lstDogos.filter((item) => item !== dogoName).join(";")
    );
   }
  }
 }
};
