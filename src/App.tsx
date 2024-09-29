import { useState, useEffect } from "react";
import DogoCard from "./components/DogoCard";
import DogoNavbar from "./components/DogoNavbar";
import { FaDog, FaHeart, FaSortAlphaUp, FaSortAlphaDown } from "react-icons/fa";
import { parseObject } from "./lib/ObjectHelper";
import { readFromLocalStorage } from "./lib/LocalStorage";

function App() {
 const [filter, setFilter] = useState<string>("");
 const [dogos, setDogos] = useState<{ [key: string]: string[] }>({});
 const [lstDogos, setListDogos] = useState<string[]>([]);
 const [lstFavs, setLstFavs] = useState<string[]>([]);

 const [sizeOfList, setSizeOfList] = useState<number>(12);
 const [isAscending, setIsAscending] = useState(true);
 const [displayFavorites, setDisplayFavorites] = useState<boolean>(false);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const filterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFilter(e.target.value);
 };

 const isFavorite = (breed: string) => {
  if (displayFavorites) {
   return lstFavs.includes(breed.toLowerCase());
  }
  return true;
 };
 let filteredBreeds = lstDogos
  .filter(
   (breed) =>
    breed.toLowerCase().includes(filter.toLowerCase()) && isFavorite(breed)
  )
  .sort((a, b) => (isAscending ? a.localeCompare(b) : b.localeCompare(a)));

 const getFavorites = () => {
  let storage: string[] = readFromLocalStorage("favs")?.split(";") || [];
  setLstFavs(storage);
 };
 const filterFavorites = () => {
  getFavorites();
  setDisplayFavorites(!displayFavorites);
 };

 const fetchData = async (mounted: boolean) => {
  try {
   const response = await fetch("https://dog.ceo/api/breeds/list/all");

   if (!response.ok) {
    throw new Error("Network response was not ok");
   }

   if (mounted) {
    const result = await response.json();
    setDogos(result.message);
    setListDogos(parseObject(result.message));
    setLoading(false);
   }
  } catch (err: any) {
   if (mounted) {
    setError(err.message);
    setLoading(false);
   }
  }
 };

 useEffect(() => {
  let isMounted = true;
  getFavorites();
  fetchData(isMounted);
  return () => {
   isMounted = false;
  };
 }, []);

 return (
  <main className="flex flex-col justify-center">
   {/* <DogoNavbar /> */}

   <DogoNavbar onChange={filterTextChange}>
    <div
     className="tooltip tooltip-primary tooltip-bottom"
     data-tip="Sort Alphabetically"
    >
     {!isAscending ? (
      <button
       className="btn btn-primary join-item sm:text-lg"
       onClick={() => setIsAscending(true)}
      >
       <span className="hidden sm:block">Ascending</span>
       <FaSortAlphaUp />
      </button>
     ) : (
      <button
       className="btn btn-primary join-item sm:text-lg"
       onClick={() => setIsAscending(false)}
      >
       <span className="hidden sm:block">Descending</span>
       <FaSortAlphaDown />
      </button>
     )}
    </div>

    <button
     className="btn btn-primary sm:text-lg absolute right-2"
     onClick={filterFavorites}
     disabled={lstFavs.length === 0}
    >
     <span className="hidden sm:block">Favorites</span> <FaHeart />
    </button>
   </DogoNavbar>
   <button
    className="btn fixed bottom-0 right-0"
    onClick={() => setSizeOfList(sizeOfList + 3)}
   >
    Add Dogo <FaDog />
   </button>
   <div className="flex flex-wrap justify-center gap-4 p-4">
    {filteredBreeds.slice(0, sizeOfList).map((dogName, id) => (
     <div key={id}>
      <DogoCard dogoName={dogName} subBreeds={[]} bFav={displayFavorites} />
     </div>
    ))}
   </div>
  </main>
 );
}

export default App;
